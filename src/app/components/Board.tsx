'use client'

import { useState } from "react";
import { Square } from "./Square";
import { ISquare } from "../interfaces/ISquare";

export function Board() {
  const boardInitialState = [{}, {}, {}, {}, {}, {}, {}, {}, {}];

  const [board, setBoard] = useState<ISquare[]>(boardInitialState);
  const [player, setPlayer] = useState<"X" | "O" | undefined>("X");
  const [winner, setWinner] = useState<"X" | "O" | "Empate" | null>(null);

  function clickSquare(position: number) {
    if (winner) {
      return console.log("jogo finalizado");
    }

    const selectedSquare = board[position];

    if (selectedSquare?.player) {
      throw new Error("Já foi selecionado");
    }

    const newBoardArray: ISquare[] = board.map((square, index) => {
      if (index === position) {
        return { ...square, player: player }; // Define o jogador atual para a posição clicada
      } else {
        return square; // Mantém as outras posições do tabuleiro inalteradas
      }
    });

    setBoard(newBoardArray);

    const isWinner = checkIfIsWinner(newBoardArray);
    if (isWinner) {
      setWinner(isWinner);
    } else {
      setPlayer(player === "X" ? "O" : "X");
    }
  }

  function checkIfIsWinner(newBoardArray: ISquare[]) {
    const winningConditions = [
      // Linhas
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      // Colunas
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      // Diagonais
      [0, 4, 8],
      [2, 4, 6]
    ];

    for (const condition of winningConditions) {
      const [a, b, c] = condition;
      if (
        newBoardArray[a]?.player &&
        newBoardArray[a].player === newBoardArray[b]?.player &&
        newBoardArray[a].player === newBoardArray[c]?.player
      ) {
        return newBoardArray[a].player; // Retorna o jogador vencedor
      }
    }

    const isBoardFull = newBoardArray.every(
      (square) => square.player !== undefined
    );
    if (isBoardFull) {
      return "Empate";
    }

    return null;
  }

  function startNewGame() {
    setBoard(boardInitialState);
    setWinner(null);
  }

  return (
    <>
      <button style={{ marginBottom: 20 }} onClick={startNewGame}>
        Clear game
      </button>

      {winner && <h2>{`O vencedor é: ${winner}`}</h2>}

      <div
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center"
        }}
      >
        <div
          style={{
            width: "100px",
            height: "100px",
            display: "grid",
            gridTemplateColumns: "repeat(3, 50px)", // Defina a largura de cada coluna
            gap: "0px", // Espaçamento entre os quadrados
            justifyContent: "space-around" // Centraliza o tabuleiro na tela
          }}
        >
          {board.slice().map((item, index) => (
            <Square
              key={index}
              player={item.player}
              clickSquare={() => clickSquare(index)}
            />
          ))}
        </div>
      </div>
    </>
  );
}
