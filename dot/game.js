let engeller = [];
let noktalar = [];
let pop = 1000;
let start = false;
let net = new network(pop);
let yer = 0;
function setup(){
    createCanvas(600,600);
    for (let i of range(0,pop)){
        noktalar.push(new dot());
    }
}
function draw(){
    frameRate(100000);
    background(255);
    rectangle(0,0,600,600,[255,255,255],[0,0,0],1)
    rectangle(0,0,600,10,[0,255,0],[0,0,0],0);
    for (let i of engeller){
        rectangle(i[0],i[1],i[2],i[3],[0,0,200],[0,0,0],1);
    }
    if (start){
        let index = 0;
        let dead = true;
        for (let nokta of noktalar){
            if (net.genomes[index].finish==false){
                let degree = net.genomes[index].activate();
                nokta.velx += Math.cos(degree)*1;
                nokta.vely += Math.sin(degree)*1;
                if (nokta.velx>5){
                    nokta.velx = 5;
                }
                if (nokta.velx<-5){
                    nokta.velx = -5;
                }
                if (nokta.vely>5){
                    nokta.vely = 5;
                }
                if (nokta.vely<-5){
                    nokta.vely = -5;
                }
                dead = false;
                if (nokta.x+3>=600 || nokta.x-3<=0 || nokta.y+3>=600 || nokta.y-3<=10){
                    net.genomes[index].finish = true;
                    nokta.velx = 0;
                    nokta.vely = 0;
                    if (nokta.y-3<=10){
                        net.genomes[index].fitness += 1+1000/net.genomes[index].step;
                    }
                }
                else{
                    for (let i of engeller){
                        if (nokta.x+3>=i[0] && nokta.x-3<=i[2] && nokta.y+3>=i[1] && nokta.y-3<=i[3]){
                            net.genomes[index].finish = true;
                            nokta.velx = 0;
                            nokta.vely = 0;
                            break;
                        }
                    }
                }
            }
            nokta.move();
            nokta.show();
            index++;
        }
        if (dead){
            for (let i of range(0,pop)){
                net.genomes[i].fitness += 1/dist(noktalar[i].x,noktalar[i].best,300,10);
            }
            net.select();
            noktalar = [];
            for (let i of range(0,pop)){
                noktalar.push(new dot());
            }
        }
    }
}
function keyPressed(){
    if (key==' '){
        start = true;
        for (let i of range(0,engeller.length)){
            if (engeller[i][0]>engeller[i][2]){
                let yedek = engeller[i][0];
                engeller[i][0] = engeller[i][2];
                engeller[i][2] = yedek;
            }
            if (engeller[i][1]>engeller[i][3]){
                let yedek = engeller[i][1];
                engeller[i][1] = engeller[i][3];
                engeller[i][3] = yedek;
            }
        }
    }
}
function mousePressed(){
    if (!start){
        if (engeller.length==yer){
            engeller.push([]);
        }
        engeller[yer].push(mouseX,mouseY)
        if(engeller[yer].length==4){
            yer++;
        }
    }
}