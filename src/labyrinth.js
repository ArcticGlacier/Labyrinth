import { useState } from "react";
import "./labyrinth.css";
import { useEffect } from "react";

const numRows = 10;
const numCols = 10;

export default function Labyrinth() {
  const [ballRow, setBallRow] = useState(9);
  const [ballCol, setBallCol] = useState(5);

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

  useEffect(() => {
    const handleKeyPress = (event) => {
      let newRow = ballRow;
      let newCol = ballCol;

      if (event.key === "ArrowUp" && ballRow > 0) {
        newRow = ballRow - 1;
      } else if (event.key === "ArrowDown" && ballRow < numRows - 1) {
        newRow = ballRow + 1;
      } else if (event.key === "ArrowLeft" && ballCol > 0) {
        newCol = ballCol - 1;
      } else if (event.key === "ArrowRight" && ballCol < numCols - 1) {
        newCol = ballCol + 1;
      }

      const newGrid = labyrinth.map((row, rowIndex) =>
        row.map((cell, colIndex) => {
          if (rowIndex === newRow && colIndex === newCol) {
            return 2;
          }
          if (rowIndex === ballRow && colIndex === ballCol) {
            return 0;
          } else {
            return cell;
          }
        })
      );

      setLabyrinth(newGrid);
      setBallRow(newRow);
      setBallCol(newCol);
    };

    window.addEventListener("keydown", (event) => {
      handleKeyPress(event);
    });
  }, [ballRow, ballCol, labyrinth]);

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
