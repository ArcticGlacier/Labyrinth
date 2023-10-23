import { useState } from "react";
import "./labyrinth.css";
import { useEffect } from "react";
import { useRef } from "react";

const numRows = 10;
const numCols = 10;

export default function Labyrinth(props) {
  const [ballRow, setBallRow] = useState(9);
  const [ballCol, setBallCol] = useState(5);
  // Create a ref to track the event listener
  const eventListenerAdded = useRef(true);

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
    const handleOrientation = (event) => {
      const alpha = event.alpha; // Rotation around the z-axis
      const beta = event.beta; // Rotation around the x-axis
      const gamma = event.gamma;

      let newRow = ballRow;
      let newCol = ballCol;

      // Up
      if (beta < -30 && ballRow > 0 && labyrinth[ballRow - 1][ballCol] != 1) {
        console.log(ballRow - 1);
        newRow = ballRow - 1;
      }
      // Down
      else if (
        beta > 30 &&
        ballRow < numRows - 1 &&
        labyrinth[ballRow + 1][ballCol] != 1
      ) {
        newRow = ballRow + 1;
      }
      // Left
      else if (
        gamma > 30 &&
        ballCol > 0 &&
        labyrinth[ballRow][ballCol + 1] != 1
      ) {
        newCol = ballCol + 1;
      }
      // Right
      else if (
        gamma < -30 &&
        ballCol < numCols - 1 &&
        labyrinth[ballRow][ballCol - 1] != 1
      ) {
        newCol = ballCol - 1;
      }

      if (labyrinth[newRow][newCol] == 3) {
        newRow = 9;
        newCol = 5;
      }
      if (labyrinth[newRow][newCol] == 4) {
        const newGrid = labyrinth.map((row) =>
          row.map((cell) => {
            return 1;
          })
        );

        setLabyrinth(newGrid);
        setBallRow(newRow);
        setBallCol(newCol);
        props.unlock();
        return;
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

    if (eventListenerAdded) {
      // Only add the event listener if it hasn't been added yet
      window.addEventListener("deviceorientation", handleOrientation, true);
      eventListenerAdded.current = false;
    }

    return () => {
      window.removeEventListener("deviceorientation", handleOrientation);
    };
  }, [ballCol, ballRow, labyrinth]);

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
