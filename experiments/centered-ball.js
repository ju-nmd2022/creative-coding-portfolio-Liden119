class Agent {
    constructor(x, y, maxSpeed, maxForce) {
        this.position = createVector(0, y);
        this.lastPosition = createVector(x, y);
        this.acceleration = createVector(0, 0);
        this.velocity = createVector(0, 0);
        this.maxSpeed = maxSpeed;
        this.maxForce = maxForce;

        this.colorOffset = random(1000);
        this.colorValue = random(255);
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
        let r = noise(this.colorOffset * 0.01) * 255;
        let g = noise(this.colorOffset + 1000 * 0.01) * 255;
        let b = noise(this.colorOffset + 2000 * 0.01) * 255;

        push();
        stroke(r, g, b, 40);
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

function setup() {
    createCanvas(innerWidth, innerHeight);
    background(235, 235, 235);
    field = generateField();
    generateAgents();
}

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

function generateAgents() {
    for (let i = 0; i < 200; i++) {
        let agent = new Agent(
            Math.random() * innerWidth,
            Math.random() * innerHeight,
            4,
            0.1
        );
        agents.push(agent);
    }
}

const fieldSize = 50;
const maxCols = Math.ceil(innerWidth / fieldSize);
const maxRows = Math.ceil(innerHeight / fieldSize);
let field;
let agents = [];

function draw() {
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


//REFERENCES
// The foundation of code is based on code showcased from the lecture Complexity
// https://ju.slides.com/garrit/cc2024-complexity?token=Nl2_bLqJ#/9/5 where
// Flowfields are introduced, and based on that foundation I have experimented
// with values mostly
//
// Line 10-11 & 53-55 took some small help from Chat GPT to make it work
// after some struggle with the noise values being the same for all 3 R, G & B
// and be able to reach a specific "wanted" result.
