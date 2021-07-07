const idCreator = () => {
  const alpha = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

  const id = [];

  for (let i = 0; i < 7; i++) {
    //choose a random letter
    if (Math.round(Math.random()) === 0) {
      id.push(alpha[Math.round(Math.random() * 26)]);
    } else {
      id.push(Math.round(Math.random() * 9));
    }
  }
  return id.join("");
};

export default idCreator;
