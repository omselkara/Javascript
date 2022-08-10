function rectangle(x1,y1,x2,y2){
    beginShape();
    vertex(x1,y1);
    vertex(x2,y1);
    vertex(x2,y2);
    vertex(x1,y2);
    vertex(x1,y1);
    endShape(CLOSE);
}
class bird{
    constructor(yer){
        this.x = 75;
        this.yer = yer;
        this.y = 300;
        this.gravity = 0.3;
        this.velocity = 0;
    }
    hareket(){
        this.velocity += this.gravity;
        this.y += this.velocity;
    }
    jump(){
        this.velocity = -7;
    }
    display(){
        this.hareket();
        fill(255,255,0);
        strokeWeight(3);
        ellipseMode(CENTER);
        ellipse(this.x,this.y,20,20);
    }
}
class pipe{
    constructor(){
        this.x = 550;
        this.y = rand(100,500);
    }
    display(){
        this.x -= 2;
        fill(0,255,0);
        strokeWeight(1);
        rectangle(this.x-25,0,this.x+25,this.y-75);
        rectangle(this.x-25,this.y+75,this.x+25,600);
    }
}
function rand(min,max){
    return Math.random() *(max-min)+min;
}
let pop = 100;
let frame=0;
let birds = [],
    pipes = [],
    skor = 0,
    net = new network(3,[3,3,1],pop)
    pipeno = 0;
function reset(){
    birds = [],
    pipes = [],
    skor = 0,
    pipeno = 0;
    for (let i=0;i<pop;i++){
        birds.push(new bird(i));
    }
    frame=0;
    net.select();
}
function setup(){
    createCanvas(400,600);
    birds = [],
    pipes = [],
    skor = 0,
    pipeno = 0;
    for (let i=0;i<pop;i++){
        birds.push(new bird(i));
    }
    frame=0;
}
function draw(){
    background(0,0,255);
    if (frame%180==0){
        pipes.push(new pipe());
    }
    for (let i of pipes){
        i.display();
        if (pipes.length>pipeno){
            if (pipes[pipeno].x+25<=75){
                pipeno += 1;
                skor += 1;
                for (let i of birds){
                    net.genomes[i.yer].fitness += 1;
                }
            }
        }
    }
    if (pipes.length>pipeno){
        if (pipes[pipeno].x+25<=0){
            pipes.splice(pipeno,1);
            pipeno -= 1;
        }
    }
    let ölenler = [];
    let index = 0;
    for (let i of birds){
        if (i.y >= 610 || i.y<-10){
            ölenler.push(index);
        }
        if (pipes.length>pipeno){
            if ((i.x>=pipes[pipeno].x-25 && i.x<=pipes[pipeno].x+25) && (i.y<=pipes[pipeno].y-75 || i.y>=pipes[pipeno].y+75)){
                ölenler.push(index);  
            }
        }
        index += 1;
    }
    ölenler = ölenler.reverse();
    for (let i of ölenler){
        net.genomes[birds[i].yer].fitness -= 5;
        birds.splice(i,1);
    }
    if (birds.length==0){
        reset();
    }
    else{
        for (let i of birds){
            let output = net.genomes[i.yer].activate([i.y,pipes[pipeno].y-75,pipes[pipeno].y+75]);
            if (output[0]>=0.5){
                i.jump();
            }
            i.display();
        }
        fill(255);
        textSize(30);
        text(skor,200,75);
        frame += 1;
        for (let i of birds){
            net.genomes[i.yer].fitness += 0.1;
        }
    }
}