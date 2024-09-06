class Agent {
    constructor(x, y, maxSpeed, maxForce) {
      this.position = createVector(x, y);
      this.lastPosition = this.position.copy();
      this.acceleration = createVector(0, 0);
  
      let angle = random(0, TWO_PI);  
      this.velocity = p5.Vector.fromAngle(angle).mult(random(1, 3));
  
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
      stroke(colorValue, colorValue, colorValue, 40);
      strokeWeight(strokeWeightValue);
      line(
        this.lastPosition.x,
        this.lastPosition.y,
        this.position.x,
        this.position.y
      );
      pop();
      if(strokeWeightValue > 0.05){
      strokeWeightValue -= Math.random() * innerHeight * 0.00000014;
    } else {
      drawActivated = false;
    }
    }
  }
  
  
  class Particle {
    constructor(x, y) {
      this.position = createVector(x, y);
      const a = Math.random() * Math.PI * 2;
      const v = 0.2 + Math.random();
      this.velocity = createVector(Math.cos(a) * v, Math.sin(a) * v);
      this.lifespan = 100 + Math.random() * 100;
      this.opacity = 50;
    }
  
    update() {
      this.lifespan--;
      this.velocity.mult(0.99);
      this.position.add(this.velocity);
      this.opacity -= 0.2;
    }
  
    draw() {
      push();
      translate(this.position.x, this.position.y);
      noStroke();
      fill(colorValue, colorValue, colorValue, this.opacity);
      ellipse(0, 0, 0.5);
      pop();
    }
  
    isDead() {
      return this.lifespan <= 0;
    }
  }
  
  let colorValue = 230;
  let strokeWeightValue = 2;
  let drawActivated = true;
  let seed;
  
  function setup() {
    createCanvas(innerWidth, innerHeight);
    background(180, 120, 130);
    field = generateField();
    generateAgents(innerWidth/2, innerHeight/2);
    seed = Math.floor(Math.random()*10000);  
  }
  
  function redrawArtwork() {
    randomSeed(seed);   
    noiseSeed(seed);  
    field = generateField();
    agents = []; 
    strokeWeightValue = 2;
    drawActivated = true;
    generateAgents(mouseX, mouseY);
  }
  
  function mouseClicked() {
    for (let agent of agents) {
      if(Math.random()>0.98){
      generateParticles(agent.position.x, agent.position.y);
    } else{
      agents.splice(agents.indexOf(agent), 1);
    }
    }
      seed = Math.floor(random(10000));
      redrawArtwork(); 
  }
  
  function generateField() {
    let field = [];
    let noiseOffsetX = random(1000); 
    let noiseOffsetY = random(1000);
  
    for (let x = 0; x < maxCols; x++) {
      field.push([]);
      for (let y = 0; y < maxRows; y++) {
        const value = noise((x + noiseOffsetX) / divider, (y + noiseOffsetY) / divider) * TWO_PI * 2;
        field[x].push(p5.Vector.fromAngle(value));
      }
    }
    return field;
  }
  
  function generateAgents(Sx, Sy) {
    for (let i = 0; i < 300; i++) {
      let agent = new Agent(
        Sx, 
        Sy,
        4,
        0.1
      );
      agents.push(agent);
    }
  }
  
  const fieldSize = 50;
  const maxCols = Math.ceil(innerWidth / fieldSize);
  const maxRows = Math.ceil(innerHeight / fieldSize);
  const divider = 25;
  let field;
  let agents = [];
  
  function generateParticles(x, y) {
    for (let i = 0; i < 200; i++) {
      const px = x + random(-10, 10);
      const py = y + random(-10, 10);
      const particle = new Particle(px, py);
      particles.push(particle);
    }
  }
  
  let particles = [];
  
  function draw() {
    
    for (let agent of agents) {
      if (drawActivated){
      const x = Math.floor(agent.position.x / fieldSize);
      const y = Math.floor(agent.position.y / fieldSize);
      const desiredDirection = field[x][y];
      agent.follow(desiredDirection);
      agent.update();
      agent.checkBorders();
      agent.draw();
    } else{
      if(Math.random()>0.98){
      generateParticles(agent.position.x, agent.position.y);
    } else{
      agents.splice(agents.indexOf(agent), 1);
    }
    }
    }
  
    for (let particle of particles) {
      particle.update();
      particle.draw();
  
      if (particle.isDead()) {
        particles.splice(particles.indexOf(particle), 1);
      }
    }
  }
  
  
  //References
  //
  // The foundation of code is based on code showcased from the lecture Complexity
  // https://ju.slides.com/garrit/cc2024-complexity?token=Nl2_bLqJ#/9/5 with both
  // code form the parts about Flowfields and Particles combined. 
  // And then I have been experimented both blindly or using knowledge.