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
      ellipse(0, 0, 10);
      pop();
    }
  }
  
  function setup() {
    createCanvas(innerWidth, innerHeight);
    field = generateField();
    generateAgents();
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
    for (let i = 0; i < 200; i++) {
      let agent = new Boid(
        Math.random() * innerWidth,
        Math.random() * innerHeight,
        4,
        0.1
      );
      agents.push(agent);
    }
  }
  
  const fieldSize = 50;
  const fieldSizeHalf = fieldSize / 2;
  const maxCols = Math.ceil(innerWidth / fieldSize);
  const maxRows = Math.ceil(innerHeight / fieldSize);
  const divider = 10;
  let field;
  let agents = [];
  
  function draw() {
    background(255, 255, 255);
    for (let x = 0; x < maxCols; x++) {
      for (let y = 0; y < maxRows; y++) {
        const padding = 10;
        const value = field[x][y];
        push();
        translate(x * fieldSize + fieldSizeHalf, y * fieldSize + fieldSizeHalf);
        rotate(value.heading());
        strokeWeight(4);
        stroke(200, 200, 200);
        // Drawing an arrow
        fill(200, 200, 200);
        line(-fieldSizeHalf + padding, 0, fieldSizeHalf - padding, 0);
        triangle(
          fieldSizeHalf - padding,
          0,
          fieldSizeHalf - padding * 2,
          padding,
          fieldSizeHalf - padding * 2,
          -padding
        );
        pop();
      }
    }
  
    for (let agent of agents) {
      const x = Math.floor(agent.position.x / fieldSize);
      const y = Math.floor(agent.position.y / fieldSize);
      const desiredDirection = field[x][y];
      agent.follow(desiredDirection);
      agent.update();
      agent.checkBorders();
      agent.draw();
    }
  }