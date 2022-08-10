let harita = [];
let kafa;
let gövdeler = [];
let dead = false;
let newframe = false;
let yemek;
let çözüm;
let sıra = 1;
let yerler = [];
let show = false;
let kaldır = false;
let framesayı = 0;
let frameyap = true;
let rate = 30;
let mod = 1;
let pa;
let pg;
function setup(){
    print("rate değişkeni FrameRate i,mod değişkeni oyun hızını etkiler");
    createCanvas(1366,768);
    for (let y of range(0,18)){
        harita.push([]);
        for (let x of range(0,32)){
            harita[y].push(0);
        }
    }
    kafa = new head();
    gövdeler.push(new body(0,0,"sağ"));
    yemek = new food();
    harita[0][1] = 1;
    harita[0][0] = 1;
    let a = [];
    for (let y of range(0,18)){
        a.push([]);
        for (let x of range(0,32)){
            a[y].push([false,false,false,false]);
        }
    }
    a[kafa.y][kafa.x] = [false,false,false,false];
    çözüm = solve(a,0,0,0,1,false);
    çözüm.push([0,1,"w"]);
    pg = createGraphics(1920,1080);
    pg.fill(255);
    pg.stroke(0);
    pg.textSize(20);
    let index = 0;
    let w = 60;
    for (let y of range(0,18)){
        yerler.push([]);
        for (let x of range(0,32)){
            yerler[y].push(0);
        }
    }
    for (let i of çözüm){
        if (i[2]=="a"){
            pg.fill(255);
            pg.stroke(255);
            pg.strokeWeight(10);
            pg.line(i[0]*w+(w/2),i[1]*w+(w/2),i[0]*w+(w/2)-w,i[1]*w+(w/2))
        }
        if (i[2]=="d"){
            pg.fill(255);
            pg.stroke(255);
            pg.strokeWeight(10);
            pg.line(i[0]*w+(w/2),i[1]*w+(w/2),i[0]*w+(w/2)+w,i[1]*w+(w/2))
        }
        if (i[2]=="w"){
            pg.fill(255);
            pg.stroke(255);
            pg.strokeWeight(10);
            pg.line(i[0]*w+(w/2),i[1]*w+(w/2),i[0]*w+(w/2),i[1]*w+(w/2)-w)
        }
        if (i[2]=="s"){
            pg.fill(255);
            pg.stroke(255);
            pg.strokeWeight(10);
            pg.line(i[0]*w+(w/2),i[1]*w+(w/2),i[0]*w+(w/2),i[1]*w+(w/2)+w)
        }
        pg.fill(255);
        pg.stroke(0);
        pg.textSize(20);
        pg.text(index,xr(i[0])+30,yr(i[1])+30);
        yerler[i[1]][i[0]] = index;
        index++
    }
    sıra = yerler[kafa.y][kafa.x];
    pa = createGraphics(1920,1080);
}
function draw(){
    background(0);
    if (keyIsPressed && key == " "){
        frameRate(Infinity);
    }
    else{
        frameRate(rate);
    }
    if (!dead){
        pa.background(0);
    }
    for (let asd of range(0,mod)){
        if (!frameyap){
            framesayı += 3;
            if (framesayı%5==0){
                frameyap = true;
            }
        }
        newframe = true;
        press(getkey());
        if (!dead){
            rectangle(xr(0),yr(0),xr(32),yr(18),[0,0,0],[255,255,255],1,true,pa);
            harita[kafa.y][kafa.x] = 0;
            kafa.move();
            sıra = yerler[kafa.y][kafa.x];
            if (kafa.x>31){
                dead = true;
                kafa.x--;
            }
            if (kafa.x<0){
                dead = true;
                kafa.x++;
            }
            if (kafa.y>17){
                dead = true;
                kafa.y--;
            }
            if (kafa.y<0){
                dead = true;
                kafa.y++;
            }
            if (!dead){
                harita[kafa.y][kafa.x] = 1;
                for (let gövde of gövdeler){
                    harita[gövde.y][gövde.x] = 0;
                    gövde.move();
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
                    for (let y of range(0,18)){
                        for (let x of range(0,32)){
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
            }
        }
        //if (dead){
            //background(0);
        //}
        kafa.show();
        for (let i of gövdeler){
            i.show();
        }
        if (!dead){
            yemek.show();
        }
    }
    image(pa,0,0,1366,768);
    if (show){
        image(pg,0,0,1366,768);
    }
}
function xr(x){
    return x*60
}
function yr(y){
    return y*60
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
function checkpath(start,finish){
    let varmı = false;
    let döngü = false
    for (let i of range(start+1,finish)){
        döngü = true;
        if (harita[çözüm[i][1]][çözüm[i][0]]==1 || (çözüm[i][0]==yemek.x && çözüm[i][1]==yemek.y)){
            varmı = true;
            break;
        }
    }
    if (harita[çözüm[finish][1]][çözüm[finish][0]]==1){
        varmı = true;
    }
    if (döngü){
        return !varmı;
    }
    else{
        return false;
    }
}
function getkey(){
    if (kafa.yön=="sağ"){
        let büyüklük = [-10,-10,-10];
        let büyük = 0;
        if (kafa.x<31){
            büyüklük[2] = yerler[kafa.y][kafa.x+1];
        }
        if (kafa.y>0){
            büyüklük[0] = yerler[kafa.y-1][kafa.x];
        }
        if (kafa.y<17){
            büyüklük[1] = yerler[kafa.y+1][kafa.x];
        }
        let yap;
        let index = 0;
        for (let i of büyüklük){
            if (i>büyüklük[büyük]){
                büyük = index;
            }
            index++;
        }
        yap = checkpath(yerler[kafa.y][kafa.x],büyüklük[büyük]);
        if (yap && büyüklük[büyük]>yerler[kafa.y][kafa.x] && frameyap){
            frameyap = false;
            if (büyük==0){
                return "w";
            }
            else if (büyük==1){
                return "s";
            }
            else{
                return "d";
            }
        }
        else{
            return çözüm[sıra][2];   
        }
    }
    if (kafa.yön=="sol"){
        let büyüklük = [-10,-10,-10];
        let büyük = 0;
        if (kafa.x>0){
            büyüklük[2] = yerler[kafa.y][kafa.x-1];
        }
        if (kafa.y>0){
            büyüklük[0] = yerler[kafa.y-1][kafa.x];
        }
        if (kafa.y<17){
            büyüklük[1] = yerler[kafa.y+1][kafa.x];
        }
        let yap;
        let index = 0;
        for (let i of büyüklük){
            if (i>büyüklük[büyük]){
                büyük = index;
            }
            index++;
        }
        yap = checkpath(yerler[kafa.y][kafa.x],büyüklük[büyük]);
        if (yap && büyüklük[büyük]>yerler[kafa.y][kafa.x] && frameyap){
            frameyap = false;
            if (büyük==0){
                return "w";
            }
            else if (büyük==1){
                return "s";
            }
            else{
                return "a";
            }
        }
        else{
            return çözüm[sıra][2];   
        }
    }
    if (kafa.yön=="yukarı"){
        let büyüklük = [-10,-10,-10];
        let büyük = 0;
        if (kafa.x>0){
            büyüklük[2] = yerler[kafa.y][kafa.x-1];
        }
        if (kafa.x<31){
            büyüklük[0] = yerler[kafa.y][kafa.x+1];
        }
        if (kafa.y>0){
            büyüklük[1] = yerler[kafa.y-1][kafa.x];
        }
        let yap;
        let index = 0;
        for (let i of büyüklük){
            if (i>büyüklük[büyük]){
                büyük = index;
            }
            index++;
        }
        yap = checkpath(yerler[kafa.y][kafa.x],büyüklük[büyük]);
        if (yap && büyüklük[büyük]>yerler[kafa.y][kafa.x] && frameyap){
            frameyap = false;
            if (büyük==0){
                return "a";
            }
            else if (büyük==1){
                return "d";
            }
            else{
                return "w";
            }
        }
        else{
            return çözüm[sıra][2];   
        }
    }
    if (kafa.yön=="aşağı"){
        let büyüklük = [-10,-10,-10];
        let büyük = 0;
        if (kafa.x>0){
            büyüklük[2] = yerler[kafa.y][kafa.x-1];
        }
        if (kafa.x<31){
            büyüklük[0] = yerler[kafa.y][kafa.x+1];
        }
        if (kafa.y<17){
            büyüklük[1] = yerler[kafa.y+1][kafa.x];
        }
        let yap;
        let index = 0;
        for (let i of büyüklük){
            if (i>büyüklük[büyük]){
                büyük = index;
            }
            index++;
        }
        yap = checkpath(yerler[kafa.y][kafa.x],büyüklük[büyük]);
        if (yap && büyüklük[büyük]>yerler[kafa.y][kafa.x] && frameyap){
            frameyap = false;
            if (büyük==0){
                return "a";
            }
            else if (büyük==1){
                return "d";
            }
            else{
                return "s";
            }
        }
        else{
            return çözüm[sıra][2];   
        }
    }
}
function keyPressed(){
    if (key=="p" && !kaldır){
        show = !show;
        kaldır = true;
    }
}
function keyReleased(){
    kaldır = false;
}