import React, { useEffect } from "react";
import { Flex, Grid, Heading, Button } from "@chakra-ui/react";
import firebase from "../../firebase";

import GameIDWindow from "../game-id-window/GameIDWindow";
import "./app.css";

const Game = ({
  gameID,
  playerNumber,
  currentGameInfo,
  setCurrentGameInfo,
  gameWin,
  setGameWin,
}) => {
  /*-------------Outside Modules----------------------------------------------------------------- */
  const winCheck = require("./winCheck");

  /*-------------Set Up Firebase----------------------------------------------------------------- */
  const db = firebase.firestore().collection("toe2toe_active-games").doc(gameID);

  /*-------------Functions----------------------------------------------------------------------- */
  const playerMove = async (x) => {
    if (
      currentGameInfo.playerTurn !== playerNumber ||
      currentGameInfo.board[parseInt(x.target.id)] !== ""
    ) {
      //animation for not your turn and clicking a taken space
      document.getElementsByClassName("game-board")[0].classList.toggle("board-jiggle");
      setTimeout(() => {
        document.getElementsByClassName("game-board")[0].classList.toggle("board-jiggle");
      }, 400);
      return;
    }
    const token = playerNumber === 0 ? "x" : "o";

    await currentGameInfo.board.splice(parseInt(x.target.id), 1, token);
    let nextPlayer = playerNumber === 0 ? 1 : 0;
    db.set({ ...currentGameInfo, playerTurn: nextPlayer });
  };
  const playAgain = () => {
    setGameWin(undefined);
    let data = {
      playerCount: 1,
      playerOne: true,
      playerTwo: true,
      playerTurn: 0,
      gameOver: false,
      board: ["", "", "", "", "", "", "", "", ""],
    };
    db.set(data);
  };

  /*-------------Set Up useEffect---------------------------------------------------------------- */
  useEffect(() => {
    //must redeclare the db variable here so it doesn't get caught in a dependancy loop.
    const db = firebase.firestore().collection("toe2toe_active-games").doc(gameID);

    //snapshot the current game and set the board.
    async function fetchData() {
      await db.onSnapshot((snapshot) => {
        setCurrentGameInfo(snapshot.data());
        if (winCheck.default(snapshot.data()) !== undefined) {
          db.set({ ...snapshot.data(), gameOver: true });
          setGameWin(winCheck.default(snapshot.data()));
        }
      });
    }
    fetchData();
  }, [gameID, winCheck]);

  return (
    <>
      <div className={`game-win-announcement ${currentGameInfo.gameOver === true ? "" : "hidden"}`}>
        <Flex
          width={346}
          height={480}
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          backgroundColor="gray.300"
          p={3}
          rounded={6}
        >
          <Heading color="teal.500" mb={3}>
            {gameWin === 2 ? "Draw!" : gameWin === playerNumber ? "You Win!" : "You Lose!"}
          </Heading>
          <Button variant="solid" size="md" colorScheme="teal" onClick={playAgain}>
            Play Again?
          </Button>
        </Flex>
      </div>
      <Flex
        className="game-board"
        height="100vh"
        alignItems="center"
        justifyContent="center"
        flexDirection="column"
      >
        {/*waiting for second player notice*/}
        <div className={`${currentGameInfo.playerCount < 1 ? "fullscreen-notice" : "hidden"}`}>
          <Flex display="table" background="gray.200" p={3} rounded={6}>
            <Heading color="teal.500">Waiting for second Player.</Heading>
          </Flex>
        </div>

        {/*game board*/}
        <Flex background="gray.200" justifyContent="center" width="346px" p={3} roundedTop={6}>
          <Heading textAlign="center">
            {currentGameInfo.playerTurn === playerNumber ? "Your Turn" : "Opponent's Turn"}
          </Heading>
        </Flex>
        <Grid background="gray.200" p={2} gridTemplateColumns="repeat(3,1fr)">
          {currentGameInfo.board.map((tile, index) => {
            return (
              <div id={index} key={index} className="board-tile" onClick={playerMove}>
                {tile === "" ? null : tile === "x" ? (
                  <i className="fas fa-times"></i>
                ) : (
                  <i className="far fa-circle"></i>
                )}
              </div>
            );
          })}
        </Grid>
        <GameIDWindow gameID={gameID} />
      </Flex>
    </>
  );
};

export default Game;
