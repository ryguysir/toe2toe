//library imports
import React, { useState } from "react";
import { ChakraProvider, Box } from "@chakra-ui/react";

//css imports
import "./App.css";

//component imports
import StartGame from "./components/start-game-window/StartGame";

import Game from "./components/game/Game";

function App() {
  //states
  const [playerNumber, setPlayerNumber] = useState(0);
  const [gameID, setGameID] = useState("");
  const [gameCreated, setGameCreated] = useState(false);
  const [currentGameInfo, setCurrentGameInfo] = useState({
    playerCount: 0,
    playerOne: true,
    playerTwo: false,
    playerTurn: 0,
    board: ["", "", "", "", "", "", "", "", ""],
  });

  return (
    <ChakraProvider>
      <Box height="100vh" width="100vw">
        {/* game start box and UI */}
        {gameCreated ? null : (
          <StartGame
            setGameID={setGameID}
            setGameCreated={setGameCreated}
            setPlayerNumber={setPlayerNumber}
          />
        )}

        {/* main game ui*/}
        {gameCreated ? (
          <Game
            gameID={gameID}
            playerNumber={playerNumber}
            currentGameInfo={currentGameInfo}
            setCurrentGameInfo={setCurrentGameInfo}
          />
        ) : null}
      </Box>
    </ChakraProvider>
  );
}

export default App;
