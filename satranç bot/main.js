let n;
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
let values = {"Pawn":1,"Knight":3,"Bishop":3,"Rook":5,"Queen":9,"black":-10,"white":10};
let types = ["Pawn","Knight","Bishop","Rook","Queen"];
let colors = ["black","white"];
let map;
let clicked = false;
let clickx;
let clicky;
let maps = [];
let moves = [];
let frame;
let moveai = false;
function setup(){
    createCanvas(800,800);
    frameRate(30);
    if (whiteai){
        values["black"] = 10;
        values["white"] = -10;
    }
    n=width/8;
    blackpawn = new Image();
    whitepawn = new Image();
    whiteknight = new Image();
    blackknight = new Image();
    whitebishop = new Image();
    blackbishop = new Image();
    whiterook = new Image();
    blackrook = new Image();
    whitequeen = new Image();
    blackqueen = new Image();
    whiteking = new Image();
    blackking = new Image();
    blackpawn.src = "images/black_pawn.png";
    whitepawn.src = "images/white_pawn.png";
    whiteknight.src = "images/white_knight.png";
    blackknight.src = "images/black_knight.png";
    whitebishop.src = "images/white_bishop.png";
    blackbishop.src = "images/black_bishop.png";
    whiterook.src = "images/white_rook.png";
    blackrook.src = "images/black_rook.png";
    whitequeen.src = "images/white_queen.png";
    blackqueen.src = "images/black_queen.png";
    whiteking.src = "images/white_king.png";
    blackking.src = "images/black_king.png",
    map = new board();
}
function draw(){
    background(255);
    showmap();
    if (map.sıra%2!=whiteai && !map.checkmate()){
        if (!moveai){
            frame = frameCount;
            moveai = true;
        }
        if (frame<frameCount){
            ai(map);
            moveai = false;
        }
    }
}
function showmap(){
    for (let y=0;y<8;y++){
        for (let x=0;x<8;x++){
            fill(119,149,86);
            if ((x+(y%2))%2==0){
                fill(235,236,208);
            }
            if (moves.length>0 && ((x==moves[moves.length-1][0] && y==moves[moves.length-1][1]) || (x==moves[moves.length-1][2] && y==moves[moves.length-1][3]))){
                fill(186,202,43);
                if ((x+(y%2))%2==0){
                    fill(246,246,105);
                }
            }
            strokeWeight(0);
            rect(x*n,y*n,n,n);
        }
    }
    for (let i of map.whites){
        i.show();
    }
    for (let i of map.blacks){
        i.show();
    }
    if (clicked){
        let piece = map.getpieceat(clickx,clicky);
        let moves = piece.getposiblemoves(map);
        for (let i of moves){
            if (piece.canmove(i,map)){
                fill(0);
                strokeWeight(0)
                ellipse(i[0]*n+n/2,i[1]*n+n/2,30);
            }
        }
    }
    if (map.checkmate()){
        fill(255,0,0);
        strokeWeight(0);
        textSize(30);
        textAlign(CENTER)
        text("Check Mate",width/2,50);
    }
    else if (map.check()){
        fill(255,0,0);
        strokeWeight(0);
        textSize(30);
        textAlign(CENTER)
        text("Check",width/2,50);
    }
}
function moveto(x,y,x2,y2){
    maps.push(map.copy());
    let result = map.moveto(x,y,x2,y2);
    if (!result){
        maps.pop();
    }
    else{
        moves.push([x,y,x2,y2]);
    }
    return result;
}
function mousePressed(){
    if (mouseX>=0 && mouseX<width && mouseY>=0 && mouseY<height){
        let mousex = Math.floor(mouseX/n);
        let mousey = Math.floor(mouseY/n);
        let piece = map.getpieceat(mousex,mousey)
        if (!clicked && piece!=null && (map.sıra%2==0)==piece.iswhite){
            clickx = mousex;
            clicky = mousey;
            clicked = true;
        } 
        else if (clicked){
            if (clickx==mousex && clicky==mousey){
                clicked = false;
            }
            else if  (map.getpieceat(mousex,mousey)!=null && map.getpieceat(mousex,mousey).iswhite==map.getpieceat(clickx,clicky).iswhite){
                clickx = mousex;
                clicky = mousey;
            }
            if (moveto(clickx,clicky,mousex,mousey)){
                clicked = false;;
            }
        }

    }
}
function keyPressed(){
    if (key=="z" && maps.length>=2){
        map = maps[maps.length-2];
        maps.pop();
        moves.pop();
        maps.pop();
        moves.pop();
    }
}