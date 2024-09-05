
//AGENT

class Agent {
    constructor(x, y, maxSpeed, maxForce) {
      this.position = createVector(x, y);
      this.lastPosition = createVector(x, y);
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
      this.lastPosition = this.position.copy();
  
      this.velocity.add(this.acceleration);
      this.velocity.limit(this.maxSpeed);
      this.position.add(this.velocity);
      this.acceleration.mult(0);
    }
  
    checkBorders() {
      if (this.position.x < 0) {
        this.position.x = innerWidth;
        this.lastPosition.x = innerWidth;
      } else if (this.position.x > innerWidth) {
        this.position.x = 0;
        this.lastPosition.x = 0;
      }
      if (this.position.y < 0) {
        this.position.y = innerHeight;
        this.lastPosition.y = innerHeight;
      } else if (this.position.y > innerHeight) {
        this.position.y = 0;
        this.lastPosition.y = 0;
      }
    }


  
    draw() {
      push();
      stroke(100, 100, 100, 40);
      strokeWeight(1);
      line(
        this.lastPosition.x,
        this.lastPosition.y,
        this.position.x,
        this.position.y
      );
      pop();
    }
  }













//FIELDS



function generateField() {
    let field = [];
    let center = createVector(innerWidth / 2, innerHeight / 2);
    for (let x = 0; x < maxCols; x++) {
        field.push([]);
        for (let y = 0; y < maxRows; y++) {
            let posX = x * fieldSize + fieldSize / 2;
            let posY = y * fieldSize + fieldSize / 2;
            let position = createVector(posX, posY);
            let direction = p5.Vector.sub(center, position);
            field[x].push(direction);
        }
    }
    return field;
}

function generateField() {
    let field = [];

    // noiseSeed(Math.random() * 100);

    for (let x = 0; x < maxCols; x++) {
      field.push([]);
      for (let y = 0; y < maxRows; y++) {
        const value = noise(x / divider, y / divider) * Math.PI * 2;
        field[x].push(p5.Vector.fromAngle(value));
      }
    }
    return field;
  }

  //NEW FIELD

  function generateField() {
    let field = [];

    for(let x = 0; x < maxCols; x++){
        field.push([]);
        for(let y = 0; y < maxRows; y++){
            const value = PI;
            field[x].push(p5.Vector.fromAngle(value));
        }
    }
    return field;
  }
