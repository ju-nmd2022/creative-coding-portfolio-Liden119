let rows, cols;
const fieldSize = 100;
const maxCols = Math.ceil(innerWidth / fieldSize);
const maxRows = Math.ceil(innerHeight / fieldSize);
const divider = 10;
let field;
let agent;
let filter, player;
let oscillator; // Definiera en oscillator
let oscillatorGain; // Definiera en gain node för oscillatorn
let soundEnabled = false;
let started = false; // Flagga för att spåra om programmet har startats

function preload() {
  player = new Tone.Player("music.mp3").toDestination(); 
  player.autostart = false; // Ställ in på false så att musiken inte startar automatiskt
  player.onended = () => {
    player.start(); // Spela om när låten tar slut
  };
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
        toneStarted = true; // Markera att vi har startat Tone
        soundEnabled = true;
        player.load("music.mp3").then(() => {
          player.start(); // Starta musiken när vi trycker
          loop(); 
        });
      }).catch(error => {
        console.error("Error starting Tone.js:", error);
      });
    }
  }

  canvas.addEventListener('mousedown', () => {
    if (!started) { // Kolla om programmet inte har startats
      started = true; // Markera att programmet har startats
      startAudio(); // Starta ljudet
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

  noLoop(); // Stoppa loopen i början
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
