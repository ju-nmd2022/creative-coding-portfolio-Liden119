let rows, cols;
const fieldSize = 100;
const maxCols = Math.ceil(innerWidth / fieldSize);
const maxRows = Math.ceil(innerHeight / fieldSize);
const divider = 10;
let field;
let agent;
let filter, player;
let oscillator; 
let oscillatorGain; 
let soundEnabled = false;
let started = false; 

function preload() {
  player = new Tone.Player("music.mp3").toDestination(); 
  player.autostart = false;
  player.loop = true;
}

function setup() {
  createCanvas(innerWidth, innerHeight);
  field = generateField();
  agent = new Boid(
    Math.random() * innerWidth,
    Math.random() * innerHeight,
    2,
    0.05
  );

  filter = new Tone.Filter(400, "lowpass").toDestination();
  player.connect(filter);

  let toneStarted = false;

  function startAudio() {
    if (!toneStarted) {
      Tone.start().then(() => {
        toneStarted = true; 
        soundEnabled = true;
        player.load("music.mp3").then(() => {
          player.start(); 
          loop(); 
        });
      }).catch(error => {
        console.error("Error starting Tone.js:", error);
      });
    }
  }

  canvas.addEventListener('mousedown', () => {
    if (!started) { 
      started = true;
      startAudio();
    } else {
      field = generateField();
      agent.position.set(Math.random() * innerWidth, Math.random() * innerHeight);
    }
  });

  const options = {
    oscillator: {
      type: "sine", 
    },
    envelope: {
      attack: 0.005,
      decay: 0.1,
      sustain: 0.3,
      release: 1,
    },
  };

  oscillatorGain = new Tone.Gain(0).toDestination(); 
  oscillator = new Tone.Oscillator(options).connect(oscillatorGain);
  oscillator.start(); 

  noLoop();
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
    fill(180, 255, 100);
    ellipse(0, 0, 20);
    pop();
  }
}

function draw() {
  background(255);
  
  if (!started) {
    fill(0);
    textSize(32);
    textAlign(CENTER, CENTER);
    text("Click the screen to start", width / 2, height / 2);
    return; 
  }

  drawField(); 

  const x = Math.floor(agent.position.x / fieldSize);
  const y = Math.floor(agent.position.y / fieldSize);
  const desiredDirection = field[x][y];
  agent.follow(desiredDirection);
  agent.update();
  agent.checkBorders();
  agent.draw();
  
  if (soundEnabled) {
    controlFilter(x, y);
    controlOscillatorGain(); 
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
      pop();
    }
  }
}

function controlFilter(x, y) {
  const frequency = map(x, 0, width, 200, 2000);
  const resonance = map(noise(y / divider, x / divider), 0, 1, 1, 20);
  filter.frequency.value = frequency;
  filter.Q.value = resonance;
  const volume = map(agent.position.y, height, 0, -30, 0);
  player.volume.value = volume; 
}

function controlOscillatorGain() {
  const gainValue = map(agent.position.y, height, 0, 0.1, 0); 
  oscillatorGain.gain.value = gainValue; 
}


/*
REFERENCES


    CODE NOT DONE YET!



*/