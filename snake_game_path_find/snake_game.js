let harita = [];
let kafa;
let gövdeler = [];
let dead = false;
let newframe = false;
let yemek;
function setup(){
    createCanvas(1366,768);
    for (let y of range(0,15)){
        harita.push([]);
        for (let x of range(0,27)){
            harita[y].push(0);
        }
    }
    kafa = new head();
    gövdeler.push(new body(0,0,"sağ"));
    yemek = new food();
    harita[0][1] = 1;
    harita[0][0] = 1;
}
function draw(){
    newframe = true;
    if (keyIsPressed && key == " "){
        frameRate(1000);
    }
    else{
        frameRate(5);
    }
    background(0);
    let a = [];
    for (let y of range(0,15)){
        a.push([]);
        for (let x of range(0,27)){
            if (harita[y][x]==1){
                a[y].push([true,true,true,true]);
            }
            else{
                a[y].push([false,false,false,false]);
            }
        }
    }
    a[kafa.y][kafa.x] = [false,false,false,false];
    let çözüm = solve(a,kafa.x,kafa.y,yemek.x,yemek.y);
    press(çözüm[0][2]);
    if (!dead){
        rectangle(xr(0),yr(0),xr(27),yr(15),[0,0,0],[255,255,255],1);
        harita[kafa.y][kafa.x] = 0;
        kafa.show();
        if (kafa.x>26){
            dead = true;
        }
        if (kafa.x<0){
            dead = true;
        }
        if (kafa.y>14){
            dead = true;
        }
        if (kafa.y<0){
            dead = true;
        }
        if (!dead){
            harita[kafa.y][kafa.x] = 1;
            for (let gövde of gövdeler){
                harita[gövde.y][gövde.x] = 0;
                gövde.show();
                harita[gövde.y][gövde.x] = 1;
            }
            for (let gövde of gövdeler){
                if (kafa.x==gövde.x && kafa.y==gövde.y){
                    dead = true;
                }
            }
            if (kafa.x==yemek.x && kafa.y==yemek.y){
                let x=0;
                let y=0;
                if (gövdeler[gövdeler.length-1].yön=="sol"){
                    x = 1;
                }
                if (gövdeler[gövdeler.length-1].yön=="sağ"){
                    x = -1;
                }
                if (gövdeler[gövdeler.length-1].yön=="yukarı"){
                    y = 1;
                }
                if (gövdeler[gövdeler.length-1].yön=="aşağı"){
                    y = -1;
                }
                gövdeler.push(new body(gövdeler[gövdeler.length-1].x+x,gövdeler[gövdeler.length-1].y+y,gövdeler[gövdeler.length-1].yön));
                for (let i of gövdeler[gövdeler.length-2].yapılacak){
                    gövdeler[gövdeler.length-1].yapılacak.push([i[0],i[1],i[2]]);
                }
                let boş = [];
                for (let y of range(0,15)){
                    for (let x of range(0,27)){
                        if (harita[y][x]==0){
                            boş.push([x,y]);
                        }
                    }
                }
                let seçilen = boş[parseInt(rand(0,boş.length-1+0.9999999999999999))];
                yemek.x = seçilen[0];
                yemek.y = seçilen[1];
                harita[gövdeler[gövdeler.length-1].y][gövdeler[gövdeler.length-1].x] = 1;
            }
            yemek.show();
        }
        if (dead){
            background(0);
        }
    }
}
function xr(x){
    return x*50+8
}
function yr(y){
    return y*50+9
}
function press(event){
    if (newframe){
        if (event=="d" && kafa.yön!="sol"){
            kafa.yön = "sağ";
            newframe = false;
        }
        if (event=="a" && kafa.yön!="sağ"){
            kafa.yön = "sol";
            newframe = false;
        }
        if (event=="w" && kafa.yön!="aşağı"){
            kafa.yön = "yukarı";
            newframe = false;
        }
        if (event=="s" && kafa.yön!="yukarı"){
            kafa.yön = "aşağı";
            newframe = false;
        }
        if (!newframe){
            for (let gövde of gövdeler){
                gövde.yapılacak.push([kafa.x,kafa.y,kafa.yön]);
            }
        }
    }
}