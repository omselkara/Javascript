let n = 25;
let map = [];
let started = false;
function setup(){
    createCanvas(800,800);
    for (let y of range(0,width/n)){
        map.push([]);
        for (let x of range(0,height/n)){
            map[y].push(false);
        }
    }
    frameRate(5);
}
function draw(){
    background(126);
    for (let y of range(0,height/n)){
        for (let x of range(0,width/n)){
            noFill();
            if (map[y][x]){
                fill(255,255,0);
            }
            stroke(179,179,179);
            strokeWeight(1);
            rect(x*n,y*n,n,n);
        }
    }
    if (started){
        map = gameoflife(map);
    }
}
function backgame(game){
    
}
function gameoflife(map){
    let harita = []
    for (let y of range(0,height/n)){
        harita.push([]);
        for (let x of range(0,width/n)){
            harita[y].push(false);
        }
    }
    for (let y of range(0,height/n)){
        for (let x of range(0,width/n)){
            let neighbors = calcneighbor(map,x,y);
            if (map[y][x]){
                if (neighbors==0 || neighbors==1){
                    harita[y][x] = false;
                }
                else if (neighbors>=4){
                    harita[y][x] = false;
                }
                else if (neighbors==2 || neighbors==3){
                    harita[y][x] = true;
                }
            }
            else{
                if (neighbors==3){
                    harita[y][x] = true;
                }
            }
        }
    }
    return harita;
}
function calcneighbor(map,x,y){
    let neighbors = 0;
    for (let y2 of range(y-1,y+2)){
        for (let x2 of range(x-1,x+2)){
            if (x2>=0 && x2<width/n && y2>=0 && y2<height/n && (x2!=x || y2!=y)){
                if (map[y2][x2]){
                    neighbors++;
                }
            }
        }
    }
    return neighbors;
}
function mousePressed(){
    let mousex = Math.floor(mouseX/n);
    let mousey = Math.floor(mouseY/n);
    if (mouseX>=0 && mouseX<width && mouseY>=0 && mouseY<height){
        if (!started){
            map[mousey][mousex] = !map[mousey][mousex];
        }
    }
}
function keyPressed(){
    if (key==" " && !started){
        started = true;
    }
}