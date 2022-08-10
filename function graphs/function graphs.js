let w = 5;
function setup() {
    createCanvas(800,800);
    frameRate(30);
    pg = createGraphics(800,800);
    pg.background(255);
    pg.stroke(0);
    pg.strokeWeight(3);
    pg.line(width/2,0,width/2,height);
    pg.line(0,height/2,width,height/2);
    let points = graph();
    pg.strokeWeight(1);
    pg.stroke(255,0,0)
    for (let i=0;i<points.length-1;i++){
        pg.line(points[i][0],points[i][1],points[i+1][0],points[i+1][1])
    }
    
}
function func(x){
    return max(0,x)*(1-max(0,x))*10;
}
function graph(){
    let points = [];
    for (let x=0-width/2;x<=width;x++){
        points.push([x*w+width/2,-1*func(x)+height/2])
    }
    return points
}
function draw() {
    background(255);
    image(pg,0,0);
}
