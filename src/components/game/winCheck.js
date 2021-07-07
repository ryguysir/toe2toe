const winCheck = (currentGameInfo) => {
  let xArray = [];
  let oArray = [];
  currentGameInfo.board.forEach((elem, index) => {
    if (elem === "x") {
      xArray.push(index);
    }
    if (elem === "o") {
      oArray.push(index);
    }
  });

  let winPossibles = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  //check for wins
  let xWinPoints = 0;
  let oWinPoints = 0;
  for (let i = 0; i < winPossibles.length; i++) {
    for (let x = 0; x < winPossibles[i].length; x++) {
      if (xArray.includes(winPossibles[i][x])) {
        xWinPoints += 1;
      }
      if (oArray.includes(winPossibles[i][x])) {
        oWinPoints += 1;
      }
    }
    if (xWinPoints >= 3) {
      return 0;
    } else if (oWinPoints >= 3) {
      return 1;
    } else {
      xWinPoints = 0;
      oWinPoints = 0;
    }
  }

  //check for a draw
  if (
    currentGameInfo.board.filter((item) => {
      return item === "";
    }).length === 0
  ) {
    return 2;
  }
  return;
};

export default winCheck;
