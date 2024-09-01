function setup(){
    createCanvas(1000, 1000);
    frameRate(2);
}

const originalSize = 40;
const divider = 10;
const halfOriginalSize = 20;

//Colors
let black = [15, 15, 15];
let lightGreen = [210, 230, 180];
let lightRed = [235, 160, 140];
let white = [255, 255, 255];


function getRandomValue(){
    variable = Math.random() * 15;
    return variable;
}

function drawEllipse(x, y){
    const value = noise(x/divider, y/divider) * originalSize;
    ellipse(originalSize/2 + x * originalSize, originalSize/2 + y * originalSize, value);
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

            drawEllipse(x, y);
             pop();
        }
    }
    }

}

//REFERENCES
// Line 23-24 is inspired and created by looking at Noise_02.JS example from Garrit Lecture
// https://play.ju.se/media/Noise+examples%2C+and+Vera+Moln%C3%A1r/0_3pcpvm3q


