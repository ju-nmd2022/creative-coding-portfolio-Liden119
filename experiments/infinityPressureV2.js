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

function noiseColorRGB(x, y){
    return {
        r: noise(x/colorDivider, y/colorDivider) * colorValue;
        g: noise(x/colorDivider, y/colorDivider) * colorValue;
        b: noise(x/colorDivider, y/colorDivider) * colorValue;
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
            for(let y = 600; y > 50; y--){
                //Color for ellipse set
                let rgbValue = noiseColorRGB(x, y);
                fill(rgbValue.r, rgbValue.g, rgbValue.b, opacity);

                //draw ellipse
                const value = noise(x/divider, y/divider) * size;
                ellipse(x, y, value);

                //Draw X-ways ellipse "the turns" (Not the last one, x - 600)
                if(y === 51 && x < 600){
                    for(let x = currentX; x < currentX+100; x++){
                        //Color for ellipse set
                        const rValue = noiseColorRGB(x, y);
                        const gValue = noiseColorRGB(x, y);
                        const bValue = noiseColorRGB(x, y);
                       fill(rValue, gValue, bValue, opacity);

                       //draw ellipse
                        const value = noise(x/divider, y/divider) * size;
                        ellipse(x, y, value);
                    }
                }
            }
        }
        else {
            //Draw Y-Ways ellipse
            for(let y = 50; y < 600; y++){
                //Color for ellipse set
                const rValue = noiseColorRGB(x, y);
                const gValue = noiseColorRGB(x, y);
                const bValue = noiseColorRGB(x, y);
               fill(rValue, gValue, bValue, opacity);

               //draw ellipse
                const value = noise(x/divider, y/divider) * size;
                ellipse(x, y, value);

                //Draw X-ways ellipse "the turns"
                if (y === 599){
                    for(let x = currentX; x < currentX + 100; x++){
                        //Color for ellipse set
                        const rValue = noise(x/colorDivider, y/colorDivider) * colorValue;
                        const gValue = noise(x/colorDivider, y/colorDivider) * colorValue;
                        const bValue = noise(x/colorDivider, y/colorDivider) * colorValue;
                     fill(rValue, gValue, bValue, opacity);

                     //draw ellipse
                        const value = noise(x/divider, y/divider) * size;
                        ellipse(x, y, value);
                    }
                }
            }
        }
    }
}