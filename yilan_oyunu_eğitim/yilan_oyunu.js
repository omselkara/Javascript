let rgbs = {
    0 : [255,255,255],
    1 : [50,50,50],
    100 : [200,0,0]
}
let haritalar = [];
let net = new network(2,[4],50);
function setup() {
    createCanvas(1100,600);
    for (let y of range(0,5)){
        for (let x of range(0,10)){
            haritalar.push(new game(x*100,y*100,20,20,5,rgbs));
        }
    }
}
let best = 0
let hedef=150;
let kayıt = false;
function draw() {
    frameRate(10000);
    background(200,200,200);
    textSize(20);
    fill(0);
    strokeWeight(0);
    text("Best:"+best,10,550);
    text("Generation:"+(net.generation+1),150,550);
    let index=0;
    let bitme = true;
    for (let i of haritalar){
        if (!i.dead){
            bitme = false;
            let sol=0,sağ=0,yukarı=0,aşağı=0;
            if (i.head.x-1<0){
                sol = -1;
            }
            if (i.head.x+1>19){
                sağ = -1;
            }
            if (i.head.y-1<0){
                yukarı = -1;
            }
            if (i.head.y+1>19){
                aşağı = -1;
            }
            if (sol==0){
                if (i.harita[i.head.y][i.head.x-1]==1){
                    sol = -1;
                }
            }
            if (sağ==0){
                if (i.harita[i.head.y][i.head.x+1]==1){
                    sağ = -1;
                }
            }
            if (yukarı==0){
                if (i.harita[i.head.y-1][i.head.x]==1){
                    yukarı = -1;
                }
            }
            if (aşağı==0){
                if (i.harita[i.head.y+1][i.head.x]==1){
                    aşağı = -1;
                }
            }
            let yeni = [i.food.x-i.head.x,i.food.y-i.head.y];
            /*let yeni = [];
            let ins = [[-1,-1,-1,-1,-1],[-1,-1,-1,-1,-1],[-1,-1,0,-1,-1],[-1,-1,-1,-1,-1],[-1,-1,-1,-1,-1]];
            for (let y of range(i.head.y-2,i.head.y+3)){
                for (let x of range(i.head.x-2,i.head.x+3)){
                    if (y>=0 && x>=0 && y<=19 && x<=19 && y!=i.head.y && x!=i.head.x){
                        if (i.harita[y][x]==1){
                            ins[i.head.y+2-y][i.head.x+2-x] = -1;    
                        }
                        if (i.harita[y][x]==0){
                            ins[i.head.y+2-y][i.head.x+2-x] = 0;    
                        }
                        
                    }
                }
            }
            for (let a of ins){
                for (let o of a){
                    yeni.push(o);
                }
            }*/
            let out = net.genomes[index].activate(yeni);
            if (out[0]>=0.5 && sağ==0){
                i.press('d');
            }
            else if (out[1]>=0.5 && sol==0){
                i.press('a');
            }
            else if (out[2]>=0.5 && yukarı==0){
                i.press('w');
            }
            else if (out[3]>=0.5 && aşağı==0){
                i.press('s');
            }
            if (i.head.yön=="sağ" && sağ==-1){
                if (yukarı==0){
                    i.press('w');
                }
                else{
                    i.press('s');
                }
            }
            if (i.head.yön=="sol" && sol==-1){
                if (yukarı==0){
                    i.press('w');
                }
                else{
                    i.press('s');
                }
            }
            if (i.head.yön=="yukarı" && yukarı==-1){
                if (sol==0){
                    i.press('a');
                }
                else{
                    i.press('d');
                }
            }
            if (i.head.yön=="aşağı" && aşağı==-1){
                if (sol==0){
                    i.press('a');
                }
                else{
                    i.press('d');
                }
            }
            for (let gövde of i.gövdeler){
                gövde.yapilcak.push([i.head.x,i.head.y,i.head.yön]);
            }
            if (i.sayısı>=hedef){
                i.dead = true;
            }
        }
        i.show();
        index++;
    }
    if (bitme){
        for (let i of range(0,50)){
            net.genomes[i].fitness = haritalar[i].fitness;
            if (haritalar[i].fitness>best){
                best = haritalar[i].fitness;
            }
        }
        //hedef += 10;
        haritalar = [];
        for (let y of range(0,5)){
            for (let x of range(0,10)){
                haritalar.push(new game(x*100,y*100,20,20,5,rgbs));
            }
        }
        if (kayıt){
            kayıt = false;
            saveall();        
        }
        net.select();
    }
}
