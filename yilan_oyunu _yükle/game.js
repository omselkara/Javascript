class game{
    constructor(x,y,row,col,size,means){
        this.x1 = x;
        this.y1 = y;
        this.x2 = x+col*size;
        this.y2 = y+row*size;
        this.sayısı = 0;
        this.row = row;
        this.col = col;
        this.means = means;
        this.size = size;
        this.fitness = 0;
        this.harita = [];
        this.head = new head();
        this.gövdeler = [];
        this.gövdeler.push(new body(0,0,"sağ"));
        this.pixs = [];
        this.food = new food(this.col,this.row);
        this.dead = false;
        for (let y of range(0,this.row)){
            this.harita.push([]);
            this.pixs.push([]);
            for (let x of range(0,this.col)){
                this.harita[y].push(0);
                this.pixs[y].push(new pix(this.x1,this.y1,x,y,this.size));
                }
            }
        this.harita[0][1] = 1;
    }
    show(){
        rectangle(this.x1,this.y1,this.x2,this.y2,this.means[0],[0,0,0],1);
        if (!this.dead){
            this.sayısı++;
            rectangle(this.head.x*this.size+this.x1,this.head.y*this.size+this.y1,(this.head.x+1)*this.size+this.x1,(this.head.y+1)*this.size+this.y1,[50,50,50],[0,0,0],0);
            for (let i of this.gövdeler){
                rectangle(i.x*this.size+this.x1,i.y*this.size+this.y1,(i.x+1)*this.size+this.x1,(i.y+1)*this.size+this.y1,[50,50,50],[0,0,0],0);
            }
            rectangle(this.food.x*this.size+this.x1,this.food.y*this.size+this.y1,(this.food.x+1)*this.size+this.x1,(this.food.y+1)*this.size+this.y1,[200,0,0],[0,0,0],0);
            this.harita[this.head.y][this.head.x] = 0;
            this.head.move();
            this.harita[this.food.y][this.food.x] = 100;
            if (this.head.x<0 || this.head.x>=this.col || this.head.y<0 || this.head.y>=this.row || this.harita[this.head.y][this.head.x]==1){
                this.dead = true;
            }
            if (!this.dead){
                this.harita[this.head.y][this.head.x] = 1;
                if (this.head.x==this.food.x && this.head.y==this.food.y){
                    this.sayısı -=100;
                    let chose = []; 
                    for (let y of range(0,20)){
                        for (let x of range(0,20)){
                            if (this.harita[y][x] == 0);
                                chose.push([x,y]);    
                        }
                    }
                    let yer = chose[parseInt(rand(0,chose.length))];
                    this.food.x = yer[0];
                    this.food.y = yer[1];
                    this.fitness++;
                    let x = this.gövdeler[this.gövdeler.length-1].x;
                    let y = this.gövdeler[this.gövdeler.length-1].y;
                    if (this.gövdeler[this.gövdeler.length-1].yön=="sağ"){
                        x--;
                    }
                    if (this.gövdeler[this.gövdeler.length-1].yön=="sol"){
                        x++;
                    }
                    if (this.gövdeler[this.gövdeler.length-1].yön=="aşağı"){
                        y--;
                    }
                    if (this.gövdeler[this.gövdeler.length-1].yön=="yukarı"){
                        y++;
                    }
                    this.gövdeler.push(new body(x,y,this.gövdeler[this.gövdeler.length-1].yön));
                    for (let yap of this.gövdeler[this.gövdeler.length-2].yapilcak){
                        this.gövdeler[this.gövdeler.length-1].yapilcak.push(yap);
                    }
                }
                if (!this.dead){
                    for (let gövde of this.gövdeler){
                        if (gövde.x>=0 && gövde.x<this.col && gövde.y>=0 && gövde.y<this.row){
                            this.harita[gövde.y][gövde.x] = 0;
                        }
                        gövde.move();
                        if (gövde.x>=0 && gövde.x<this.col && gövde.y>=0 && gövde.y<this.row){
                            this.harita[gövde.y][gövde.x] = 1;
                        }
                    }
                }
            }
        }
        else{
            textSize(this.size*3);
            fill(0);
            text(this.gövdeler.length-1,(this.x1+this.x2)/2,(this.y1+this.y2)/2);
        }
    }
    press(event){
        if (event=='d' && this.head.yön!="sol"){
            this.head.yön = "sağ"
        }
        if (event=='a' && this.head.yön!="sağ"){
            this.head.yön = "sol"
        }
        if (event=='w' && this.head.yön!="aşağı"){
            this.head.yön = "yukarı"
        }
        if (event=='s' && this.head.yön!="yukarı"){
            this.head.yön = "aşağı"
        }
    }
}
class head{
    constructor(){
        this.x = 1;
        this.y = 0;
        this.yön = "sağ";
    }
    move(){
        if (this.yön == "sağ"){
            this.x++;
        }
        if (this.yön == "sol"){
            this.x--;
        }
        if (this.yön == "yukarı"){
            this.y--;
        }
        if (this.yön == "aşağı"){
            this.y++;
        }
    }
}
class body{
    constructor(x,y,yön){
        this.x = x;
        this.y = y;
        this.yön = yön;
        this.yapilcak = [];
    }
    move(){
        if (this.yapilcak.length>0){
            if (this.yapilcak[0][0]==this.x && this.yapilcak[0][1]==this.y){
                this.yön = this.yapilcak[0][2];
                this.yapilcak.splice(0,1);
            }
        }
        if (this.yön == "sağ"){
            this.x++;
        }
        if (this.yön == "sol"){
            this.x--;
        }
        if (this.yön == "yukarı"){
            this.y--;
        }
        if (this.yön == "aşağı"){
            this.y++;
        }
    }
}
class food{
    constructor(col,row){
        this.x = parseInt(rand(0,col));
        this.y = parseInt(rand(0,row));
    }
}
class pix{
    constructor(x,y,row,col,size){
        this.x1 =  x+row*size;
        this.y1 =  y+col*size;
        this.x2 = this.x1+size;
        this.y2 = this.y1+size;
        this.rgb = [255,255,255];
    }
    show(){
        rectangle(this.x1,this.y1,this.x2,this.y2,this.rgb,[0,0,0],0);
    }
}
