let col = 20;
let row = 20;
let r = {};
let map = [];
let nbomb = 100;
let started = false;
let gezilen;
let flags = [];
let dead = false;
let showed = false;
let renkler = {1:[25,118,210],2:[56,142,60],3:[211,47,47],4:[123,31,162],5:[255,242,0],6:[255,0,242],7:[200,200,200],8:[0,0,0]}
let win = false;
function setup(){
    createCanvas(800,800);
    pg = createGraphics(800,800);
    r.col = width/col;
    r.row = height/row;
    for (let y=0;y<row;y++){
        map.push([]);
        flags.push([]);
        for (let x=0;x<col;x++){
            map[y].push(0);
            flags[y].push(false);
        }
    }
    pg.background(127.5);
    for (let y=0;y<row;y++){
        for (let x=0;x<col;x++){
            pg.strokeWeight(0);
            pg.stroke(0);
            if ((x+(y%2))%2==0){
                pg.fill(162,209,73);
            }
            else{
                pg.fill(170,215,81);
            }
            pg.rect(x*r.col,y*r.row,r.col,r.row);
        }
    }
}
function draw(){
    frameRate(60);
    background(0);
    image(pg,0,0);
    if (dead){
        if (!showed){
            for (let y=0;y<row;y++){
                for (let x=0;x<col;x++){
                    pg.strokeWeight(0);
                    pg.stroke(0);
                    if ((x+(y%2))%2==0){
                        pg.fill(215,184,153);
                    }   
                    else{
                        pg.fill(229,194,159);
                    }                        
                    pg.rect(x*r.col,y*r.row,r.col,r.row);
                    if (map[y][x]=="bomb"){
                        if (!flags[y][x]){       
                            pg.fill(0);
                            pg.rect(x*r.col,y*r.row,r.col,r.row);
                        }
                        else{
                            mousex = x*r.col;
                            mousey = y*r.row;
                            pg.strokeWeight(1);
                            pg.stroke(0);
                            pg.fill(242, 54, 7);
                            pg.beginShape();
                            pg.vertex(mousex+(r.col/2-r.col/5),mousey+(r.row-r.row/5));
                            pg.vertex(mousex+(r.col/2+r.col/5),mousey+(r.row-r.row/5));
                            pg.vertex(mousex+r.col/2,mousey+(r.row-r.row*40/100));
                            pg.vertex(mousex+r.col/2,mousey+(r.row-r.row*60/100));
                            pg.vertex(mousex+(r.col*80/100),mousey+(r.row-r.row*70/100));
                            pg.vertex(mousex+(r.col*50/100),mousey+(r.row-r.row*80/100));
                            pg.vertex(mousex+r.col/2,mousey+(r.row-r.row*40/100));
                            pg.vertex(mousex+(r.col/2-r.col/5),mousey+(r.row-r.row/5));
                            pg.endShape();
                        }
                    }
                    if (map[y][x]!="bomb" && flags[y][x]){
                        mousex = x*r.col;
                        mousey = y*r.row;
                        pg.strokeWeight(1);
                        pg.stroke(0);
                        pg.fill(242, 54, 7);
                        pg.beginShape();
                        pg.vertex(mousex+(r.col/2-r.col/5),mousey+(r.row-r.row/5));
                        pg.vertex(mousex+(r.col/2+r.col/5),mousey+(r.row-r.row/5));
                        pg.vertex(mousex+r.col/2,mousey+(r.row-r.row*40/100));
                        pg.vertex(mousex+r.col/2,mousey+(r.row-r.row*60/100));
                        pg.vertex(mousex+(r.col*80/100),mousey+(r.row-r.row*70/100));
                        pg.vertex(mousex+(r.col*50/100),mousey+(r.row-r.row*80/100));
                        pg.vertex(mousex+r.col/2,mousey+(r.row-r.row*40/100));
                        pg.vertex(mousex+(r.col/2-r.col/5),mousey+(r.row-r.row/5));
                        pg.endShape();
                        pg.strokeWeight(3);
                        pg.stroke(242,54,7);
                        pg.line(mousex,mousey,mousex+r.col,mousey+r.row);
                        pg.line(mousex+r.col,mousey,mousex,mousey+r.row);
                    }
                    if (map[y][x]!=0 && map[y][x]!="bomb" && !flags[y][x]){
                        pg.fill(renkler[map[y][x]][0],renkler[map[y][x]][1],renkler[map[y][x]][2]);
                        pg.textSize(r.col/1.5,r.row/1.5);
                        pg.text(map[y][x],(x*r.col)+(r.col/2)-(r.col/10),(y*r.row)+(r.row/2)+(r.row/10));
                    }
                }
            }
            if (!win){
                console.log("Dead");
            }
            else{
                console.log("You Win")
            }
            showed = true;
        }
    }
    else{
        let renk = color(191,225,125);
        if (started){
            if (mouseX>0 && mouseX<width && mouseY>0 && mouseY<height){
                let mousex = Math.floor(Math.floor(mouseX)/r.col);
                let mousey = Math.floor(Math.floor(mouseY)/r.row);
                if (!gezilen[mousey][mousex]){
                    fill(renk);
                    strokeWeight(0);
                    rect(mousex*r.col,mousey*r.row,r.col,r.row);
                    let eskix = mousex;
                    let eskiy = mousey;
                    if (flags[mousey][mousex]){
                        mousex *= r.col;
                        mousey *= r.row;
                        stroke(0);
                        strokeWeight(1);
                        fill(242, 54, 7);
                        beginShape();
                        vertex(mousex+(r.col/2-r.col/5),mousey+(r.row-r.row/5));
                        vertex(mousex+(r.col/2+r.col/5),mousey+(r.row-r.row/5));
                        vertex(mousex+r.col/2,mousey+(r.row-r.row*40/100));
                        vertex(mousex+r.col/2,mousey+(r.row-r.row*60/100));
                        vertex(mousex+(r.col*80/100),mousey+(r.row-r.row*70/100));
                        vertex(mousex+(r.col*50/100),mousey+(r.row-r.row*80/100));
                        vertex(mousex+r.col/2,mousey+(r.row-r.row*40/100));
                        vertex(mousex+(r.col/2-r.col/5),mousey+(r.row-r.row/5));
                        endShape();
                        mousex = eskix;
                        mousey = eskiy;
                    }
                }
                else if (gezilen[mousey][mousex] && map[mousey][mousex]!=0){
                    strokeWeight(0);
                    stroke(0);
                    fill(225,202,179);                  
                    rect(mousex*r.col,mousey*r.row,r.col,r.row);
                    fill(renkler[map[mousey][mousex]][0],renkler[map[mousey][mousex]][1],renkler[map[mousey][mousex]][2]);
                    textSize(r.col/1.5,r.row/1.5);
                    text(map[mousey][mousex],(mousex*r.col)+(r.col/2)-(r.col/10),(mousey*r.row)+(r.row/2)+(r.row/10));
                }
            }
        }
        else{
            if (mouseX>0 && mouseX<width && mouseY>0 && mouseY<height){
                let mousex = Math.floor(Math.floor(mouseX)/r.col);
                let mousey = Math.floor(Math.floor(mouseY)/r.row);
                fill(renk);
                strokeWeight(0);
                rect(mousex*r.col,mousey*r.row,r.col,r.row);
            }
        }
    }
}
function firstclick(map,startx,starty){
    let harita = [];
    for (let y=0;y<row;y++){
        harita.push([]);
        for (let x=0;x<col;x++){
            let sol = true,
                sa?? = true,
                yukar?? = true,
                a??a???? = true;
            if (x>0){
                if (map[y][x-1]==0){
                    sol = false;
                }
            }
            if (x<col-1){
                if (map[y][x+1]==0){
                    sa?? = false;
                }
            }
            if (y>0){
                if (map[y-1][x]==0){
                    yukar?? = false;
                }
            }
            if (y<row-1){
                if (map[y+1][x]==0){
                    a??a???? = false;
                }
            }
            harita[y].push([sol,sa??,yukar??,a??a????,false])
        }
    }
    harita[starty][startx][4] = true;
    let yap??lanlar = [];
    let ters = {"d":"a","a":"d","w":"s","s":"w"};
    let y = starty;
    let x = startx;
    while (true){
        let sol = harita[y][x][0];
        let sa?? = harita[y][x][1];
        let yukar?? = harita[y][x][2];
        let a??a???? = harita[y][x][3];
        if (x>0){
            if (y>0 && map[y-1][x-1]!=0){
                harita[y-1][x-1][4] = true;    
            }
            if (map[y][x-1]!=0){
                harita[y][x-1][4] = true;
            }
            if (y<row-1 && map[y+1][x-1]!=0){
                harita[y+1][x-1][4] = true;
            }
        }
        if (x<col-1){
            if (y>0 && map[y-1][x+1]!=0){
                harita[y-1][x+1][4] = true;
            }
            if (map[y][x+1]!=0){
                harita[y][x+1][4] = true;
            }
            if (y<row-1 && map[y+1][x+1]!=0){
                harita[y+1][x+1][4] = true;
            }
        }
        if (y>0){
            if (x>0 && map[y-1][x-1]!=0){
                harita[y-1][x-1][4] = true;    
            }
            if (map[y-1][x]!=0){
                harita[y-1][x][4] = true;
            }
            if (x<col-1 && map[y-1][x+1]!=0){
                harita[y-1][x+1][4] = true;
            }
        }
        if (y<row-1){
            if (x>0 && map[y+1][x-1]!=0){
                harita[y+1][x-1][4] = true;    
            }
            if (map[y+1][x]!=0){
                harita[y+1][x][4] = true;
            }
            if (x<col-1 && map[y+1][x+1]!=0){
                harita[y+1][x+1][4] = true;
            }
        }
        if (!sol){
            if (harita[y][x-1][4]){
                sol = true;
            }
        }
        if (!sa??){
            if (harita[y][x+1][4]){
                sa?? = true;
            }
        }
        if (!yukar??){
            if (harita[y-1][x][4]){
                yukar?? = true;
            }
        }
        if (!a??a????){
            if (harita[y+1][x][4]){
                a??a???? = true;
            }
        }
        if (sol && sa?? && yukar?? && a??a????){
            if (yap??lanlar.length==0){
                break;   
            }
            else {
                let y??n = ters[yap??lanlar[yap??lanlar.length-1]];
                if (y??n=="d"){
                    x++;
                }
                if (y??n=="a"){
                    x--;
                }
                if (y??n=="w"){
                    y--;
                }
                if (y??n=="s"){
                    y++;
                }
                yap??lanlar.pop();
            }
        }
        else{
            let y??nler = [];
            if (!sol){
                y??nler.push("a");
            }
            if (!sa??){
                y??nler.push("d");
            }
            if (!yukar??){
                y??nler.push("w");
            }
            if (!a??a????){
                y??nler.push("s");
            }
            let y??n = y??nler[Math.floor(rand(0,y??nler.length))];
            if (y??n=="d"){
                x++;
            }
            if (y??n=="a"){
                x--;
            }
            if (y??n=="w"){
                y--;
            }
            if (y??n=="s"){
                y++;
            }
            harita[y][x][4] = true;
            yap??lanlar.push(y??n);
        }
    }
    let gezilen = [];
    for (let y=0;y<row;y++){
        gezilen.push([]);
        for (let x=0;x<col;x++){
            gezilen[y].push(harita[y][x][4]);
        }
    }
    return gezilen;
    
}
function mousePressed(event){
    document.addEventListener('contextmenu', event => event.preventDefault());
    let mousex = Math.floor(Math.floor(mouseX)/r.col);
    let mousey = Math.floor(Math.floor(mouseY)/r.row);
    if (mouseX<width && mouseY<height && !dead){
        if (!started && event.button==0){
            let se?? = [];
            for (let y=0;y<row;y++){
                for (let x=0;x<col;x++){
                    if ((x<mousex-1 || x>mousex+1) && (y<mousey-1 || y>mousey+1)){
                        se??.push([x,y]);
                    }
                }
            }
            for (let i=0;i<nbomb;i++){
                let se??ilenyer = Math.floor(rand(0,se??.length));
                let se??ilen = se??[se??ilenyer];
                map[se??ilen[1]][se??ilen[0]] = "bomb";
                for (let x=se??ilen[0]-1;x<se??ilen[0]+2;x++){
                    for (let y=se??ilen[1]-1;y<se??ilen[1]+2;y++){
                        if (x>=0 && x<col && y>=0 && y<row){
                            if (map[y][x]!="bomb"){
                                map[y][x] += 1;
                            }
                        }
                    }
                }
                se??.splice(se??ilenyer,1);
            }
            gezilen = firstclick(map,mousex,mousey);
            pg.background(127.5);
            for (let y=0;y<row;y++){
                for (let x=0;x<col;x++){
                    pg.strokeWeight(0);
                    pg.stroke(0);
                    if ((x+(y%2))%2==0){
                        pg.fill(162,209,73);
                    }
                    else{
                        pg.fill(170,215,81);
                    }
                    pg.rect(x*r.col,y*r.row,r.col,r.row);
                    if (gezilen[y][x]){
                        pg.strokeWeight(0);
                        pg.stroke(0);
                        if ((x+(y%2))%2==0){
                            pg.fill(215,184,153);
                        }   
                        else{
                            pg.fill(229,194,159);
                        }                        
                        pg.rect(x*r.col,y*r.row,r.col,r.row);
                        if (map[y][x]!=0){
                            pg.fill(renkler[map[y][x]][0],renkler[map[y][x]][1],renkler[map[y][x]][2]);
                            pg.textSize(r.col/1.5,r.row/1.5);
                            pg.text(map[y][x],(x*r.col)+(r.col/2)-(r.col/10),(y*r.row)+(r.row/2)+(r.row/10));
                        }
                    }
                    
                }
            }
            for (let y=0;y<row;y++){
                for (let x=0;x<col;x++){
                    if (gezilen[y][x]){
                        if (x>0){
                            if (!gezilen[y][x-1]){
                                pg.fill(135,175,58);
                                pg.strokeWeight(2);
                                pg.stroke(135,175,58);
                                pg.line(x*r.col,y*r.row,x*r.col,y*r.row+r.row);
                            }
                        }
                        if (x<col-1){
                            if (!gezilen[y][x+1]){
                                pg.fill(135,175,58);
                                pg.strokeWeight(2);
                                pg.stroke(135,175,58);
                                pg.line(x*r.col+r.col,y*r.row,x*r.col+r.col,y*r.row+r.row);
                            }
                        }
                        if (y>0){
                            if (!gezilen[y-1][x]){
                                pg.fill(135,175,58);
                                pg.strokeWeight(2);
                                pg.stroke(135,175,58);
                                pg.line(x*r.col,y*r.row,x*r.col+r.col,y*r.row);
                            }
                        }
                        if (y<row-1){
                            if (!gezilen[y+1][x]){
                                pg.fill(135,175,58);
                                pg.strokeWeight(2);
                                pg.stroke(135,175,58);
                                pg.line(x*r.col,y*r.row+r.row,x*r.col+r.col,y*r.row+r.row);
                            }
                        }
                    }
                }
            }
            started = true;
        }
        else {
            if (started && !gezilen[mousey][mousex]){
                if (event.button==2){
                    flags[mousey][mousex] = !flags[mousey][mousex];
                    let kazanma = true;
                    for (let y=0;y<row;y++){
                        for (let x=0;x<col;x++){
                            if (flags[y][x]!=(map[y][x]=="bomb")){
                                kazanma = false;
                            }
                        }
                    }
                    if (kazanma){
                        dead = true;
                        win = true;
                    }
                    if (flags[mousey][mousex]){
                        let eskix = mousex;
                        let eskiy = mousey;
                        mousex = mousex*r.col;
                        mousey = mousey*r.row;
                        pg.strokeWeight(1);
                        pg.stroke(0);
                        pg.fill(242, 54, 7);
                        pg.beginShape();
                        pg.vertex(mousex+(r.col/2-r.col/5),mousey+(r.row-r.row/5));
                        pg.vertex(mousex+(r.col/2+r.col/5),mousey+(r.row-r.row/5));
                        pg.vertex(mousex+r.col/2,mousey+(r.row-r.row*40/100));
                        pg.vertex(mousex+r.col/2,mousey+(r.row-r.row*60/100));
                        pg.vertex(mousex+(r.col*80/100),mousey+(r.row-r.row*70/100));
                        pg.vertex(mousex+(r.col*50/100),mousey+(r.row-r.row*80/100));
                        pg.vertex(mousex+r.col/2,mousey+(r.row-r.row*40/100));
                        pg.vertex(mousex+(r.col/2-r.col/5),mousey+(r.row-r.row/5));
                        pg.endShape();
                    }
                    else{
                        pg.strokeWeight(0);
                        pg.stroke(0);
                        if ((mousex+(mousey%2))%2==0){
                            pg.fill(162,209,73);
                        }
                        else{
                            pg.fill(170,215,81);
                        }
                        pg.rect(mousex*r.col,mousey*r.row,r.col,r.row);
                    }
                }
                if (event.button==0 && !flags[mousey][mousex]){
                    if (map[mousey][mousex]=="bomb"){
                        dead = true;
                    }
                    else if (map[mousey][mousex]==0){
                        let yeni = firstclick(map,mousex,mousey);
                        for (let y=0;y<row;y++){
                            for (let x=0;x<col;x++){
                                if (yeni[y][x]){
                                    gezilen[y][x] = true;
                                }
                            }
                        }
                        pg.background(127.5);
                        for (let y=0;y<row;y++){
                            for (let x=0;x<col;x++){
                                pg.strokeWeight(0);
                                pg.stroke(0);
                                if ((x+(y%2))%2==0){
                                    pg.fill(162,209,73);
                                }
                                else{
                                    pg.fill(170,215,81);
                                }
                                pg.rect(x*r.col,y*r.row,r.col,r.row);
                                if (gezilen[y][x]){
                                    pg.strokeWeight(0);
                                    pg.stroke(0);
                                    if ((x+(y%2))%2==0){
                                        pg.fill(215,184,153);
                                    }   
                                    else{
                                        pg.fill(229,194,159);
                                    }                        
                                    pg.rect(x*r.col,y*r.row,r.col,r.row);
                                    if (map[y][x]!=0){
                                        pg.fill(renkler[map[y][x]][0],renkler[map[y][x]][1],renkler[map[y][x]][2]);
                                        pg.textSize(r.col/1.5,r.row/1.5);
                                        pg.text(map[y][x],(x*r.col)+(r.col/2)-(r.col/10),(y*r.row)+(r.row/2)+(r.row/10));
                                    }
                                }
                                if (flags[y][x]){
                                    mousex = x*r.col;
                                    mousey = y*r.row;
                                    pg.strokeWeight(1);
                                    pg.stroke(0);
                                    pg.fill(242, 54, 7);
                                    pg.beginShape();
                                    pg.vertex(mousex+(r.col/2-r.col/5),mousey+(r.row-r.row/5));
                                    pg.vertex(mousex+(r.col/2+r.col/5),mousey+(r.row-r.row/5));
                                    pg.vertex(mousex+r.col/2,mousey+(r.row-r.row*40/100));
                                    pg.vertex(mousex+r.col/2,mousey+(r.row-r.row*60/100));
                                    pg.vertex(mousex+(r.col*80/100),mousey+(r.row-r.row*70/100));
                                    pg.vertex(mousex+(r.col*50/100),mousey+(r.row-r.row*80/100));
                                    pg.vertex(mousex+r.col/2,mousey+(r.row-r.row*40/100));
                                    pg.vertex(mousex+(r.col/2-r.col/5),mousey+(r.row-r.row/5));
                                    pg.endShape(); 
                                }

                            }
                        }
                        for (let y=0;y<row;y++){
                            for (let x=0;x<col;x++){
                                if (gezilen[y][x]){
                                    if (x>0){
                                        if (!gezilen[y][x-1]){
                                            pg.fill(135,175,58);
                                            pg.strokeWeight(2);
                                            pg.stroke(135,175,58);
                                            pg.line(x*r.col,y*r.row,x*r.col,y*r.row+r.row);
                                        }
                                    }
                                    if (x<col-1){
                                        if (!gezilen[y][x+1]){
                                            pg.fill(135,175,58);
                                            pg.strokeWeight(2);
                                            pg.stroke(135,175,58);
                                            pg.line(x*r.col+r.col,y*r.row,x*r.col+r.col,y*r.row+r.row);
                                        }
                                    }
                                    if (y>0){
                                        if (!gezilen[y-1][x]){
                                            pg.fill(135,175,58);
                                            pg.strokeWeight(2);
                                            pg.stroke(135,175,58);
                                            pg.line(x*r.col,y*r.row,x*r.col+r.col,y*r.row);
                                        }
                                    }
                                    if (y<row-1){
                                        if (!gezilen[y+1][x]){
                                            pg.fill(135,175,58);
                                            pg.strokeWeight(2);
                                            pg.stroke(135,175,58);
                                            pg.line(x*r.col,y*r.row+r.row,x*r.col+r.col,y*r.row+r.row);
                                        }
                                    }
                                }
                            }
                        }
                    }
                    else{
                        gezilen[mousey][mousex] = true;
                        pg.background(127.5);
                        for (let y=0;y<row;y++){
                            for (let x=0;x<col;x++){
                                pg.strokeWeight(0);
                                pg.stroke(0);
                                if ((x+(y%2))%2==0){
                                    pg.fill(162,209,73);
                                }
                                else{
                                    pg.fill(170,215,81);
                                }
                                pg.rect(x*r.col,y*r.row,r.col,r.row);
                                if (gezilen[y][x]){
                                    pg.strokeWeight(0);
                                    pg.stroke(0);
                                    if ((x+(y%2))%2==0){
                                        pg.fill(215,184,153);
                                    }   
                                    else{
                                        pg.fill(229,194,159);
                                    }                        
                                    pg.rect(x*r.col,y*r.row,r.col,r.row);
                                    if (map[y][x]!=0){
                                        pg.fill(renkler[map[y][x]][0],renkler[map[y][x]][1],renkler[map[y][x]][2]);
                                        pg.textSize(r.col/1.5,r.row/1.5);
                                        pg.text(map[y][x],(x*r.col)+(r.col/2)-(r.col/10),(y*r.row)+(r.row/2)+(r.row/10));
                                    }
                                }
                                if (flags[y][x]){
                                    mousex = x*r.col;
                                    mousey = y*r.row;
                                    pg.strokeWeight(1);
                                    pg.stroke(0);
                                    pg.fill(242, 54, 7);
                                    pg.beginShape();
                                    pg.vertex(mousex+(r.col/2-r.col/5),mousey+(r.row-r.row/5));
                                    pg.vertex(mousex+(r.col/2+r.col/5),mousey+(r.row-r.row/5));
                                    pg.vertex(mousex+r.col/2,mousey+(r.row-r.row*40/100));
                                    pg.vertex(mousex+r.col/2,mousey+(r.row-r.row*60/100));
                                    pg.vertex(mousex+(r.col*80/100),mousey+(r.row-r.row*70/100));
                                    pg.vertex(mousex+(r.col*50/100),mousey+(r.row-r.row*80/100));
                                    pg.vertex(mousex+r.col/2,mousey+(r.row-r.row*40/100));
                                    pg.vertex(mousex+(r.col/2-r.col/5),mousey+(r.row-r.row/5));
                                    pg.endShape(); 
                                }
                            }
                        }
                        for (let y=0;y<row;y++){
                            for (let x=0;x<col;x++){
                                if (gezilen[y][x]){
                                    if (x>0){
                                        if (!gezilen[y][x-1]){
                                            pg.fill(135,175,58);
                                            pg.strokeWeight(2);
                                            pg.stroke(135,175,58);
                                            pg.line(x*r.col,y*r.row,x*r.col,y*r.row+r.row);
                                        }
                                    }
                                    if (x<col-1){
                                        if (!gezilen[y][x+1]){
                                            pg.fill(135,175,58);
                                            pg.strokeWeight(2);
                                            pg.stroke(135,175,58);
                                            pg.line(x*r.col+r.col,y*r.row,x*r.col+r.col,y*r.row+r.row);
                                        }
                                    }
                                    if (y>0){
                                        if (!gezilen[y-1][x]){
                                            pg.fill(135,175,58);
                                            pg.strokeWeight(2);
                                            pg.stroke(135,175,58);
                                            pg.line(x*r.col,y*r.row,x*r.col+r.col,y*r.row);
                                        }
                                    }
                                    if (y<row-1){
                                        if (!gezilen[y+1][x]){
                                            pg.fill(135,175,58);
                                            pg.strokeWeight(2);
                                            pg.stroke(135,175,58);
                                            pg.line(x*r.col,y*r.row+r.row,x*r.col+r.col,y*r.row+r.row);
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
            if (started){
                if (event.button==1 && !flags[mousey][mousex] && gezilen[mousey][mousex] && map[mousey][mousex]!=0){
                    let open = [];
                    let nflag = 0;
                    for (let y=mousey-1;y<mousey+2;y++){
                        for (let x=mousex-1;x<mousex+2;x++){
                            if (x>=0 && x<col && y>=0 && y<row){
                                if (flags[y][x]){
                                    nflag++;
                                }
                                else if (!gezilen[y][x] && !flags[y][x]){
                                    open.push([x,y]);
                                }
                            }
                        }
                    }
                    if (nflag==map[mousey][mousex]){
                        for (let i of open){
                            if (map[i[1]][i[0]]=="bomb"){
                                dead = true;
                                break;
                            }
                            else if (map[i[1]][i[0]]==0){
                                let yeni = firstclick(map,i[0],i[1]);
                                for (let y=0;y<row;y++){
                                    for (let x=0;x<col;x++){
                                        if (yeni[y][x]){
                                            gezilen[y][x] = true;
                                        }
                                    }
                                }
                            }
                            else{
                                gezilen[i[1]][i[0]] = true;
                            }
                        }
                    }
                    pg.background(127.5);
                    for (let y=0;y<row;y++){
                        for (let x=0;x<col;x++){
                            pg.strokeWeight(0);
                            pg.stroke(0);
                            if ((x+(y%2))%2==0){
                                pg.fill(162,209,73);
                            }
                            else{
                                pg.fill(170,215,81);
                            }
                            pg.rect(x*r.col,y*r.row,r.col,r.row);
                            if (gezilen[y][x]){
                                pg.strokeWeight(0);
                                pg.stroke(0);
                                if ((x+(y%2))%2==0){
                                    pg.fill(215,184,153);
                                }   
                                else{
                                    pg.fill(229,194,159);
                                }                        
                                pg.rect(x*r.col,y*r.row,r.col,r.row);
                                if (map[y][x]!=0){
                                    pg.fill(renkler[map[y][x]][0],renkler[map[y][x]][1],renkler[map[y][x]][2]);
                                    pg.textSize(r.col/1.5,r.row/1.5);
                                    pg.text(map[y][x],(x*r.col)+(r.col/2)-(r.col/10),(y*r.row)+(r.row/2)+(r.row/10));
                                }
                            }
                            if (flags[y][x]){
                                mousex = x*r.col;
                                mousey = y*r.row;
                                pg.strokeWeight(1);
                                pg.stroke(0);
                                pg.fill(242, 54, 7);
                                pg.beginShape();
                                pg.vertex(mousex+(r.col/2-r.col/5),mousey+(r.row-r.row/5));
                                pg.vertex(mousex+(r.col/2+r.col/5),mousey+(r.row-r.row/5));
                                pg.vertex(mousex+r.col/2,mousey+(r.row-r.row*40/100));
                                pg.vertex(mousex+r.col/2,mousey+(r.row-r.row*60/100));
                                pg.vertex(mousex+(r.col*80/100),mousey+(r.row-r.row*70/100));
                                pg.vertex(mousex+(r.col*50/100),mousey+(r.row-r.row*80/100));
                                pg.vertex(mousex+r.col/2,mousey+(r.row-r.row*40/100));
                                pg.vertex(mousex+(r.col/2-r.col/5),mousey+(r.row-r.row/5));
                                pg.endShape(); 
                            }
                        }
                    }
                    for (let y=0;y<row;y++){
                        for (let x=0;x<col;x++){
                            if (gezilen[y][x]){
                                if (x>0){
                                    if (!gezilen[y][x-1]){
                                        pg.fill(135,175,58);
                                        pg.strokeWeight(2);
                                        pg.stroke(135,175,58);
                                        pg.line(x*r.col,y*r.row,x*r.col,y*r.row+r.row);
                                    }
                                }
                                if (x<col-1){
                                    if (!gezilen[y][x+1]){
                                        pg.fill(135,175,58);
                                        pg.strokeWeight(2);
                                        pg.stroke(135,175,58);
                                        pg.line(x*r.col+r.col,y*r.row,x*r.col+r.col,y*r.row+r.row);
                                    }
                                }
                                if (y>0){
                                    if (!gezilen[y-1][x]){
                                        pg.fill(135,175,58);
                                        pg.strokeWeight(2);
                                        pg.stroke(135,175,58);
                                        pg.line(x*r.col,y*r.row,x*r.col+r.col,y*r.row);
                                    }
                                }
                                if (y<row-1){
                                    if (!gezilen[y+1][x]){
                                        pg.fill(135,175,58);
                                        pg.strokeWeight(2);
                                        pg.stroke(135,175,58);
                                        pg.line(x*r.col,y*r.row+r.row,x*r.col+r.col,y*r.row+r.row);
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
        if (started){
            for (let y=0;y<row;y++){
                for (let x=0;x<col;x++){
                    if (gezilen[y][x] && flags[y][x]){
                        flags[y][x] = false;
                    }
                }
            }
        }
    }
}