function setup(){
    createCanvas(1000, 1000);
    frameRate(10);
}

const originalSize = 40;

//Colors
let black = [15, 15, 15];
let lightGreen = [210, 230, 180];
let lightRed = [235, 160, 140];
let white = [255, 255, 255];


function getRandomValue(){

    variable = Math.random() * 7;
    
    return variable;
}

function drawSquare(x, y){
    push();
    beginShape();
    vertex(
    x + getRandomValue(),
    y+ getRandomValue()
    );
    
    vertex(
        x + originalSize - getRandomValue(),
        y + getRandomValue()
    );

    vertex(
        x + originalSize - getRandomValue(),
        y + originalSize + - getRandomValue()
    );

    vertex(
        x + getRandomValue(), y + originalSize + - getRandomValue()
    );
    endShape(CLOSE);
    pop();
}



function draw() {

    background(240, 240, 220);
    noStroke();


    for (let x = 0; x < 26; x++){
    for(let y = 0; y < 26; y++){
    
        //Random to draw square or not
        if (Math.random() > 0.3){
            push();
            const colorVariable = Math.random();
            const strokeVariable = Math.random();

            //Randomize color on fill
            if(colorVariable < 0.25){
                fill(lightRed);

            } else if (colorVariable < 0.5){

                fill(lightGreen);
            } else if (colorVariable < 0.75){

                fill(black);
            } else {
                noFill();
                strokeWeight(2.5);
                //Randomize color on stroke (noFill scenarios)
                if(strokeVariable < 0.33){
                    stroke(lightRed);
                } else if (strokeVariable < 0.66){
                    stroke(lightGreen);
                } else{
                    stroke(black);
                } 

            }

            drawSquare(x* originalSize, y * originalSize);
            pop();
        }
    }
    }

    noLoop();
}

//REFERENCES
// Line 23-44 is inspired and created by looking at molnar.js example from Garrit Lecture
// https://play.ju.se/media/Noise+examples%2C+and+Vera+Moln%C3%A1r/0_3pcpvm3q






