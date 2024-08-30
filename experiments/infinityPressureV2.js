function setup(){
    createCanvas(700, 700);
    frameRate(10);
}

const centerX = 350;
const centerY = 350;

const size = 100;
const divider = 10;
const colorValue = 255;
const colorDivider = 90;
let opacity = 150;
const opacityChange = 0.1;
let colBackground = 0;
let rgbValue;



function noiseColorRGB(x, y){
    return {
        r: noise(x/colorDivider, y/colorDivider) * colorValue,
        g: noise(x/colorDivider, y/colorDivider) * colorValue,
        b: noise(x/colorDivider, y/colorDivider) * colorValue
      };
}
function randomBlueColor(){
    return{
        b: 205 + (Math.random() * 50)
    };
}


function draw() {
    background(50, 50, 50);



    //For loops to draw all the circles, and gives them colors
    for(let x = 100; x < 700; x += 100){
        const currentX = x;

        //Set rules for specifik X-Values to draw down from
        if (x===200 || x===400 || x===600){
            //Draw Y-Ways ellipse
            for(let y = 620; y > 70; y--){
                //Color for ellipse set 
                if (mouseX > x - 40 && mouseX < x + 40 && mouseY > y - 50 && mouseY < y + 50){
                    let rgbValue = noiseColorRGB(x, y);
                    bValue = randomBlueColor();
                   fill(rgbValue.r, rgbValue.g, bValue.b, opacity);
                } else {
                //Color for ellipse set
                  let rgbValue = noiseColorRGB(x, y);
                  fill(rgbValue.r, rgbValue.g, rgbValue.b, opacity);
                }

                //draw ellipse
                const value = noise(x/divider, y/divider) * size;
                ellipse(x, y, value);

                //Draw X-ways ellipse "the turns" (Not the last one, x - 600)
                if(y === 71 && x < 600){
                    for(let x = currentX; x < currentX+100; x++){

                        if (mouseX > x - 40 && mouseX < x + 40 && mouseY > y - 50 && mouseY < y + 50){
                            let rgbValue = noiseColorRGB(x, y);
                           bValue = randomBlueColor();
                          fill(rgbValue.r, rgbValue.g, bValue.b, opacity);
                        } else {
                        //Color for ellipse set
                          let rgbValue = noiseColorRGB(x, y);
                          fill(rgbValue.r, rgbValue.g, rgbValue.b, opacity);
                        }

                       //draw ellipse
                        const value = noise(x/divider, y/divider) * size;
                        ellipse(x, y, value);
                    }
                }
            }
        }
        else {
            //Draw Y-Ways ellipse
            for(let y = 70; y < 620; y++){
                //Color for ellipse set
                if (mouseX > x - 40 && mouseX < x + 40 && mouseY > y - 50 && mouseY < y + 50){
                    let rgbValue = noiseColorRGB(x, y);
                    bValue = randomBlueColor();
                   fill(rgbValue.r, rgbValue.g, bValue.b, opacity);
                } else {
                //Color for ellipse set
                  let rgbValue = noiseColorRGB(x, y);
                  fill(rgbValue.r, rgbValue.g, rgbValue.b, opacity);
                }

               //draw ellipse
                const value = noise(x/divider, y/divider) * size;
                ellipse(x, y, value);

                //Draw X-ways ellipse "the turns"
                if (y === 619){
                    for(let x = currentX; x < currentX + 100; x++){
                        //Color for ellipse set
                        if (mouseX > x - 40 && mouseX < x + 40 && mouseY > y - 50 && mouseY < y + 50){
                            let rgbValue = noiseColorRGB(x, y);
                            bValue = randomBlueColor();
                           fill(rgbValue.r, rgbValue.g, bValue.b, opacity);
                        } else {
                        //Color for ellipse set
                          let rgbValue = noiseColorRGB(x, y);
                          fill(rgbValue.r, rgbValue.g, rgbValue.b, opacity);
                        }

                     //draw ellipse
                        const value = noise(x/divider, y/divider) * size;
                        ellipse(x, y, value);
                    }
                }
            }
        }
    }

    //For some reason, the text didnt show up at the beginning when I
    // used an IF statement of checking mouse position was outside the box
    // and only started working once the mouse had entered and left the artwork
    //But this "uneffective" way of using if worked immeditely. 
    if(mouseX > 0 && mouseX < 700 && mouseY > 0 && mouseY < 700){
    push();
    noFill();
    strokeWeight(25);
    rect(0, 0, 700, 700);
    pop();
    }else{
    push();
    fill(0, 0, 0);
     const rectWidth = 700;
     const rectHeight = 100;
    let rectX = centerX - rectWidth / 2;
    let rectY = centerY - rectHeight / 2;
    rect(rectX, rectY, rectWidth, rectHeight);

    fill(255, 255, 255);
    textSize(40);
    textAlign(CENTER, CENTER);
    text("Move the mouse on the artwork", centerX, centerY);
    pop();
}
}