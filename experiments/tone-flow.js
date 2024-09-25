let rows, cols;
const fieldSize = 100;
const maxCols = Math.ceil(innerWidth / fieldSize);
const maxRows = Math.ceil(innerHeight / fieldSize);
const divider = 10;
let field;
let agents = [];
let synth;
let soundEnabled = false;
let highlightedCells = [];
let previousCell = { x: -1, y: -1 };
let lastPlayTime = 0;

const notes = ["C4", "D4", "E4", "F4", "G4", "A4", "B4", "C5"];

function setup() {
  createCanvas(innerWidth, innerHeight);
  field = generateField();
  generateAgents();

  synth = new Tone.Synth().toDestination();
  
  Tone.start().then(() => {
    soundEnabled = true;
  });
}

function mousePressed() {
  generateAgents();
  field = generateField();
}

function generateField() {
  let field = [];
  noiseSeed(Math.random() * 100);
  for (let x = 0; x < maxCols; x++) {
    field.push([]);
    for (let y = 0; y < maxRows; y++) {
      const value = noise(x / divider, y / divider) * Math.PI * 2;
      field[x].push(p5.Vector.fromAngle(value));
    }
  }
  return field;
}

function generateAgents() {
  for (let i = 0; i < 1; i++) {
    let agent = new Boid(
      Math.random() * innerWidth,
      Math.random() * innerHeight,
      8,
      0.05
    );
    agents.push(agent);
  }
}

class Boid {
  constructor(x, y, maxSpeed, maxForce) {
    this.position = createVector(x, y);
    this.acceleration = createVector(0, 0);
    this.velocity = createVector(0, 0);
    this.maxSpeed = maxSpeed;
    this.maxForce = maxForce;
  }

  follow(desiredDirection) {
    desiredDirection = desiredDirection.copy();
    desiredDirection.mult(this.maxSpeed);
    let steer = p5.Vector.sub(desiredDirection, this.velocity);
    steer.limit(this.maxForce);
    this.applyForce(steer);
  }

  applyForce(force) {
    this.acceleration.add(force);
  }

  update() {
    this.velocity.add(this.acceleration);
    this.velocity.limit(this.maxSpeed);
    this.position.add(this.velocity);
    this.acceleration.mult(0);
  }

  checkBorders() {
    if (this.position.x < 0) {
      this.position.x = innerWidth;
    } else if (this.position.x > innerWidth) {
      this.position.x = 0;
    }
    if (this.position.y < 0) {
      this.position.y = innerHeight;
    } else if (this.position.y > innerHeight) {
      this.position.y = 0;
    }
  }

  draw() {
    push();
    translate(this.position.x, this.position.y);
    fill(0, 0, 255);
    ellipse(0, 0, 10);
    pop();
  }
}

function draw() {
  background(255);
  drawField();

  for (let agent of agents) {
    const x = Math.floor(agent.position.x / fieldSize);
    const y = Math.floor(agent.position.y / fieldSize);
    const desiredDirection = field[x][y];
    agent.follow(desiredDirection);
    agent.update();
    agent.checkBorders();
    agent.draw();

    if (soundEnabled) {
      if (x !== previousCell.x || y !== previousCell.y) {
        playNote();
        highlightCell(x, y);
        previousCell = { x, y };
      }
    }
  }
  for (let i = highlightedCells.length - 1; i >= 0; i--) {
    if (millis() - highlightedCells[i].time > 500) {
      highlightedCells.splice(i, 1);
    }
  }
}

function drawField() {
  for (let x = 0; x < maxCols; x++) {
    for (let y = 0; y < maxRows; y++) {
      push();
      translate(x * fieldSize, y * fieldSize);
      stroke(0);
      fill(255);
      rect(0, 0, fieldSize, fieldSize);

      const isHighlighted = highlightedCells.some(cell => cell.x === x && cell.y === y);
      if (isHighlighted) {
        fill(0, 0, 255, 150);
        rect(0, 0, fieldSize, fieldSize);
      }

      pop();
    }
  }
}

function highlightCell(x, y) {
  highlightedCells.push({ x, y, time: millis() });
}

function playNote() {
  const currentTime = Tone.now();
  if (currentTime - lastPlayTime > 0.1) {
    let note = random(notes);
    synth.triggerAttackRelease(note, "8n", currentTime);
    lastPlayTime = currentTime;
  }
}


/*
REFERENCES


    CODE NOT DONE YET!



*/