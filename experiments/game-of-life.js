function setup() {
  createCanvas(800, 800);
}

class Cell {
  constructor(x, y, state) {
    this.x = x;
    this.y = y;
    this.state = state;
    this.newState = -1;
    this.age = 0;
    this.type = Math.round(Math.random() * 2); 
  }

  draw(size) {
    if (this.state == 0) {
      fill(235, 235, 255);
    } else {
      if (this.type == 0) {
        fill(140, 160, 170); 
      } else if (this.type == 1) {
        fill(200, 100, 100); 
      } else if (this.type == 2) {
        fill(100, 200, 100); 
      }
    }
    rect(this.x * size, this.y * size, size, size);
  }

  updateState() {
    this.state = this.newState;
    if (this.state === 1) {
      this.age++;
    } else {
      this.age = 0;
    }
  }
}

let board = [];
let size = 9;
let lifecycle = 7;
let count = 0;
let boardsize = 200;

for (let i = 0; i < boardsize; i++) {
  board.push([]);
  for (let j = 0; j < boardsize; j++) {
    let state = Math.round(Math.random());
    let cell = new Cell(i, j, state);
    board[i].push(cell);
  }
}

function calculateNewState(x, y) {
  let startX = Math.max(0, x - 1);
  let startY = Math.max(0, y - 1);
  let endX = Math.min(board.length, x + 2);
  let endY = Math.min(board[x].length, y + 2);

  let liveCells = 0;
  let type1Neighbors = 0;
  let type2Neighbors = 0;

  for (let i = startX; i < endX; i++) {
    for (let j = startY; j < endY; j++) {
      if (!(i == x && j == y)) {
        liveCells += board[i][j].state;
        if (board[i][j].state === 1) {
          if (board[i][j].type === 1) {
            type1Neighbors++;
          } else if (board[i][j].type === 2) {
            type2Neighbors++;
          }
        }
      }
    }
  }

  let currentState = board[x][y].state;
  let currentType = board[x][y].type;

  if (currentState === 1 && currentType === 1 && type2Neighbors > 2) {
    board[x][y].newState = 1;
    for (let i = startX; i < endX; i++) {
      for (let j = startY; j < endY; j++) {
        if (board[i][j].state === 1 && board[i][j].type === 2) {
          board[i][j].newState = 0; 
        }
      }
    }
  } else if (currentState === 1 && currentType === 2 && type1Neighbors > 3) {
    board[x][y].newState = 0;
  } else if (currentState === 0 && type2Neighbors > 3 && type1Neighbors < 2) {
    board[x][y].newState = 1;
    board[x][y].type = 2;
  } else if (currentState === 0 && type1Neighbors > 3) {
    board[x][y].newState = 1;
    board[x][y].type = 1;
  } else {
    if (currentState === 0 && liveCells === 3) {
      board[x][y].newState = 1;
    } else if (currentState === 1 && (liveCells < 2 || liveCells > 3)) {
      board[x][y].newState = 0;
    } else {
      board[x][y].newState = currentState;
    }
  }
}

function calculateLiving() {
  let flat = board.flat();
  let living = flat.reduce((acc, cell) => acc + cell.state, 0);
  console.log(living);
}

function draw() {
  if (count == 0) {
    noStroke();
    for (let i = 0; i < board.length; i++) {
      for (let j = 0; j < board[i].length; j++) {
        board[i][j].draw(size);
        calculateNewState(i, j);
      }
    }

    for (let i = 0; i < board.length; i++) {
      for (let j = 0; j < board[i].length; j++) {
        board[i][j].updateState();
      }
    }

    calculateLiving();
  }

  count++;
  if (count == lifecycle) {
    count = 0;
  }
}



  //References
  //
  // The foundation of code is based on code showcased from the lecture Complexity
  // https://ju.slides.com/garrit/cc2024-complexity?token=Nl2_bLqJ#/9/5 where
  // the game of life are introduced, and based on that foundation I have experimented
  // with values mostly.
  //
  // I have also tried to learn new ways or understand the foundation code from the lecture
  // using both https://p5js.org/examples/math-and-physics-game-of-life/ and ChatGPT.
  // However, after taking inspiration and knowledge from these I have constructed
  // similar ways or changed them a little myself in the code.