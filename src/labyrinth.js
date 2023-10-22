import { useState } from "react";
import "./labyrinth.css";
import { useEffect } from "react";
export default function Labyrinth() {
  const [ballCoords, setBallCoords] = useState({ row: 9, column: 5 });

  // 1 represents walls, 0 is path, 3 is holes, 2 is ball, 4 is winning hole
  const [labyrinth, setLabyrinth] = useState([
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 3, 0, 1, 0, 1, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 1, 4, 1, 0, 1],
    [1, 1, 1, 1, 0, 1, 1, 1, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 1, 0, 0, 1, 1, 1, 1, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 1, 0, 1],
    [1, 0, 1, 1, 1, 1, 0, 1, 0, 1],
    [1, 3, 1, 0, 0, 0, 0, 1, 3, 1],
    [1, 1, 1, 1, 1, 2, 1, 1, 1, 1],
  ]);

  function moveBallUp() {
    let maze = labyrinth;
    maze[ballCoords.row][ballCoords.column] = 0;
    maze[ballCoords.row - 1][ballCoords.column] = 2;
    setLabyrinth(maze);
    setBallCoords({ row: ballCoords.row - 1, column: ballCoords.column });
  }

  function moveBallDown() {
    let maze = labyrinth;
    maze[ballCoords.row][ballCoords.column] = 0;
    maze[ballCoords.row + 1][ballCoords.column] = 2;
    setLabyrinth(maze);
    setBallCoords({ row: ballCoords.row + 1, column: ballCoords.column });
  }

  function moveBallLeft() {
    let maze = labyrinth;
    maze[ballCoords.row][ballCoords.column] = 0;
    maze[ballCoords.row][ballCoords.column - 1] = 2;
    setLabyrinth(maze);
    setBallCoords({ row: ballCoords.row, column: ballCoords.column - 1 });
  }

  function moveBallRight() {
    let maze = labyrinth;
    maze[ballCoords.row][ballCoords.column] = 0;
    maze[ballCoords.row][ballCoords.column + 1] = 2;
    setLabyrinth(maze);
    setBallCoords({ row: ballCoords.row, column: ballCoords.column + 1 });
  }

  window.addEventListener("keydown", (event) => {
    if (event.key === "ArrowUp") {
      moveBallUp();
    } else if (event.key === "ArrowDown") {
      moveBallDown();
    } else if (event.key === "ArrowLeft") {
      moveBallLeft();
    } else if (event.key === "ArrowRight") {
      moveBallRight();
    }
  });

  return (
    <table cellSpacing="0" cellPadding="0">
      <tbody>
        {labyrinth.map((row, rowIndex) => (
          <tr key={rowIndex}>
            {row.map((cell, colIndex) => (
              <td
                key={colIndex}
                className={`row-${rowIndex} column-${colIndex} cell-${cell}`}
              ></td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
