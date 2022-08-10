let n;
let map = [];
let sıra = 0;
let blackpawn;
let whitepawn;
let whiteknight;
let blackknight;
let whitebishop;
let blackbishop;
let whiterook;
let blackrook;
let whitequeen;
let blackqueen;
let whiteking;
let blackking;
let clicked = false;
let clickx;
let clicky;
let maps = [];
function setup(){
    createCanvas(800,800);
    frameRate(30);
    n=width/8;
    blackpawn = loadImage("assets/black_pawn.png");
    whitepawn = loadImage("assets/white_pawn.png");
    whiteknight = loadImage("assets/white_knight.png");
    blackknight = loadImage("assets/black_knight.png");
    whitebishop = loadImage("assets/white_bishop.png");
    blackbishop = loadImage("assets/black_bishop.png");
    whiterook = loadImage("assets/white_rook.png");
    blackrook = loadImage("assets/black_rook.png");
    whitequeen = loadImage("assets/white_queen.png");
    blackqueen = loadImage("assets/black_queen.png");
    whiteking = loadImage("assets/white_king.png");
    blackking = loadImage("assets/black_king.png");
    for (let y=0;y<8;y++){
        map.push([]);
        for (let x=0;x<8;x++){
            map[y].push(null);
        }
    }
    for (let x=0;x<8;x++){
        map[1][x] = new pawn(x,1,n,false);
        map[6][x] = new pawn(x,6,n,true);
    }
    for (let x=1;x<7;x+=5){
        map[0][x] = new knight(x,0,n,false);
        map[7][x] = new knight(x,7,n,true);
    }
    for (let x=2;x<6;x+=3){
        map[0][x] = new bishop(x,0,n,false);
        map[7][x] = new bishop(x,7,n,true);
    }
    for (let x=0;x<8;x+=7){
        map[0][x] = new rook(x,0,n,false);
        map[7][x] = new rook(x,7,n,true);
    }
    for (let x=3;x<4;x++){
        map[0][x] = new queen(x,0,n,false);
        map[7][x] = new queen(x,7,n,true);
    }
    for (let x=4;x<5;x++){
        map[0][x] = new king(x,0,n,false);
        map[7][x] = new king(x,7,n,true);
    }
}
function draw(){
    background(255);
    strokeWeight(0);
    for (let y=0;y<8;y++){
        for (let x=0;x<8;x++){
            fill(119,149,86);
            if ((x+(y%2))%2==0){
                fill(235,236,208);
            }
            rect(x*n,y*n,n,n);
            if (map[y][x]!=null){
                map[y][x].show();
            }
        }
    }
    if (clicked){
        let posibilites = map[clicky][clickx].getposiblemoves(map,false,sıra,true);
        fill(0);
        strokeWeight(0);
        for (let i of posibilites){
            ellipse(i[0]*n+(n/2),i[1]*n+(n/2),n/3);
        }
    }
    let kingx;
    let kingy;
    let found = false;;
    for (let y=0;y<8;y++){
        for (let x=0;x<8;x++){
            if (sıra%2==0){
                if (map[y][x]!=null){
                    if (map[y][x].type=="King" && map[y][x].iswhite){
                        kingx = x;
                        kingy = y;
                        found = true;
                        break;
                    }
                }
            }
            else{
                if (map[y][x]!=null){
                    if (map[y][x].type=="King" && !map[y][x].iswhite){
                        kingx = x;
                        kingy = y;
                        found = true;
                        break;
                    }
                }
            }
        }
        if (found){
            break;
        }
    }
    if (map[kingy][kingx].ischeck(map)){
        fill(255,0,0);
        strokeWeight(0);
        textSize(50)
        let check_mate = true;
        for (let y=0;y<8;y++){
            for (let x=0;x<8;x++){
                if (map[y][x]!=null){
                    if (map[y][x].iswhite==map[kingy][kingx].iswhite){
                        if (map[y][x].getposiblemoves(map,false,sıra).length>0){
                            check_mate = false;
                            break;
                        }
                    }
                }
            }
            if (check_mate){
                break;
            }
        }
        if (map[kingy][kingx].getposiblemoves(map,false,false).length>0){
            check_mate = false;
        }
        if (!check_mate){
            text("Check",width/2-(width/16),50);
        }
        else{
            text("Check Mate",width/2-(width/16),50);
        }
    }
}
function moveto(x,y,x2,y2){
    let harita = [];
    for (let y=0;y<8;y++){
        harita.push([]);
        for (let x=0;x<8;x++){
            if (map[y][x]==null){
                harita[y].push(null);
            }
            else{
                harita[y].push(map[y][x].copy());
            }
        }
    }
    maps.push(harita);
    let result = map[y][x].move(x2,y2,map,false,sıra);
    if (result){
        sıra++;
    }
    return result;
}
function mousePressed(){
    if (mouseX>=0 && mouseX<width && mouseY>=0 && mouseY<height){
        let mousex = Math.floor(mouseX/n);
        let mousey = Math.floor(mouseY/n);
        if (!clicked){
            clickx = mousex;
            clicky = mousey;
            if (sıra%2==1){
                if (map[mousey][mousex]!=null){
                    if (!map[mousey][mousex].iswhite){
                        clicked = !clicked
                    }
                }
            }
            else{
                if (map[mousey][mousex]!=null){
                    if (map[mousey][mousex].iswhite){
                        clicked = !clicked
                    }
                }
            }
        }
        else{
            if (clickx==mousex && clicky==mousey){
                clicked = !clicked;
            }
            else{
                if (map[mousey][mousex]!=null && map[mousey][mousex].iswhite==map[clicky][clickx].iswhite){
                    clickx = mousex;
                    clicky = mousey;
                }
                else if (moveto(clickx,clicky,mousex,mousey)){
                    clicked = !clicked
                }
            }
        }
    }
}
function keyPressed(){
    if (maps.length>0){
        if (key=="z"){
            map = [];
            for (let y=0;y<8;y++){
                map.push([]);
                for (let x=0;x<8;x++){
                    if (maps[maps.length-1][y][x]==null){
                        map[y].push(null);
                    }
                    else{
                        map[y].push(maps[maps.length-1][y][x].copy());
                    }
                }
            }
            maps.pop();
            sıra--;
        }
    }
}