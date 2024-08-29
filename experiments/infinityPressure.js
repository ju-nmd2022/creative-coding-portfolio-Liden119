function setup(){
    createCanvas(1000, 1000);
    frameRate(10);
}

function getRandomValue(variance){
    return map(Math.random(), 0, 1, -variance, variance);
}

function draw() {
    background(255, 255, 255);
    const size = 100;
    const divider = 10;
    colorVariance = 255;
    opacity = 250;

    noStroke();


    for(let x = 100; x < 700; x += 100){

        const currentX = x;
        if (x===200 || x===400 || x===600){
            for(let y = 600; y > 50; y--){

                const rValue = Math.random() * 100;
                const gValue = Math.random() * 100;
                const bValue = 150;
                
                fill(rValue, gValue, bValue, opacity);
                const value = noise(x/divider, y/divider) * size;
                ellipse(x, y, value);

                if(y === 51){
                    for(let x = 100; x < 200; x++){
                     const rValue = Math.random() * 100;
                      const gValue = Math.random() * 100;
                      const bValue = 150;
                
                    fill(rValue, gValue, bValue, opacity);
                        const value = noise(x/divider, y/divider) * size;
                        ellipse(x, y, value);
                    }
                }
            }

        }
        else {
            for(let y = 50; y < 600; y++){

                const rValue = Math.random() * 100;
                const gValue = Math.random() * 100;
                const bValue = 150;
                fill(rValue, gValue, bValue, opacity);
                const value = noise(x/divider, y/divider) * size;
                ellipse(x, y, value);

                if (y === 599){
                    for(let x = 100; x < 100; x++){
                        const rValue = Math.random() * 100;
                        const gValue = Math.random() * 100;
                        const bValue = 150;
                
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