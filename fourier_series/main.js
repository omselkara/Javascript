let angle = 340;
let radius = 100;
let n = 10;
let points = [];
function setup() {
    createCanvas(800,800);
    frameRate(60);
}

function draw() {
    background(0);
    noFill();
    stroke(255);
    let x = 200;
    let y = 400;
    let prevx = 200;
    let prevy = 400;
    for (let i=0;i<n;i++){
        let rad = radius*(4/((i*2+1)*Math.PI))
        ellipse(prevx,prevy,rad*2);
        x = rad*Math.cos(angle*Math.PI/180*(i*2+1))+prevx;
        y = rad*Math.sin(angle*Math.PI/180*(i*2+1))+prevy;
        line(prevx,prevy,x,y);
        prevx = x;
        prevy = y;
    }
    points.unshift(y);
    if (points.length>500){
        points.pop();
    }
    beginShape();
    noFill();
    for (let i=0;i<points.length;i++){
        vertex(200+radius*2+i,points[i]);
    }
    endShape();
    line(x,y,200+radius*2,points[0]);
    angle++;
}
