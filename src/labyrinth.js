import "./labyrinth.css";
export default function Labyrinth() {
  // 1 represents walls, 0 is path, 3 is holes, 2 is ball, 4 is winning hole
  let labyrinth = [
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
  ];

  function getLabyrinthClass(cell) {
    if (cell === 0) {
      return "path";
    } else if (cell === 1) {
      return "wall";
    } else if (cell === 2) {
      return "ball";
    } else if (cell === 3 || cell === 4) {
      return "hole";
    }
  }

  return (
    <table cellspacing="0" cellpadding="0">
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
    </table>
  );
}
