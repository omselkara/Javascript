class dot{
    constructor(){
        this.x = 300;
        this.y = 560;
        this.best = 560;
        this.velx = 0;
        this.vely = 0;
    }
    move(){
        this.x += this.velx;
        this.y += this.vely;
        if (this.y<this.best){
            this.best = this.y;
        }
    }
    show(){
        fill(0);
        strokeWeight(0);
        ellipse(this.x,this.y,5);
    }
}