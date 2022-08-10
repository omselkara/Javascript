let map = [[" "," "," "],
           [" "," "," "],
           [" "," "," "]]
let probabilities = [[[0,0],[1,0],[2,0]],
                     [[0,1],[1,1],[2,1]],
                     [[0,2],[1,2],[2,2]],
                     [[0,0],[0,1],[0,2]],
                     [[1,0],[1,1],[1,2]],
                     [[2,0],[2,1],[2,2]],
                     [[0,0],[1,1],[2,2]],
                     [[2,0],[1,1],[0,2]]];
let sıra = 0;
let dead = false;
let calculated = 0;
function minmax(harita,first,ismax){
    let olasılıklar = [];
    let moves = []
    calculated++;
    for (let y=0;y<3;y++){
        for (let x=0;x<3;x++){
            if (harita[y][x]==" "){
                let game = [];
                for (let y2=0;y2<3;y2++){
                    game.push([]);
                    for (let x2=0;x2<3;x2++){
                        game[y2].push(harita[y2][x2]);
                    }
                }
                if (ismax){
                    game[y][x] = "O";
                }
                else{
                    game[y][x] = "X";
                }
                if (first){
                    let moved = [x,y];
                    moves.push(moved);
                }
                olasılıklar.push(game);
            }
        }
    }
    let puan = {"X":-1,"O":1,"Draw":0};
    let puanlar = [];
    for (let yer=0;yer<olasılıklar.length;yer++){
        let i = olasılıklar[yer];
        if (check(i)==null){
            if (ismax){
                if (max(puanlar)==1 && !first){
                    return 1;
                }
            }
            else{
                if (min(puanlar)==-1 && !first){
                    return -1;
                }
            }
            puanlar.push(minmax(i,false,!ismax));
        }
        else{
            puanlar.push(puan[check(i)]);
        }
        if (ismax){
            if (max(puanlar)==1 && !first){
                return 1;
            }
        }
        else{
            if (min(puanlar)==-1 && !first){
                return -1;
            }
        }
    }
    if (first){
        let best = -Infinity;
        let yer;
        for (let i=0;i<puanlar.length;i++){
            if (puanlar[i]>best){
                best = puanlar[i];
                yer = i;
            }
        }
        return moves[yer];
    }
    else{
        if (ismax){
            return max(puanlar);
        }
        else{
            return min(puanlar);
        }
    }
}
function ai(map){
    let harita = []
    calculated = 0;
    for (let y=0;y<3;y++){
        harita.push([]);
        for (let x=0;x<3;x++){
            harita[y].push(map[y][x])
        }
    }
    let sonuç = minmax(harita,true,true);
    print(calculated);
    return sonuç;
}
function setup(){
    createCanvas(800,800);
}
function draw(){
    background(255);
    stroke(0)
    strokeWeight(1);
    for (let i=0;i<4;i++){
        line(0,i*(height/3),width,i*(height/3));
        line(i*(width/3),0,i*(width/3),height);
    }
    for (let y=0;y<3;y++){
        for (let x=0;x<3;x++){
            if (map[y][x]=="X"){
                stroke(255,0,0);
                strokeWeight(3);
                line(x*(width/3),y*(height/3),(x+1)*(width/3),(y+1)*(height/3))
                line((x+1)*(width/3),y*(height/3),(x)*(width/3),(y+1)*(height/3))
            }
            else if (map[y][x]=="O"){
                noFill()
                stroke(0,0,255);
                strokeWeight(3);
                ellipse(x*(width/3)+(width/3)/2,y*(height/3)+(height/3)/2,(width/3),(height/3))
            }
        }
    }
    if (sıra!=9 && sıra%2==1){
        let move = ai(map);
        clicked(move[0],move[1]);
    }
    if (sıra==9 && !dead){
        dead = true;
        console.log("Draw")
    }
}
function mousePressed(){
    let mousex = Math.floor(mouseX/(width/3));
    let mousey = Math.floor(mouseY/(height/3));
    if (sıra%2==0){
        clicked(mousex,mousey);
    }
}
function clicked(x,y){
    if (x>=0 && x<3 && y>=0 && y<3 && sıra!=9 && !dead){
        if (map[y][x]==" "){
            if (sıra%2==0){
                map[y][x] = "X";
            }
            else{
                map[y][x] = "O";
            }
            sıra++;
            let winner = check(map);
            if (winner=="X"){
                print("X Won");
                dead = true;
            }
            if (winner=="O"){
                print("O Won");
                dead = true;
            }
        }
    }
}
function check(map){
    let harita = map;
    for (let i of probabilities){
        if (harita[i[0][0]][i[0][1]]==harita[i[1][0]][i[1][1]] && harita[i[1][0]][i[1][1]]==harita[i[2][0]][i[2][1]]){
            if (harita[i[0][0]][i[0][1]]!=" "){
                return harita[i[0][0]][i[0][1]];
            }
        }
    }
    let finish = true;
    for (let y=0;y<3;y++){
        for (let x=0;x<3;x++){
            if (harita[y][x]==" "){
                finish = false;
                break;
            }
        }
        if (!finish){
            break;
        }
    }
    if (finish){
        return "Draw";
    }
    return null;
}