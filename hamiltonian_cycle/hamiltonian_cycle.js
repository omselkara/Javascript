let w = 20;
let harita;
let col = 26;
let row = 14;
let sıra = 0;
function setup() {
    createCanvas(1200,1200);
    harita = [];
    for (let y of range(0,row)){
        harita.push([]);
        for (let x of range(0,col)){
            harita[y].push([false,false,false,false]);
        }
    }
    harita = solve(harita,0,0,0,1,false);
    for (let y of range(0,row)){
        for (let x of range(0,col)){
            rectangle(x*w,y*w,x*w+w,y*w+w,[255,255,255],[0,0,0],1);
        }
    }
}
function draw() {
    if (harita[sıra][2]=="a"){
        fill(0);
        stroke(0);
        strokeWeight(10);
        line(harita[sıra][0]*w+(w/2),harita[sıra][1]*w+(w/2),harita[sıra][0]*w+(w/2)-w,harita[sıra][1]*w+(w/2))
    }
    if (harita[sıra][2]=="d"){
        fill(0);
        stroke(0);
        strokeWeight(10);
        line(harita[sıra][0]*w+(w/2),harita[sıra][1]*w+(w/2),harita[sıra][0]*w+(w/2)+w,harita[sıra][1]*w+(w/2))
    }
    if (harita[sıra][2]=="w"){
        fill(0);
        stroke(0);
        strokeWeight(10);
        line(harita[sıra][0]*w+(w/2),harita[sıra][1]*w+(w/2),harita[sıra][0]*w+(w/2),harita[sıra][1]*w+(w/2)-w)
    }
    if (harita[sıra][2]=="s"){
        fill(0);
        stroke(0);
        strokeWeight(10);
        line(harita[sıra][0]*w+(w/2),harita[sıra][1]*w+(w/2),harita[sıra][0]*w+(w/2),harita[sıra][1]*w+(w/2)+w)
    }
    if (sıra<harita.length-1){
        sıra++;
    }
}
