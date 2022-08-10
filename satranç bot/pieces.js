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
            drawingContext.drawImage(blackpawn,this.x*n,this.y*n,n,n);
        }
        else{
            drawingContext.drawImage(whitepawn,this.x*n,this.y*n,n,n);
        }
    }
    getposiblemoves(map){
        let moves = [];
        if (this.iswhite){
            if (!this.moved){
                let yap = true;
                for (let y=this.y-2;y<this.y;y++){
                    if (y<0){
                        yap = false;
                        break;
                    }
                    else if (map.getpieceat(this.x,y)!=null){
                        yap = false;
                        break;
                    }
                }
                if (yap){
                    moves.push([this.x,this.y-2,[]]);
                }
            }
            if (this.y-1>=0 && map.getpieceat(this.x,this.y-1)==null){
                moves.push([this.x,this.y-1,[]]);
            }
            if (this.y-1>=0 && this.x-1>=0){
                let piece = map.getpieceat(this.x-1,this.y-1);
                if (piece!=null && this.iswhite!=piece.iswhite){
                    moves.push([this.x-1,this.y-1,[]]);
                }
            }
            if (this.y-1>=0 && this.x+1<8){
                let piece = map.getpieceat(this.x+1,this.y-1);
                if (piece!=null && this.iswhite!=piece.iswhite){
                    moves.push([this.x+1,this.y-1,[]]);
                }
            }
            if (this.y-1>=0 && this.x-1>=0){
                let piece = map.getpieceat(this.x-1,this.y);
                if (piece!=null && piece.type=="Pawn" && piece.firsttwo && piece.when==map.sıra-1){
                    moves.push([this.x-1,this.y-1,[this.x-1,this.y]]);
                }
            }
            if (this.y-1>=0 && this.x+1<8){
                let piece = map.getpieceat(this.x+1,this.y);
                if (piece!=null && piece.type=="Pawn" && piece.firsttwo && piece.when==map.sıra-1){
                    moves.push([this.x+1,this.y-1,[this.x+1,this.y]]);
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
                        if (map.getpieceat(this.x,y)!=null){
                            yap = false;
                            break;
                        }
                    }
                }
                if (yap){
                    moves.push([this.x,this.y+2,[]]);
                }
            }
            if (this.y+1<8 && map.getpieceat(this.x,this.y+1)==null){
                moves.push([this.x,this.y+1,[]]);
            }
            if (this.y+1<8 && this.x-1>=0){
                let piece = map.getpieceat(this.x-1,this.y+1);
                if (piece!=null && this.iswhite!=piece.iswhite){
                    moves.push([this.x-1,this.y+1,[]]);
                }
            }
            if (this.y+1<8 && this.x+1<8){
                let piece = map.getpieceat(this.x+1,this.y+1);
                if (piece!=null && this.iswhite!=piece.iswhite){
                    moves.push([this.x+1,this.y+1,[]]);
                }
            }
            if (this.y+1<8 && this.x-1>=0){
                let piece = map.getpieceat(this.x-1,this.y);
                if (piece!=null && piece.type=="Pawn" && piece.firsttwo && piece.when==map.sıra-1){
                    moves.push([this.x-1,this.y+1,[this.x-1,this.y]]);
                }
            }
            if (this.y+1<8 && this.x+1<8){
                let piece = map.getpieceat(this.x+1,this.y);
                if (piece!=null && piece.type=="Pawn" && piece.firsttwo && piece.when==map.sıra-1){
                    moves.push([this.x+1,this.y+1,[this.x+1,this.y]]);
                }
            }
        }
        return moves;
    }
    canmove(move,map){
        let clone = map.copy();
        let piece = clone.getpieceat(this.x,this.y);
        piece.x = move[0];
        piece.y = move[1];
        if (move[2].length>0){
            clone.delpieceat(move[2][0],move[2][1]);
        }
        clone.checkboard(piece);
        if (!clone.getking(this.iswhite).ischeck(clone)){
            return true;
        }
    }
    move(x,y,map){
        let moves = this.getposiblemoves(map);
        let yap = false;
        let del;
        for (let i of moves){
            if (i[0]==x && i[1]==y && this.canmove(i,map)){
                yap = true;
                del = i[2];
                break;
            }
        }
        if (yap){
            if (del.length>0){map.delpieceat(del[0],del[1],!this.iswhite);}
            if (!this.moved){
                this.moved = true;
            }
            if ((this.x==x && this.y+2==y) || (this.x==x && this.y-2==y)){
                this.firsttwo = true;
                this.when = map.sıra;
            }
            this.x = x;
            this.y = y;
            if ((this.y==0 && this.iswhite) || (!this.iswhite && this.y==7)){
                map.addpieceto(new queen(this.x,this.y,this.n,this.iswhite),this.x,this.y,this.iswhite);
                map.delpieceat(this.x,this.y,this.iswhite,"Pawn");
            }
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
    getposiblemoves(map){
        let list = [[-2,-1],[-1,-2],[1,-2],[2,-1],[-2,1],[-1,2],[2,1],[1,2]];
        let moves = [];
        for (let i of list){
            if (this.x+i[0]>=0 && this.x+i[0]<8 && this.y+i[1]>=0 && this.y+i[1]<8){
                let piece = map.getpieceat(this.x+i[0],this.y+i[1]);
                if (piece==null || piece.iswhite!=this.iswhite){
                    moves.push([this.x+i[0],this.y+i[1],[]]);
                }
            }
        }
        return moves;
    }
    canmove(move,map){
        let clone = map.copy();
        let piece = clone.getpieceat(this.x,this.y);
        piece.x = move[0];
        piece.y = move[1];
        if (move[2].length>0){
            clone.delpieceat(move[2][0],move[2][1]);
        }
        clone.checkboard(piece);
        if (!clone.getking(this.iswhite).ischeck(clone)){
            return true;
        }
    }
    move(x,y,map){
        let moves = this.getposiblemoves(map);
        let yap = false;
        let del;
        for (let i of moves){
            if (x==i[0] && y==i[1] && this.canmove(i,map)){
                yap = true;
                del = i[2];
                break;
            }
        }
        if (yap){
            if (del.length>0){
                map.delpieceat(del[0],del[1]);
            }
            this.x = x;
            this.y = y;
        }
        return yap;
    }
    show(){
        if (this.iswhite){
            drawingContext.drawImage(whiteknight,this.x*n,this.y*n,n,n);
        }
        else{
            drawingContext.drawImage(blackknight,this.x*n,this.y*n,n,n);
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
            drawingContext.drawImage(whitebishop,this.x*n,this.y*n,n,n);
        }
        else{
            drawingContext.drawImage(blackbishop,this.x*n,this.y*n,n,n);
        }
    }
    getposiblemoves(map,test=false){
        let list = [[-1,-1],[1,-1],[1,1],[-1,1]];
        let moves = [];
        for (let i of list){
            let x = this.x+i[0];
            let y = this.y+i[1];
            while (true){
                if (x>=0 && x<8 && y>=0 && y<8){
                    let piece = map.getpieceat(x,y);
                    if (piece!=null){
                        if (test){
                        }
                        if (this.iswhite!=piece.iswhite){
                            moves.push([x,y,[]]);
                        }
                        break;
                    }
                    else{
                        moves.push([x,y,[]])
                        x += i[0];
                        y += i[1];
                    }
                }
                else{
                    break;
                }
            }
        }
        return moves;
    }
    canmove(move,map){
        let clone = map.copy();
        let piece = clone.getpieceat(this.x,this.y);
        piece.x = move[0];
        piece.y = move[1];
        if (move[2].length>0){
            clone.delpieceat(move[2][0],move[2][1]);
        }
        clone.checkboard(piece);
        if (!clone.getking(this.iswhite).ischeck(clone)){
            return true;
        }
    }
    move(x,y,map){
        let moves = this.getposiblemoves(map);
        let yap = false;
        let del;
        for (let i of moves){
            if (x==i[0] && y==i[1] && this.canmove(i,map)){
                yap = true;
                del = i[2];
                break;
            }
        }
        if (yap){
            if (del.length>0){
                map.delpieceat(del[0],del[1]);
            }
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
            drawingContext.drawImage(whiterook,this.x*n,this.y*n,n,n);
        }
        else{
            drawingContext.drawImage(blackrook,this.x*n,this.y*n,n,n);
        }
    }
    getposiblemoves(map){
        let list = [[-1,0],[0,-1],[1,0],[0,1]];
        let moves = [];
        for (let i of list){
            let x = this.x+i[0];
            let y = this.y+i[1];
            while (true){
                if (x>=0 && x<8 && y>=0 && y<8){
                    let piece = map.getpieceat(x,y);
                    if (piece!=null){
                        if (this.iswhite!=piece.iswhite){
                            moves.push([x,y,[]]);
                        }
                        break;
                    }
                    else{
                        moves.push([x,y,[]])
                        x += i[0];
                        y += i[1];
                    }
                }
                else{
                    break;
                }
            }
        }
        return moves;
    }
    canmove(move,map){
        let clone = map.copy();
        let piece = clone.getpieceat(this.x,this.y);
        piece.x = move[0];
        piece.y = move[1];
        if (move[2].length>0){
            clone.delpieceat(move[2][0],move[2][1]);
        }
        clone.checkboard(piece);
        if (!clone.getking(this.iswhite).ischeck(clone)){
            return true;
        }
    }
    move(x,y,map){
        let moves = this.getposiblemoves(map);
        let yap = false;
        let del;
        for (let i of moves){
            if (x==i[0] && y==i[1] && this.canmove(i,map)){
                yap = true;
                del = i[2];
                break;
            }
        }
        if (yap){
            if (del.length>0){
                map.delpieceat(del[0],del[1]);
            }
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
            drawingContext.drawImage(whitequeen,this.x*n,this.y*n,n,n);
        }
        else{
            drawingContext.drawImage(blackqueen,this.x*n,this.y*n,n,n);
        }
    }
    canmove(move,map){
        let clone = map.copy();
        let piece = clone.getpieceat(this.x,this.y);
        piece.x = move[0];
        piece.y = move[1];
        if (move[2].length>0){
            clone.delpieceat(move[2][0],move[2][1]);
        }
        clone.checkboard(piece);
        if (!clone.getking(this.iswhite).ischeck(clone)){
            return true;
        }
    }
    getposiblemoves(map){
        let list = [[-1,-1],[1,-1],[1,1],[-1,1],[-1,0],[0,-1],[1,0],[0,1]];
        let moves = [];
        for (let i of list){
            let x = this.x+i[0];
            let y = this.y+i[1];
            while (true){
                if (x>=0 && x<8 && y>=0 && y<8){
                    let piece = map.getpieceat(x,y)
                    if (piece!=null){
                        if (this.iswhite!=piece.iswhite){
                            moves.push([x,y,[]]);
                        }
                        break;
                    }
                    else{
                        moves.push([x,y,[]])
                        x += i[0];
                        y += i[1];
                    }
                }
                else{
                    break;
                }
            }
        }
        return moves;
    }
    move(x,y,map){
        let moves = this.getposiblemoves(map);
        let yap = false;
        let del;
        for (let i of moves){
            if (x==i[0] && y==i[1] && this.canmove(i,map)){
                yap = true;
                del = i[2];
                break;
            }
        }
        if (yap){
            if (del.length>0){
                map.delpieceat(del[0],del[1]);
            }
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
            drawingContext.drawImage(whiteking,this.x*n,this.y*n,n,n);
        }
        else{
            drawingContext.drawImage(blackking,this.x*n,this.y*n,n,n);
        }
    }
    getposiblemoves(map,castling=true){
        let list = [[-1,-1],[0,-1],[1,-1],[-1,0],[1,0],[-1,1],[0,1],[1,1]];
        let moves = [];
        for (let i of list){
            let x = this.x+i[0];
            let y = this.y+i[1];
            if (x>=0 && x<8 && y>=0 && y<8){
                let piece = map.getpieceat(x,y);
                if (piece==null){
                    moves.push([x,y,[],[],[]]);
                }
                else{
                    if (piece.iswhite!=this.iswhite){
                        moves.push([x,y,[],[],[]]);
                    }
                }
            }
        }
        if (!this.moved && castling){
            let y = 0;
            if (this.iswhite){
                y=7;
            }
            let harita = [];
            for(let i=0;i<4;i++){
                harita.push(map.getpieceat(i,y))
            }
            if (harita[0]!=null && !harita[0].moved && harita[1]==null && harita[2]==null && harita[3]==null){
                let yap = true;
                for (let i of map.getpieces(!this.iswhite)){
                    for (let a of i.getposiblemoves(map,false)){
                        if (a[1]==y && (a[0]==1 || a[0]==2 || a[0]==3 || a[0]==4)){
                            yap = false;
                            break;
                        }
                    }
                    if (!yap){
                        break;
                    }
                }
                if (yap){
                    moves.push([2,y,[],[0,y],[3,y]])
                }
            }
            harita = [];
            for(let i=5;i<8;i++){
                harita.push(map.getpieceat(i,y))
            }
            if (harita[2]!=null && !harita[2].moved && harita[0]==null && harita[1]==null){
                let yap = true;
                for (let i of map.getpieces(!this.iswhite)){
                    for (let a of i.getposiblemoves(map,false)){
                        if (a[1]==y && (a[0]==4 || a[0]==5 || a[0]==6)){
                            yap = false;
                            break;
                        }
                    }
                    if (!yap){
                        break;
                    }
                }
                if (yap){
                    moves.push([6,y,[],[7,y],[5,y]])
                }
            }
        }
        return moves;
    }
    canmove(move,map){
        let clone = map.copy();
        let piece = clone.getpieceat(this.x,this.y);
        piece.x = move[0];
        piece.y = move[1];
        if (move[3].length>0){
            let piece2 = clone.getpieceat(move[3][0],move[3][1]);
            piece2.x = move[4][0];
            piece2.y = move[4][1];
        }
        clone.checkboard(piece);
        if (!clone.getking(this.iswhite).ischeck(clone)){
            return true;
        }
    }
    ischeck(map){
        for (let i of map.getpieces(!this.iswhite)){
            let moves = i.getposiblemoves(map);
            for (let a of moves){
                if (a[0]==this.x && a[1]==this.y){
                    return true;
                }
            }
        }
        return false;
    }
    move(x,y,map){
        let moves = this.getposiblemoves(map);
        let yap = false;
        let del;
        let delrook;
        let moverook;
        for (let i of moves){
            if (x==i[0] && y==i[1] && this.canmove(i,map)){
                yap = true;
                del = i[2];
                delrook = i[3];
                moverook = i[4]
                break;
            }
        }
        if (yap){
            if (delrook.length>0){
                let piece = map.getpieceat(delrook[0],delrook[1]);
                piece.x = moverook[0];
                piece.y = moverook[1];
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
