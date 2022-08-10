class pawn{
    constructor(x,y,n,iswhite){
        this.iswhite = iswhite;
        this.x = x;
        this.y = y;
        this.n = n;
        this.moved = false;
        this.type = "Pawn";
        this.firsttwo = false;
        this.when = 0;
    }
    show(){
        if (!this.iswhite){
            image(blackpawn,this.x*this.n,this.y*this.n,n,n);
        }
        else{
            image(whitepawn,this.x*this.n,this.y*this.n,n,n);
        }
    }
    getposiblemoves(map,iscopy,sıra){
        let moves = [];
        if (this.iswhite){
            if (!this.moved){
                let yap = true;
                for (let y=this.y-2;y<this.y;y++){
                    if (y<0){
                        yap = false;
                        break;
                    }
                    else{
                        if (map[y][this.x]!=null){
                            yap = false;
                            break;
                        }
                    }
                }
                if (yap){
                    moves.push([this.x,this.y-2,[this.x,this.y]]);
                }
            }
            if (this.y-1>=0){
                if (map[this.y-1][this.x]==null){
                    moves.push([this.x,this.y-1,[this.x,this.y]]);
                }
            }
            if (this.y-1>=0){
                if (this.x-1>=0){
                    if (map[this.y-1][this.x-1]!=null && this.iswhite!=map[this.y-1][this.x-1].iswhite){
                        moves.push([this.x-1,this.y-1,[this.x,this.y]]);
                    }
                }
                if (this.x+1<8){
                    if (map[this.y-1][this.x+1]!=null && this.iswhite!=map[this.y-1][this.x+1].iswhite){
                        moves.push([this.x+1,this.y-1,[this.x,this.y]]);
                    }
                }
            }
            if (this.y-1>=0){
                if (this.x-1>=0){
                    if (map[this.y][this.x-1]!=null && map[this.y][this.x-1].type=="Pawn"){
                        if (map[this.y][this.x-1].firsttwo && map[this.y][this.x-1].when==sıra-1){
                            moves.push([this.x-1,this.y-1,[this.x-1,this.y]]);
                        }
                    }
                }
                if (this.x+1<8){
                    if (map[this.y][this.x+1]!=null && map[this.y][this.x+1].type=="Pawn"){
                        if (map[this.y][this.x+1].firsttwo && map[this.y][this.x+1].when==sıra-1){
                            moves.push([this.x+1,this.y-1,[this.x+1,this.y]]);
                        }
                    }
                }
            }
        }
        else{
            if (!this.moved){
                let yap = true;
                for (let y=this.y+1;y<this.y+3;y++){
                    if (y>=8){
                        yap = false;
                        break;
                    }
                    else{
                        if (map[y][this.x]!=null){
                            yap = false;
                            break;
                        }
                    }
                }
                if (yap){
                    moves.push([this.x,this.y+2,[this.x,this.y]]);
                }
            }
            if (this.y+1<8){
                if (map[this.y+1][this.x]==null){
                    moves.push([this.x,this.y+1,[this.x,this.y]]);
                }
            }
            if (this.y+1<8){
                if (this.x-1>=0){
                    if (map[this.y+1][this.x-1]!=null && this.iswhite!=map[this.y+1][this.x-1].iswhite){
                        moves.push([this.x-1,this.y+1,[this.x,this.y]]);
                    }
                }
                if (this.x+1<8){
                    if (map[this.y+1][this.x+1]!=null && this.iswhite!=map[this.y+1][this.x+1].iswhite){
                        moves.push([this.x+1,this.y+1,[this.x,this.y]]);
                    }
                }
            }
            if (this.y+1<8){
                if (this.x-1>=0){
                    if (map[this.y][this.x-1]!=null && map[this.y][this.x-1].type=="Pawn"){
                        if (map[this.y][this.x-1].firsttwo && map[this.y][this.x-1].when==sıra-1){
                            moves.push([this.x-1,this.y+1,[this.x-1,this.y]]);
                        }
                    }
                }
                if (this.x+1<8){
                    if (map[this.y][this.x+1]!=null && map[this.y][this.x+1].type=="Pawn"){
                        if (map[this.y][this.x+1].firsttwo && map[this.y][this.x+1].when==sıra-1){
                            moves.push([this.x+1,this.y+1,[this.x+1,this.y]]);
                        }
                    }
                }
            }
        }
        if (!iscopy){
            let kingx;
            let kingy;
            let found = false;
            for (let y=0;y<8;y++){
                for (let x=0;x<8;x++){
                    if (map[y][x]!=null){
                        if (map[y][x].type=="King" && map[y][x].iswhite==this.iswhite){
                            kingx = x;
                            kingy = y;
                            found = true;
                            break;
                        }
                    }
                }
                if (found){
                    break;
                }
            }
            let move = [];
            for (let i of moves){
                let board = [];
                for (let y=0;y<8;y++){
                    board.push([]);
                    for (let x=0;x<8;x++){
                        if (map[y][x]!=null){
                            board[y].push(map[y][x].copy());
                        }
                        else{
                            board[y].push(null);
                        }
                    }
                }
                board[this.y][this.x].move(i[0],i[1],board,true,sıra);
                if (!board[kingy][kingx].ischeck(board)){
                    move.push(i);
                }
            }
            moves = move;
        }
        return moves;
    }
    move(x,y,map,iscopy,sıra){
        let moves = this.getposiblemoves(map,iscopy,sıra);
        let yap = false;
        let del;
        for (let i of moves){
            if (i[0]==x && i[1]==y){
                yap = true;
                del = i[2];
                break;
            }
        }
        if (yap){
            map[y][x] = map[this.y][this.x];
            map[del[1]][del[0]] = null;
            if (!this.moved){
                this.moved = true;
            }
            if ((this.x==x && this.y+2==y) || (this.x==x && this.y-2==y)){
                this.firsttwo = true;
                this.when = sıra;
            }
            this.x = x;
            this.y = y;
            if (this.iswhite){
                if (this.y==0){
                    map[this.y][this.x] = new queen(this.x,this.y,this.n,this.iswhite);
                }
            }
            else{
                if (this.y==7){
                    map[this.y][this.x] = new queen(this.x,this.y,this.n,this.iswhite);
                }
            }
            sıra++;
        }
        return yap;
    }
    copy(){
        let clone = new pawn(this.x,this.y,this.n,this.iswhite);
        clone.moved = this.moved;
        clone.firsttwo = this.firsttwo;
        clone.when = this.when;
        return clone;
    }
}
class knight{
    constructor(x,y,n,iswhite){
        this.iswhite = iswhite;
        this.x = x;
        this.y = y;
        this.n = n;
        this.type = "Knight";
    }
    getposiblemoves(map,iscopy){
        let list = [[-2,-1],[-1,-2],[1,-2],[2,-1],[-2,1],[-1,2],[2,1],[1,2]];
        let moves = [];
        for (let i of list){
            if (this.x+i[0]>=0 && this.x+i[0]<8 && this.y+i[1]>=0 && this.y+i[1]<8){
                if (map[this.y+i[1]][this.x+i[0]]==null || map[this.y+i[1]][this.x+i[0]].iswhite!=this.iswhite)
                moves.push([this.x+i[0],this.y+i[1],[this.x,this.y]]);
            }
        }
        if (!iscopy){
            let kingx;
            let kingy;
            let found = false;
            for (let y=0;y<8;y++){
                for (let x=0;x<8;x++){
                    if (map[y][x]!=null){
                        if (map[y][x].type=="King" && map[y][x].iswhite==this.iswhite){
                            kingx = x;
                            kingy = y;
                            found = true;
                            break;
                        }
                    }
                }
                if (found){
                    break;
                }
            }
            let move = [];
            for (let i of moves){
                let board = [];
                for (let y=0;y<8;y++){
                    board.push([]);
                    for (let x=0;x<8;x++){
                        if (map[y][x]!=null){
                            board[y].push(map[y][x].copy());
                        }
                        else{
                            board[y].push(null);
                        }
                    }
                }
                board[this.y][this.x].move(i[0],i[1],board,true,sıra);
                if (!board[kingy][kingx].ischeck(board)){
                    move.push(i);
                }
            }
            moves = move;
        }
        return moves;
    }
    move(x,y,map,iscopy){
        let moves = this.getposiblemoves(map,iscopy);
        let yap = false;
        let del;
        for (let i of moves){
            if (x==i[0] && y==i[1]){
                yap = true;
                del = i[2];
                break;
            }
        }
        if (yap){
            map[y][x] = map[this.y][this.x];
            map[del[1]][del[0]] = null;
            this.x = x;
            this.y = y;
        }
        return yap;
    }
    show(){
        if (this.iswhite){
            image(whiteknight,this.x*n,this.y*n,n,n);
        }
        else{
            image(blackknight,this.x*n,this.y*n,n,n);
        }
    }
    copy(){
        let clone = new knight(this.x,this.y,this.n,this.iswhite);
        return clone;
    }
}
class bishop{
    constructor(x,y,n,iswhite){
        this.x = x;
        this.y = y;
        this.n = n;
        this.iswhite = iswhite;
        this.type = "Bishop";
    }
    show(){
        if (this.iswhite){
            image(whitebishop,this.x*n,this.y*n,n,n);
        }
        else{
            image(blackbishop,this.x*n,this.y*n,n,n);
        }
    }
    getposiblemoves(map,iscopy){
        let list = [[-1,-1],[1,-1],[1,1],[-1,1]];
        let moves = [];
        for (let i of list){
            let x = this.x+i[0];
            let y = this.y+i[1];
            while (true){
                if (x>=0 && x<8 && y>=0 && y<8){
                    if (map[y][x]!=null){
                        if (this.iswhite!=map[y][x].iswhite){
                            moves.push([x,y,[this.x,this.y]]);
                        }
                        break;
                    }
                    else{
                        moves.push([x,y,[this.x,this.y]])
                        x += i[0];
                        y += i[1];
                    }
                }
                else{
                    break;
                }
            }
        }
        if (!iscopy){
            let kingx;
            let kingy;
            let found = false;
            for (let y=0;y<8;y++){
                for (let x=0;x<8;x++){
                    if (map[y][x]!=null){
                        if (map[y][x].type=="King" && map[y][x].iswhite==this.iswhite){
                            kingx = x;
                            kingy = y;
                            found = true;
                            break;
                        }
                    }
                }
                if (found){
                    break;
                }
            }
            let move = [];
            for (let i of moves){
                let board = [];
                for (let y=0;y<8;y++){
                    board.push([]);
                    for (let x=0;x<8;x++){
                        if (map[y][x]!=null){
                            board[y].push(map[y][x].copy());
                        }
                        else{
                            board[y].push(null);
                        }
                    }
                }
                board[this.y][this.x].move(i[0],i[1],board,true,sıra);
                if (!board[kingy][kingx].ischeck(board)){
                    move.push(i);
                }
            }
            moves = move;
        }
        return moves;
    }
    move(x,y,map,iscopy){
        let moves = this.getposiblemoves(map,iscopy);
        let yap = false;
        let del;
        for (let i of moves){
            if (x==i[0] && y==i[1]){
                yap = true;
                del = i[2];
                break;
            }
        }
        if (yap){
            map[y][x] = map[this.y][this.x];
            map[del[1]][del[0]] = null;
            this.x = x;
            this.y = y;
        }
        return yap;
    }
    copy(){
        let clone = new bishop(this.x,this.y,this.n,this.iswhite);
        return clone;
    }
}
class rook{
    constructor(x,y,n,iswhite){
        this.x = x;
        this.y = y;
        this.n = n;
        this.iswhite = iswhite;
        this.type = "Rook";
        this.moved = false;
    }
    show(){
        if (this.iswhite){
            image(whiterook,this.x*n,this.y*n,n,n);
        }
        else{
            image(blackrook,this.x*n,this.y*n,n,n);
        }
    }
    getposiblemoves(map,iscopy){
        let list = [[-1,0],[0,-1],[1,0],[0,1]];
        let moves = [];
        for (let i of list){
            let x = this.x+i[0];
            let y = this.y+i[1];
            while (true){
                if (x>=0 && x<8 && y>=0 && y<8){
                    if (map[y][x]!=null){
                        if (this.iswhite!=map[y][x].iswhite){
                            moves.push([x,y,[this.x,this.y]]);
                        }
                        break;
                    }
                    else{
                        moves.push([x,y,[this.x,this.y]])
                        x += i[0];
                        y += i[1];
                    }
                }
                else{
                    break;
                }
            }
        }
        if (!iscopy){
            let kingx;
            let kingy;
            let found = false;
            for (let y=0;y<8;y++){
                for (let x=0;x<8;x++){
                    if (map[y][x]!=null){
                        if (map[y][x].type=="King" && map[y][x].iswhite==this.iswhite){
                            kingx = x;
                            kingy = y;
                            found = true;
                            break;
                        }
                    }
                }
                if (found){
                    break;
                }
            }
            let move = [];
            for (let i of moves){
                let board = [];
                for (let y=0;y<8;y++){
                    board.push([]);
                    for (let x=0;x<8;x++){
                        if (map[y][x]!=null){
                            board[y].push(map[y][x].copy());
                        }
                        else{
                            board[y].push(null);
                        }
                    }
                }
                board[this.y][this.x].move(i[0],i[1],board,true,sıra);
                if (!board[kingy][kingx].ischeck(board)){
                    move.push(i);
                }
            }
            moves = move;
        }
        return moves;
    }
    move(x,y,map,iscopy){
        let moves = this.getposiblemoves(map,iscopy);
        let yap = false;
        let del;
        for (let i of moves){
            if (x==i[0] && y==i[1]){
                yap = true;
                del = i[2];
                break;
            }
        }
        if (yap){
            map[y][x] = map[this.y][this.x];
            map[del[1]][del[0]] = null;
            this.x = x;
            this.y = y;
            this.moved = true;
        }
        return yap;
    }
    copy(){
        let clone = new rook(this.x,this.y,this.n,this.iswhite);
        clone.moved = this.moved;
        return clone;
    }
}
class queen{
    constructor(x,y,n,iswhite){
        this.x = x;
        this.y = y;
        this.n = n;
        this.iswhite = iswhite;
        this.type = "Queen";
    }
    show(){
        if (this.iswhite){
            image(whitequeen,this.x*n,this.y*n,n,n);
        }
        else{
            image(blackqueen,this.x*n,this.y*n,n,n);
        }
    }
    getposiblemoves(map,iscopy){
        let list = [[-1,-1],[1,-1],[1,1],[-1,1],[-1,0],[0,-1],[1,0],[0,1]];
        let moves = [];
        for (let i of list){
            let x = this.x+i[0];
            let y = this.y+i[1];
            while (true){
                if (x>=0 && x<8 && y>=0 && y<8){
                    if (map[y][x]!=null){
                        if (this.iswhite!=map[y][x].iswhite){
                            moves.push([x,y,[this.x,this.y]]);
                        }
                        break;
                    }
                    else{
                        moves.push([x,y,[this.x,this.y]])
                        x += i[0];
                        y += i[1];
                    }
                }
                else{
                    break;
                }
            }
        }
        if (!iscopy){
            let kingx;
            let kingy;
            let found = false;
            for (let y=0;y<8;y++){
                for (let x=0;x<8;x++){
                    if (map[y][x]!=null){
                        if (map[y][x].type=="King" && map[y][x].iswhite==this.iswhite){
                            kingx = x;
                            kingy = y;
                            found = true;
                            break;
                        }
                    }
                }
                if (found){
                    break;
                }
            }
            let move = [];
            for (let i of moves){
                let board = [];
                for (let y=0;y<8;y++){
                    board.push([]);
                    for (let x=0;x<8;x++){
                        if (map[y][x]!=null){
                            board[y].push(map[y][x].copy());
                        }
                        else{
                            board[y].push(null);
                        }
                    }
                }
                board[this.y][this.x].move(i[0],i[1],board,true,sıra);
                if (!board[kingy][kingx].ischeck(board)){
                    move.push(i);
                }
            }
            moves = move;
        }
        return moves;
    }
    move(x,y,map,iscopy){
        let moves = this.getposiblemoves(map,iscopy);
        let yap = false;
        let del;
        for (let i of moves){
            if (x==i[0] && y==i[1]){
                yap = true;
                del = i[2];
                break;
            }
        }
        if (yap){
            map[y][x] = map[this.y][this.x];
            map[del[1]][del[0]] = null;
            this.x = x;
            this.y = y;
        }
        return yap;
    }
    copy(){
        let clone = new queen(this.x,this.y,this.n,this.iswhite);
        return clone;
    }
}
class king{
   constructor(x,y,n,iswhite){
       this.x = x;
       this.y = y;
       this.n = n;
       this.iswhite = iswhite;
       this.type = "King";
       this.moved = false;
    }
    show(){
        if (this.iswhite){
            image(whiteking,this.x*n,this.y*n,n,n);
        }
        else{
            image(blackking,this.x*n,this.y*n,n,n);
        }
    }
    getposiblemoves(map,iscopy,sıra,castling=true){
        let list = [[-1,-1],[0,-1],[1,-1],[-1,0],[1,0],[-1,1],[0,1],[1,1]];
        let moves = [];
        for (let i of list){
            let x = this.x+i[0];
            let y = this.y+i[1];
            if (x>=0 && x<8 && y>=0 && y<8){
                if (map[y][x]==null){
                    moves.push([x,y,[this.x,this.y],[],[]]);
                }
                else{
                    if (map[y][x].iswhite!=this.iswhite){
                        moves.push([x,y,[this.x,this.y],[],[]]);
                    }
                }
            }
        }
        if (castling===true){
            if (this.iswhite){
                if (map[7][0]!=null){
                    if (map[7][0].type=="Rook" && !map[7][0].moved && !this.moved){
                        if (map[7][1]==null && map[7][2]==null && map[7][3]==null){
                            for (let y=0;y<8;y++){
                                for (let x=0;x<8;x++){
                                    if (map[y][x]!=null){
                                        if (map[y][x].iswhite!=this.iswhite){
                                            let move = map[y][x].getposiblemoves(map,true,0,false);
                                            let yap = true;
                                            for (let i of move){
                                                if ((i[0]==1 && i[1]==7) || (i[0]==2 && i[1]==7) || (i[0]==3 && i[1]==7) || (i[0]==4 && i[1]==7)){
                                                    yap = false;
                                                    break;
                                                }
                                            }
                                            if (yap){
                                                moves.push([2,7,[4,7],[0,7],[3,7]])
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
                if (map[7][7]!=null){
                    if (map[7][7].type=="Rook" && !map[7][7].moved && !this.moved){
                        if (map[7][5]==null && map[7][6]==null){
                            for (let y=0;y<8;y++){
                                for (let x=0;x<8;x++){
                                    if (map[y][x]!=null){
                                        if (map[y][x].iswhite!=this.iswhite){
                                            let move = map[y][x].getposiblemoves(map,true,0,false);
                                            let yap = true;
                                            for (let i of move){
                                                if ((i[0]==4 && i[1]==7) || (i[0]==5 && i[1]==7) || (i[0]==6 && i[1]==7)){
                                                    yap = false;
                                                    break;
                                                }
                                            }
                                            if (yap){
                                                moves.push([6,7,[4,7],[7,7],[5,7]])
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
            else{
                if (map[0][0]!=null){
                    if (map[0][0].type=="Rook" && !map[0][0].moved && !this.moved){
                        if (map[0][1]==null && map[0][2]==null && map[0][3]==null){
                            for (let y=0;y<8;y++){
                                for (let x=0;x<8;x++){
                                    if (map[y][x]!=null){
                                        if (map[y][x].iswhite!=this.iswhite){
                                            let move = map[y][x].getposiblemoves(map,true,0,false);
                                            let yap = true;
                                            for (let i of move){
                                                if ((i[0]==1 && i[1]==0) || (i[0]==2 && i[1]==0) || (i[0]==3 && i[1]==0) || (i[0]==4 && i[1]==0)){
                                                    yap = false;
                                                    break;
                                                }
                                            }
                                            if (yap){
                                                moves.push([2,0,[4,0],[0,0],[3,0]])
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
            if (map[0][7]!=null){
                    if (map[0][7].type=="Rook" && !map[0][7].moved && !this.moved){
                        if (map[0][5]==null && map[0][6]==null){
                            for (let y=0;y<8;y++){
                                for (let x=0;x<8;x++){
                                    if (map[y][x]!=null){
                                        if (map[y][x].iswhite!=this.iswhite){
                                            let move = map[y][x].getposiblemoves(map,true,0,false);
                                            let yap = true;
                                            for (let i of move){
                                                if ((i[0]==4 && i[1]==0) || (i[0]==5 && i[1]==0) || (i[0]==6 && i[1]==0)){
                                                    yap = false;
                                                    break;
                                                }
                                            }
                                            if (yap){
                                                moves.push([6,0,[4,0],[7,0],[5,0]])
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
        }
        if (!iscopy){
            let move = [];
            for (let i of moves){
                let board = [];
                for (let y=0;y<8;y++){
                    board.push([]);
                    for (let x=0;x<8;x++){
                        if (map[y][x]!=null){
                            board[y].push(map[y][x].copy());
                        }
                        else{
                            board[y].push(null);
                        }
                    }
                }
                board[this.y][this.x].move(i[0],i[1],board,true,sıra);
                if (!board[i[1]][i[0]].ischeck(board)){
                    move.push(i);
                }
            }
            moves = move;
        }
        return moves;
    }
    ischeck(map){
        for (let y=0;y<8;y++){
            for (let x=0;x<8;x++){
                if (map[y][x]!=null){
                    if (map[y][x].iswhite!=this.iswhite){
                        let moves = map[y][x].getposiblemoves(map,true,0,false);
                        for (let move of moves){
                            if (move[0]==this.x && move[1]==this.y){
                                return true;
                            }
                        }
                    }
                }
            }
        }
        return false;
    }
    move(x,y,map,iscopy){
        let moves = this.getposiblemoves(map,iscopy);
        let yap = false;
        let del;
        let delrook;
        let moverook;
        for (let i of moves){
            if (x==i[0] && y==i[1]){
                yap = true;
                del = i[2];
                delrook = i[3];
                moverook = i[4]
                break;
            }
        }
        if (yap){
            map[y][x] = map[this.y][this.x];
            map[del[1]][del[0]] = null;
            if (delrook.length>0){
                map[delrook[1]][delrook[0]].x = moverook[0]
                map[delrook[1]][delrook[0]].moved = true;
                map[moverook[1]][moverook[0]] = map[delrook[1]][delrook[0]];
                map[delrook[1]][delrook[0]] = null;
            }
            this.x = x;
            this.y = y;
            this.moved = true;
        }
        return yap;
    }
    copy(){
        let clone = new king(this.x,this.y,this.n,this.iswhite);
        clone.moved = this.moved;
        return clone;
    }
}
