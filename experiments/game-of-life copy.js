function setup() {
  createCanvas(800, 800);
}

class Cell {
  constructor(x, y, state, type = 0) {
    this.x = x;
    this.y = y;
    this.state = state;
    this.newState = -1;
    this.age = 0;
    this.type = type; // 0: Normal, 1: Aggressive, 2: Passive
  }

  draw(size) {
    if (this.state == 0) {
      fill(235, 235, 255);
    } else {
      if (this.type == 0) {
        fill(140, 160, 170); // Normal type
      } else if (this.type == 1) {
        fill(200, 100, 100); // Aggressive type
      } else if (this.type == 2) {
        fill(100, 200, 100); // Passive type
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
let lifecycle = 2;
let count = 0;
let boardsize = 200;

for (let i = 0; i < boardsize; i++) {
  board.push([]);
  for (let j = 0; j < boardsize; j++) {
    let state = Math.round(Math.random());
    let type = Math.floor(Math.random() * 3); // Slumpmässig typ (0, 1, 2)
    let cell = new Cell(i, j, state, type);
    board[i].push(cell);
  }
}

function calculateNewState(x, y) {
  let cell = board[x][y];
  let startX = Math.max(0, x - 1);
  let startY = Math.max(0, y - 1);
  let endX = Math.min(board.length, x + 2);
  let endY = Math.min(board[x].length, y + 2);

  let liveCells = 0;
  for (let i = startX; i < endX; i++) {
    for (let j = startY; j < endY; j++) {
      if (!(i == x && j == y)) {
        liveCells += board[i][j].state;
      }
    }
  }

  let currentState = cell.state;

  // Regler baserat på antal grannar och celltyp
  if (currentState === 0 && liveCells === 3) {
    cell.newState = 1;
  } else if (currentState === 1 && (liveCells < 2 || liveCells > 3)) {
    cell.newState = 0;
  } else if (cell.age > 20) { // Om cellen lever längre än 20 cykler
    cell.newState = 0; // Dör
  } else {
    if (cell.type === 1 && liveCells > 4) { // Aggressiv cell
      cell.newState = 1; // Aggressiva celler överlever lättare
    } else if (cell.type === 2 && liveCells < 2) { // Passiv cell
      cell.newState = 0; // Passiva celler dör lättare i ensamhet
    } else {
      cell.newState = currentState;
    }
  }
}

function calculateLiving() {
  let flat = board.flat();
  let living = flat.reduce((acc, cell) => acc + cell.state, 0);
  console.log(living);
}

// Funktion för att skapa miljöförändringar över tid
function environmentChanges() {
  if (frameCount % 100 === 0) {
    let x = Math.floor(Math.random() * boardsize);
    let y = Math.floor(Math.random() * boardsize);
    let regionSize = Math.floor(Math.random() * 10) + 5;

    for (let i = Math.max(0, x - regionSize); i < Math.min(boardsize, x + regionSize); i++) {
      for (let j = Math.max(0, y - regionSize); j < Math.min(boardsize, y + regionSize); j++) {
        if (board[i][j].state === 0) {
          board[i][j].newState = 1; // Skapar en "explosion" av liv
        }
      }
    }
  }
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

  environmentChanges(); // Lägg till miljöförändringar

  count++;
  if (count == lifecycle) {
    count = 0;
  }
}
