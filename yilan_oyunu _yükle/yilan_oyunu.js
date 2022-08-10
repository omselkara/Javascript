let rgbs = {
    0 : [255,255,255],
    1 : [50,50,50],
    100 : [200,0,0]
}
let haritalar = [];
let net = new network(2,[4],1);
function setup() {
    createCanvas(600,600);
    load();
    haritalar.push(new game(0,0,20,20,30,rgbs));
    net.select();
}
function draw() {
    frameRate(60);
    background(200,200,200);
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
        }
        i.show();
        index++;
    }
    if (bitme){
        for (let i of range(0,1)){
            net.genomes[i].fitness = haritalar[i].fitness;
        }
        haritalar = [];
        haritalar.push(new game(0,0,20,20,30,rgbs));
        net.select();
        
    }
}
