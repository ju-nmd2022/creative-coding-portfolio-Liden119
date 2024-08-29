function setup(){
    createCanvas(700, 700);
    frameRate(10);
}

const size = 100;
const divider = 10;

const colorValue = 255;
const colorDivider = 50;
let opacity = 150;


function draw() {
    background(255, 255, 255);
    noStroke();

    for(let x = 100; x < 700; x += 100){
        const currentX = x;
        if (x===200 || x===400 || x===600){
            for(let y = 600; y > 50; y--){

                //Color set
                const rValue = noise(x/colorDivider, y/colorDivider) * colorValue;
                const gValue = noise(x/colorDivider, y/colorDivider) * colorValue;
                const bValue = 205 + (Math.random() * 50);
                fill(rValue, gValue, bValue, opacity);

                //Elipse drawing
                const value = noise(x/divider, y/divider) * size;
                ellipse(x, y, value);

                if(y === 51 && x < 600){
                    for(let x = currentX; x < currentX+100; x++){
                        const rValue = noise(x/colorDivider, y/colorDivider) * colorValue;
                        const gValue = noise(x/colorDivider, y/colorDivider) * colorValue;
                        const bValue = 205 + (Math.random() * 50);
                
                    fill(rValue, gValue, bValue, opacity);
                        const value = noise(x/divider, y/divider) * size;
                        ellipse(x, y, value);
                    }
                    if(Math.random() > 0.5){
                        opacity ++;
                    } else{
                        opacity--;
                    }
                }

                if(Math.random() > 0.5){
                    opacity ++;
                } else{
                    opacity--;
                }
            }

        }
        else {
            for(let y = 50; y < 600; y++){

                const rValue = noise(x/colorDivider, y/colorDivider) * colorValue;
                const gValue = noise(x/colorDivider, y/colorDivider) * colorValue;
                const bValue = 205 + (Math.random() * 50);
               fill(rValue, gValue, bValue, opacity);
                const value = noise(x/divider, y/divider) * size;
                ellipse(x, y, value);

                if (y === 599){
                    for(let x = currentX; x < currentX + 100; x++){
                        const rValue = noise(x/colorDivider, y/colorDivider) * colorValue;
                        const gValue = noise(x/colorDivider, y/colorDivider) * colorValue;
                        const bValue = 205 + (Math.random() * 50);
                fill(rValue, gValue, bValue, opacity);
                        const value = noise(x/divider, y/divider) * size;
                        ellipse(x, y, value);
                    }
                }

            }
        }

    
    }
    

    noLoop();
}