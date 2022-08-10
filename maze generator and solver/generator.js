let ters = {
    "d":"a",
    "a":"d",
    "w":"s",
    "s":"w"
}
function generate(x,y,w){
    let finish = false;
    let yapıcı = new generator(x,y,w);
    let sayı = 0;
    while (true){
        if (yapıcı.finished()){
            break;
        }
        else{
            yapıcı.run();   
        }
    }
    return yapıcı.harita.get_clone();
}

class generator{
    constructor(x,y,w){
        this.harita = new harita(parseInt(height/w),parseInt(width/w));
        this.x = x;
        this.y = y;
        this.row = parseInt(height/w);
        this.col = parseInt(width/w);
        this.yapılanlar = [];
        this.w = w;
        this.harita.harita[this.y][this.x].visited = true;
    }
    finished(){
        return this.harita.visited_all();
    }
    run(){
        let listofmoves = [];
        //console.log(this.x,this.y,this.harita.harita[this.y][this.x]);
        if (this.x>0){
            if (!((this.harita.harita[this.y][this.x-1]).visited)){
                listofmoves.push("a");
            }
        }
        if (this.x<this.col-1){
            if (!((this.harita.harita[this.y][this.x+1]).visited)){
                listofmoves.push("d");
            }
        }
        if (this.y>0){
            if (!((this.harita.harita[this.y-1][this.x]).visited)){
                listofmoves.push("w");
            }
        }
        if (this.y<this.row-1){
            if (!((this.harita.harita[this.y+1][this.x]).visited)){
                listofmoves.push("s");
            }
        }
        if (listofmoves.length==0){
            if (ters[this.yapılanlar[this.yapılanlar.length-1]]=="a"){
                this.x--;
            }
            if (ters[this.yapılanlar[this.yapılanlar.length-1]]=="d"){
                this.x++;
            }
            if (ters[this.yapılanlar[this.yapılanlar.length-1]]=="w"){
                this.y--;
            }
            if (ters[this.yapılanlar[this.yapılanlar.length-1]]=="s"){
                this.y++;
            }
            this.yapılanlar.pop();
        }
        else{
            let selected = listofmoves[parseInt(parseInt(rand(0,(listofmoves.length-1)+0.99999999999999999999)))];
            this.yapılanlar.push(selected);
            if (selected=="a"){
                this.harita.harita[this.y][this.x].sol = false;
                this.x--;
                this.harita.harita[this.y][this.x].sağ = false;
                this.harita.harita[this.y][this.x].visited = true;
            }
            if (selected=="d"){
                this.harita.harita[this.y][this.x].sağ = false;
                this.x++;
                this.harita.harita[this.y][this.x].sol = false;
                this.harita.harita[this.y][this.x].visited = true;
            }
            if (selected=="w"){
                this.harita.harita[this.y][this.x].yukarı = false;
                this.y--;
                this.harita.harita[this.y][this.x].aşağı = false;
                this.harita.harita[this.y][this.x].visited = true;
            }
            if (selected=="s"){
                this.harita.harita[this.y][this.x].aşağı = false;
                this.y++;
                this.harita.harita[this.y][this.x].yukarı = false;
                this.harita.harita[this.y][this.x].visited = true;
            }
        }
    }
}
class harita{
    constructor(row,col){
        this.row = row;
        this.col = col;
        this.harita = [];
        for (let y of range(0,this.row)){
            this.harita.push([]);
            for (let x of range(0,this.col)){
                this.harita[y].push(new cell());
            }
        }
    }
    visited_all(){
        let a = true;
        for (let y of range(0,this.row)){
            for (let x of range(0,this.col)){
                if (this.harita[y][x].visited==false){
                    a = false;
                    break;
                }
            }
            if (!a){
                break;
            }
        }
        return a;
    }
    get_clone(){
        let a = [];
        for (let y of range(0,this.row)){
            a.push([]);
            for (let x of range(0,this.col)){
                a[y].push([this.harita[y][x].sol,this.harita[y][x].sağ,this.harita[y][x].yukarı,this.harita[y][x].aşağı]);
            }
        }
        return a;
    }
}
class cell{
    constructor(){
        this.sol = true;
        this.sağ = true;
        this.yukarı = true;
        this.aşağı = true;
        this.visited = false;
    }
}