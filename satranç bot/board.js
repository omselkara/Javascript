let allpieces = {"Pawn":8,"Knight":2,"Bishop":2,"Rook":2,"Queen":1}
class board{
    constructor(iscopy=false){
        this.whites = [];
        this.blacks = [];
        this.moves = [];
        this.sıra = 0;
        if (!iscopy){
            for (let x=0;x<8;x++){
                this.blacks.push(new pawn(x,1,n,false));
                this.whites.push(new pawn(x,6,n,true));
            }
            for (let x=1;x<7;x+=5){
                this.blacks.push(new knight(x,0,n,false));
                this.whites.push(new knight(x,7,n,true));
            }
            for (let x=2;x<6;x+=3){
                this.blacks.push(new bishop(x,0,n,false));
                this.whites.push(new bishop(x,7,n,true));
            }
            for (let x=0;x<8;x+=7){
                this.blacks.push(new rook(x,0,n,false));
                this.whites.push(new rook(x,7,n,true));
            }
            for (let x=3;x<4;x++){
                this.blacks.push(new queen(x,0,n,false));
                this.whites.push(new queen(x,7,n,true));
            }
            for (let x=4;x<5;x++){
                this.blacks.push(new king(x,0,n,false));
                this.whites.push(new king(x,7,n,true));
            } 
        }   
    }
    getpieceat(x,y){
        for (let i of this.whites){
            if (i.x==x && i.y==y)return i;
        }
        for (let i of this.blacks){
            if (i.x==x && i.y==y)return i;
        }
        return null;
    }
    getking(iswhite){
        if (iswhite){
            for (let i of this.whites){
                if (i.type=="King"){
                    return i;
                }
            }
        }
        for (let i of this.blacks){
            if (i.type=="King"){
                return i;
            }
        }
    }
    copy(){
        let whites = [];
        let blacks = [];
        for (let i of this.whites){
            whites.push(i.copy());
        }
        for (let i of this.blacks){
            blacks.push(i.copy());
        }
        let clone = new board(true);
        clone.whites = whites;
        clone.blacks = blacks;
        clone.sıra = this.sıra;
        return clone;
    }
    delpieceat(x,y,iswhite,type="Anything"){
        if (iswhite){
            for (let i=0;i<this.whites.length;i++){
                if (this.whites[i].x==x && this.whites[i].y==y && (type=="Anything" || type==this.whites[i].type)){
                    this.whites.splice(i,1);
                    return ;
                }
            }
        }
        else{
            for (let i=0;i<this.blacks.length;i++){
                if (this.blacks[i].x==x && this.blacks[i].y==y && (type=="Anything" || type==this.blacks[i].type)){
                    this.blacks.splice(i,1);
                    return ;
                }
            }
        }
    }
    addpieceto(piece,x,y,iswhite){
        if (iswhite){this.whites.push(piece);return;}
        else{this.blacks.push(piece);return;}
    }
    moveto(x,y,x2,y2){
        let piece = this.getpieceat(x,y)
        let color = piece.iswhite;
        let result = piece.move(x2,y2,this);
        let piece2;
        for (let i of this.getpieces(color)){
            if (x2==i.x && y2==i.y){
                piece2 = i;
                break;
            }
        }
        if (result){
            this.sıra++;
            this.checkboard(piece2);
            this.moves.push([x,y,x2,y2]);
        }
        return result;
    }
    getpieces(iswhite){
        if (iswhite){return this.whites;}
        return this.blacks;
    }
    checkboard(piece){
        for (let i of this.getpieces(!piece.iswhite)){
            if (i.x==piece.x && i.y==piece.y){
                this.delpieceat(i.x,i.y,!piece.iswhite,i.type);
                break;
            }
        }
    }
    check(){
        return this.getking((this.sıra%2==0)).ischeck(this);
    }
    checkmate(){
        let mate = true;
        for (let i of this.getpieces((this.sıra%2)==0)){
            let moves = i.getposiblemoves(this);
            for (let a of moves){
                if (i.canmove(a,this)){
                    mate=false;
                    break;
                }
            }
            if (!mate){
                break;
            }
        }
        return mate;
    }
    calcscore(){
        let piecess = {};
        for (let type of types){
            for (let color of colors){
                piecess[color+type] = 0;
            }
        }
        for (let i of this.whites){
            if (i.type!="King"){
                piecess["white"+i.type] += 1;
            }
        }
        for (let i of this.blacks){
            if (i.type!="King"){
                piecess["black"+i.type] += 1;
            }
        }
        return piecess;
    }
    calcsumofscore(){
        let score = 0;
        let map = this.calcscore();
        for (let type of types){
            for (let color of colors){
                score += ((allpieces[type]-map[color+type])*values[type])*values[color];
            }
        }
        return score;
    }
}