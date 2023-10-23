import logo from "./logo.svg";
import "./App.css";
import Labyrinth from "./labyrinth";
import { useState } from "react";

function timeout() {
  return new Promise((res) => setTimeout(res, 1000));
}

function App() {
  const [unlockedBg, setUnlockedBg] = useState(false);

  async function UnlockedBackground() {
    await timeout();
    setUnlockedBg(true);
  }

  function DisplayLabyrinth() {
    if (unlockedBg) {
      <div className="unlock"></div>;
    } else {
      return <Labyrinth unlock={UnlockedBackground}></Labyrinth>;
    }
  }

  return <div className="App">{DisplayLabyrinth()}</div>;
}

export default App;
