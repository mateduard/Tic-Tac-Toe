const gameBox = document.querySelector('.game-box');
const endCover = document.querySelector('#end-cover');

let moveCounter = 1;
let boxes = [0, 3, 4, 5, 6, 7, 8, 9, 10];

gameBox.addEventListener('click', nextMove);

function nextMove(e) {
  createGameElement(e);
  checkEndOfGame();
}

function createGameElement(e) {
  if (moveCounter % 2 === 0) {
    if (!e.target.style.backgroundImage) {
      e.target.style.backgroundImage = 'url(circle.jpg)';
      let elId = e.target.id.slice(1);
      boxes[elId] = 2;
      moveCounter++;
    }
  } else {
    if (!e.target.style.backgroundImage) {
      e.target.style.backgroundImage = 'url(cross.jpg)';
      let elId = e.target.id.slice(1);
      boxes[elId] = 1;
      moveCounter++;
    }
  }
}

function checkEndOfRounds() {
  if (moveCounter > 9) {
    moveCounter = 1;
    displayEnd(0);
  }
}

function checkEndOfGame() {
  if (
    (boxes[0] === boxes[4] && boxes[0] === boxes[8]) ||
    (boxes[0] === boxes[1] && boxes[1] === boxes[2]) ||
    (boxes[0] === boxes[3] && boxes[3] === boxes[6]) ||
    (boxes[1] === boxes[4] && boxes[4] === boxes[7]) ||
    (boxes[3] === boxes[4] && boxes[4] === boxes[5]) ||
    (boxes[2] === boxes[4] && boxes[4] === boxes[6]) ||
    (boxes[8] === boxes[5] && boxes[5] === boxes[2]) ||
    (boxes[8] === boxes[7] && boxes[7] === boxes[6])
  ) {
    if (moveCounter % 2 === 0) {
      displayEnd(1);
    } else {
      displayEnd(2);
    }
  } else {
    checkEndOfRounds();
  }
}

function displayEnd(winner) {
  endCover.style.display = 'flex';
  const endBox = document.querySelector('#end-box');

  if (winner === 0) {
    endBox.innerHTML = `<h1>DRAW</h1>`;
    endCover.addEventListener('click', resetGame);
  } else {
    const image = winner === 1 ? 'cross.jpg' : 'circle.jpg';
    endBox.innerHTML = `
        <h1>PLAYER ${winner} WINS</h1>
        <img src="${image}" alt="cross">`;
    endCover.addEventListener('click', resetGame);
  }
}

function resetGame() {
  boxes = [0, 3, 4, 5, 6, 7, 8, 9, 10];
  document.querySelectorAll('.small-box').forEach((box) => {
    box.style.backgroundImage = '';
  });
  moveCounter = 1;

  endCover.style.display = 'none';
}
