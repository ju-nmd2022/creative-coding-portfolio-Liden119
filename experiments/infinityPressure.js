function setup(){
    createCanvas(700, 700);
    frameRate(10);
}

const size = 100;
const divider = 10;
const colorValue = 255;
const colorDivider = 50;
let opacity = 150;
const opacityChange = 0.1;
let colBackground = 0;
let rgbValue;
let bValue;

function noiseColorRGB(x, y){
    return {
        r: noise(x/colorDivider, y/colorDivider) * colorValue,
        g: noise(x/colorDivider, y/colorDivider) * colorValue
      };
}
function randomBlueColor(){
    return{
        b: 205 + (Math.random() * 50)
    };
}


function draw() {
    noStroke();

    //Background "fading" Push, pop to reset the colormode after
    push();
    col = map(noise(colBackground), 0, 1, 0, 100);
    fill(50, 50, col);
    rect(0, 0, 700, 700);
    pop();

    //For loops to draw all the circles, and gives them colors
    for(let x = 100; x < 700; x += 100){
        const currentX = x;

        //Set rules for specifik X-Values to draw down from
        if (x===200 || x===400 || x===600){
            //Draw Y-Ways ellipse
            for(let y = 600; y > 50; y--){
                //Color for ellipse set
                let rgbValue = noiseColorRGB(x, y);
                bValue = randomBlueColor();
                fill(rgbValue.r, rgbValue.g, bValue.b, opacity);

                //draw ellipse
                const value = noise(x/divider, y/divider) * size;
                ellipse(x, y, value);

                //Draw X-ways ellipse "the turns" (Not the last one, x - 600)
                if(y === 51 && x < 600){
                    for(let x = currentX; x < currentX+100; x++){
                        //Color for ellipse set
                        let rgbValue = noiseColorRGB(x, y);
                        bValue = randomBlueColor();
                        fill(rgbValue.r, rgbValue.g, bValue.b, opacity);

                       //draw ellipse
                        const value = noise(x/divider, y/divider) * size;
                        ellipse(x, y, value);
                    }

                    //Changes the opacity randomly up or down (between  20 - 235)
                    if(Math.random() > 0.5){
                        opacity += opacityChange;
                    } else{
                        opacity-= opacityChange;
                    }
                }

                //Changes the opacity randomly up or down (between  20 - 235)
                if(Math.random() > 0.5){
                    if(opacity < 235){
                    opacity += opacityChange;
                  }
                } else{
                    if (opacity > 20){
                    opacity-= opacityChange;
                  }
                }
            }
        }
        else {
            //Draw Y-Ways ellipse
            for(let y = 50; y < 600; y++){
                //Color for ellipse set
                let rgbValue = noiseColorRGB(x, y);
                bValue = randomBlueColor();
                fill(rgbValue.r, rgbValue.g, bValue.b, opacity);

               //draw ellipse
                const value = noise(x/divider, y/divider) * size;
                ellipse(x, y, value);

                //Draw X-ways ellipse "the turns"
                if (y === 599){
                    for(let x = currentX; x < currentX + 100; x++){
                        //Color for ellipse set
                        let rgbValue = noiseColorRGB(x, y);
                        bValue = randomBlueColor();
                        fill(rgbValue.r, rgbValue.g, bValue.b, opacity);

                     //draw ellipse
                        const value = noise(x/divider, y/divider) * size;
                        ellipse(x, y, value);
                    }
                    //Changes the opacity randomly up or down (between  20 - 235)
                if(Math.random() > 0.5){
                    if(opacity < 235){
                    opacity += opacityChange;
                  }
                } else{
                    if (opacity > 20){
                    opacity -= opacityChange;
                  }
                }
                }

                //Changes the opacity randomly up or down (between 20 - 235)
                if(Math.random() > 0.5){
                    if(opacity < 235){
                    opacity += opacityChange;
                  }
                } else{
                    if (opacity > 20){
                    opacity-= opacityChange;
                  }
                }
            }
        }

    
    }

    //Change the background xoff value
    colBackground += 0.1;
    if (colBackground > 255){
        colBackground = 0;
    }

}