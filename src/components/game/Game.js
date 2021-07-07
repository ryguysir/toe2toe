import React, { useEffect } from "react";
import { Flex, Grid, Heading } from "@chakra-ui/react";
import firebase from "../../firebase";

import GameIDWindow from "../game-id-window/GameIDWindow";
import "./app.css";

const Game = ({ gameID, playerNumber, currentGameInfo, setCurrentGameInfo }) => {
  /*-------------Set Up Firebase----------------------------------------------------------------- */
  const db = firebase.firestore().collection("toe2toe_active-games").doc(gameID);

  /*-------------Set Up States------------------------------------------------------------------- */

  /*-------------Set Up useEffect---------------------------------------------------------------- */
  useEffect(() => {
    //must redeclare the db variable here so it doesn't get caught in a dependancy loop.
    const db = firebase.firestore().collection("toe2toe_active-games").doc(gameID);

    //snapshot the current game and set the board.
    async function fetchData() {
      await db.onSnapshot((snapshot) => {
        setCurrentGameInfo(snapshot.data());
      });
    }
    fetchData();
  }, [gameID]);

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
      }, 750);
      return;
    }
    const token = playerNumber === 0 ? "x" : "o";

    await currentGameInfo.board.splice(parseInt(x.target.id), 1, token);
    let nextPlayer = playerNumber === 0 ? 1 : 0;
    db.set({ ...currentGameInfo, playerTurn: nextPlayer });
  };

  return (
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
  );
};

export default Game;
