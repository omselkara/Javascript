let zıt = {
    "d":"a",
    "a":"d",
    "w":"s",
    "s":"w"
}
function solve(game,startx,starty,finishx,finishy,fast=true){
    let çözücü = new solver(startx,starty);
    let harita = [];
    for (let y of range(0,game.length)){
        harita.push([]);
        for (let x of range(0,game[y].length)){
            harita[y].push(new hücre(game[y][x][0],game[y][x][1],game[y][x][2],game[y][x][3],dist(x,y,finishx,finishy)));
        }
    }
    harita[starty][startx].visited=true;
    let moves = [];
    while (true){
        if (çözücü.x==finishx && çözücü.y==finishy){
            break;
        }
        else{
            let listofmoves = [];
            if (çözücü.x>0){
                let yap = true;
                if (harita[çözücü.y][çözücü.x].sol || harita[çözücü.y][çözücü.x-1].sağ){
                    yap = false;
                }
                if (harita[çözücü.y][çözücü.x-1].visited){
                    yap = false;
                }
                if (yap){
                    listofmoves.push([çözücü.x-1,çözücü.y,"a"]);
                }
            }
            if (çözücü.x<harita[0].length-1){
                let yap = true;
                if (harita[çözücü.y][çözücü.x].sağ || harita[çözücü.y][çözücü.x+1].sol){
                    yap = false;
                }
                if (harita[çözücü.y][çözücü.x+1].visited){
                    yap = false;
                }
                if (yap){
                    listofmoves.push([çözücü.x+1,çözücü.y,"d"]);
                }
            }
            if (çözücü.y>0){
                let yap = true;
                if (harita[çözücü.y][çözücü.x].yukarı || harita[çözücü.y-1][çözücü.x].aşağı){
                    yap = false;
                }
                if (harita[çözücü.y-1][çözücü.x].visited){
                    yap = false;
                }
                if (yap){
                    listofmoves.push([çözücü.x,çözücü.y-1,"w"]);
                }
            }
            if (çözücü.y<harita.length-1){
                let yap = true;
                if (harita[çözücü.y][çözücü.x].aşağı || harita[çözücü.y+1][çözücü.x].yukarı){
                    yap = false;
                }
                if (harita[çözücü.y+1][çözücü.x].visited){
                    yap = false;
                }
                if (yap){
                    listofmoves.push([çözücü.x,çözücü.y+1,"s"]);
                }
            }
            if (listofmoves.length==0){
                çözücü.move(zıt[çözücü.moves[çözücü.moves.length-1][2]],false);
                çözücü.moves.pop();
            }
            else{
                let değer = harita[listofmoves[0][1]][listofmoves[0][0]].değer;
                let yer = 0;
                if (fast){
                    for (let i of range(1,listofmoves.length)){
                        if (harita[listofmoves[i][1]][listofmoves[i][0]].değer<değer){
                            değer = harita[listofmoves[i][1]][listofmoves[i][0]].değer;
                            yer = i;   
                        }
                    }
                }
                else{
                    for (let i of range(1,listofmoves.length)){
                        if (harita[listofmoves[i][1]][listofmoves[i][0]].değer>değer){
                            değer = harita[listofmoves[i][1]][listofmoves[i][0]].değer;
                            yer = i;   
                        }
                    }
                }
                let seçilen = listofmoves[yer][2];
                çözücü.move(seçilen,true);
                harita[çözücü.y][çözücü.x].visited=true;
            }
        }
    }
    return çözücü.moves;
}
class hücre{
    constructor(sol,sağ,yukarı,aşağı,değer){
        this.sol = sol;
        this.sağ = sağ;
        this.yukarı = yukarı;
        this.aşağı = aşağı;
        this.visited = false;
        this.değer = değer;
    }
}

class solver{
    constructor(x,y){
        this.x = x;
        this.y = y;
        this.moves = [];
    }
    move(yön,yap){
        if (yap){
            this.moves.push([this.x,this.y,yön]);
        }
        if (yön=="d"){
            this.x++;
        }
        if (yön=="a"){
            this.x--;
        }
        if (yön=="w"){
            this.y--;
        }
        if (yön=="s"){
            this.y++;
        }
    }
}