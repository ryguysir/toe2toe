import React from "react";
import { Button, Flex, Spacer, Heading, Input } from "@chakra-ui/react";
import firebase from "../../firebase";

const StartGame = ({ setGameID, setGameCreated, setPlayerNumber }) => {
  /*-------------Create Unique ID---------------------------------------------------------------- */
  const idCreator = require("./idCreator");

  /*-------------Set Up Firebase----------------------------------------------------------------- */
  const db = firebase.firestore().collection("toe2toe_active-games");

  /*-------------Functions----------------------------------------------------------------------- */
  const createGame = () => {
    //create a unique ID for this game and set it to the main state
    let id = idCreator.default();

    //set the id / player number to the main game's state, change gameCreated to true
    setGameID(id);
    setGameCreated(true);
    setPlayerNumber(0);

    //create the doc in the main collection on firestore
    db.doc(id).set({
      playerOne: true,
      playerTwo: false,
      playerCount: 0,
      playerTurn: 0,
      board: ["", "", "", "", "", "", "", "", ""],
    });
  };
  const joinGame = (elem) => {
    //get user input
    let id = elem.currentTarget.parentNode.firstChild.value;

    db.doc(elem.currentTarget.parentNode.firstChild.value)
      .get()
      .then((doc) => {
        if (doc.exists) {
          console.log("document exists!");
        } else {
          console.log("this document doesn't exist");
          return;
        }
      })
      .catch((err) => {
        console.log(err);
      });
    //set the id / player number to the main game's state, change gameCreated to true
    setGameID(id);
    setGameCreated(true);
    setPlayerNumber(1);

    //create the doc in the main collection on firestore
    db.doc(elem.currentTarget.parentNode.firstChild.value)
      .get()
      .then((doc) => {
        db.doc(id).set({ ...doc.data(), playerTwo: true, playerCount: 1 });
      });
  };

  return (
    <Flex height="100vh" alignItems="center" justifyContent="center">
      <Flex direction="column" background="gray.200" p={10} rounded={6}>
        <Heading mb={6} alignSelf="center" userSelect="none">
          Toe 2 Toe
        </Heading>
        <Flex direction="row" justifyContent="center">
          <Input placeholder="Game ID" variant="filled" mb={3} type="text" marginRight={3} p={6} />
          <Spacer />
          <Button colorScheme="teal" p={6} onClick={joinGame}>
            Join Game
          </Button>
        </Flex>
        <br />
        <Button colorScheme="teal" onClick={createGame}>
          Create New Game
        </Button>
      </Flex>
    </Flex>
  );
};

export default StartGame;
