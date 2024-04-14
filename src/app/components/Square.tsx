'use client'

interface ISquare {
  player?: "X" | "O" | undefined;
  clickSquare: () => void;
}

export function Square({ player, clickSquare }: ISquare) {
  function handleClick() {
    !player && clickSquare();
  }

  return (
    <div
      onClick={handleClick}
      style={{ width: 50, height: 50, border: "1px solid black" }}
    >
      <p>{player && player}</p>
    </div>
  );
}
