let walls = [];
let rays = [];
let sharpness = 0.1;
let nwall = 10;
function setup(){
    createCanvas(800,800)
    frameRate(60);
    walls.push(new wall(0,0,800,0));
    walls.push(new wall(800,0,800,800));
    walls.push(new wall(800,800,0,800));
    walls.push(new wall(0,800,0,0));
    /*
    for (let i=0;i<nwall;i++){
        walls.push(new wall(rand(0,width),rand(0,height),rand(0,width),rand(0,height)));
    }
    */
    let y = 350;
    for (let i=0;i<10;i++){
        walls.push(new wall(400,y,400,y+2));
        y+= 5;
    }
    
    for (let i=0;i<360;i+=sharpness){
        rays.push(new ray(i));
    }
}
function draw(){
    background(0);
    for (let i of walls){
        i.show();
    }
    if (mouseX>=0 && mouseX<width && mouseY>=0 && mouseY<height){
        let vertexes = [];
        for (let i of rays){
            let closest = Infinity;
            let targetx;
            let targety;
            for (let a of walls){
                let target = i.cast(mouseX,mouseY,a);
                if (target!=null){
                    if (dist(mouseX,mouseY,target[0],target[1])<closest){
                        closest = dist(mouseX,mouseY,target[0],target[1]);
                        targetx = target[0];
                        targety = target[1];
                    }
                }
            }
            vertexes.push([targetx,targety]);
        }
        fill(200,200,0);
        strokeWeight(0);
        beginShape();
        for (let i of vertexes){
            vertex(i[0],i[1]);
        }
        endShape()
    }
}

