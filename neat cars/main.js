let walls = [];
let rays = [];
let x = 400;
let y = 50;
let turnrate = 6;
let cars = [];
let pop = 100;
let net = new network(5,[32,16,2],pop);
let net2 = new network(1,[32,16,2],pop);
let target = 100;
let showlines = false;
function setup(){
    createCanvas(800,800)
    frameRate(60);
    walls.push(new wall(0,0,800,0));
    walls.push(new wall(800,0,800,800));
    walls.push(new wall(800,800,0,800));
    walls.push(new wall(0,800,0,0));
    walls.push(new wall(150,150,650,150));
    walls.push(new wall(800,300,300,300));
    walls.push(new wall(150,150,150,650));
    walls.push(new wall(150,450,650,450));
    walls.push(new wall(650,450,650,650));
    walls.push(new wall(650,650,150,650));
    frameRate(60);
    for (let i=0;i<pop;i++){
        cars.push(new car(x,y,turnrate));
    }
}
function draw(){
    background(127.5);
    for (let i of walls){
        i.show();
    }
    let dead = true;
    for (let i=0;i<pop;i++){
        if (!cars[i].dead){
            cars[i].show();
            if (frameCount>=cars[i].movedat+50){
                cars[i].dead = true;
                net2.genomes[i].fitness-=100;
            }
        }
        for (let a of walls){
            if (cars[i].collide([a.x1,a.y1,a.x2,a.y2])){
                cars[i].dead = true;
                break;
            }
        }
        if (!cars[i].dead){
            let inputss = cars[i].inputs(walls);
            let output = net.genomes[i].activate(inputss);
            if (showlines){
                let lines = cars[i].inputs(walls,false);
                for (let a of lines){
                    stroke(255,0,0)
                    strokeWeight(3);
                    fill(255,0,0);
                    line(cars[i].zero.x,cars[i].zero.y,a[0],a[1]);
                    ellipse(a[0],a[1],10);
                }
            }
            let moved = false;
            let out2 = net2.genomes[i].activate([inputss[0]]);
            if (out2[0]>0.5){
                cars[i].move("w");
                moved = true;
            }
            else if(out2[1]>0.5){
                cars[i].move("s");
            }
            if (output[0]>0.5){
                cars[i].turn("a");
            }
            if (output[1]>0.5){
                cars[i].turn("d");
            }
            if (moved){
                cars[i].movedat++;
                if (out2[0]>0.5){
                    net2.genomes[i].fitness++;
                }
            }
            else{
                net2.genomes[i].fitness--;
            }
            net.genomes[i].fitness++;
            dead = false;
        }
        
    }
    if (dead){
        target += 25;
        net.select();
        net2.select();
        cars = [];
        for (let i=0;i<pop;i++){
            cars.push(new car(x,y,turnrate));
        }
    }
}
function keyPressed(){
    if (key=="p"){
        showlines = !showlines;
    }
}

