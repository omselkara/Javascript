class head{
    constructor(){
        this.x = 1;
        this.y = 0;
        this.yön = "sağ";
    }
    show(){
        if (this.yön=="sağ"){
            this.x++;
        }
        if (this.yön=="sol"){
            this.x--;
        }
        if (this.yön=="yukarı"){
            this.y--;
        }
        if (this.yön=="aşağı"){
            this.y++;
        }
        let x1=0,x2=0,y1=0,y2=0;
        if (this.yön=="sağ"){
            x1=0,x2=2,y1=2,y2=0;
            rectangle(x1+xr(this.x),yr(this.y)+y1,xr(this.x)+48+x2,yr(this.y)+48+y2,[0,200,0],[0,0,0],0);
        }
        if (this.yön=="sol"){
            x1=0,x2=2,y1=2,y2=0;
            rectangle(x1+xr(this.x),yr(this.y)+y1,xr(this.x)+48+x2,yr(this.y)+48+y2,[0,200,0],[0,0,0],0);
        }
        if (this.yön=="yukarı"){
            x1=2,x2=0,y1=0,y2=2;
            rectangle(x1+xr(this.x),yr(this.y)+y1,xr(this.x)+48+x2,yr(this.y)+48+y2,[0,200,0],[0,0,0],0);
        }
        if (this.yön=="aşağı"){
            x1=2,x2=0,y1=0,y2=2;
            rectangle(x1+xr(this.x),yr(this.y)+y1,xr(this.x)+48+x2,yr(this.y)+48+y2,[0,200,0],[0,0,0],0);
        }
    }
}
class body{
    constructor(x,y,yön){
        this.x = x;
        this.y = y;
        this.yön = yön;
        this.yapılacak = [];
    }
    show(){
        if (this.yapılacak.length!=0){
            if (this.yapılacak[0][0]==this.x && this.yapılacak[0][1]==this.y){
                this.yön = this.yapılacak[0][2];
                this.yapılacak.splice(0,1);
            }
        }
        if (this.yön=="sağ"){
            this.x++;
        }
        if (this.yön=="sol"){
            this.x--;
        }
        if (this.yön=="yukarı"){
            this.y--;
        }
        if (this.yön=="aşağı"){
            this.y++;
        }
        let x1=0,x2=0,y1=0,y2=0;
        if (this.yön=="sağ"){
            x1 = 0;
            x2 = 2;
            y1 = 2;
            y2 = 0;
            if (this.yapılacak.length>0 && this.yapılacak[0][0] == this.x && this.yapılacak[0][1] == this.y){
                if (this.yapılacak[0][2]=="yukarı"){
                    x1 = 0;
                    x2 = 0;
                    y1 = 0;
                    y2 = 0;
                }
                if (this.yapılacak[0][2]=="aşağı"){
                    x1 = 0;
                    x2 = 0;
                    y1 = 2;
                    y2 = 2;
                }
            }
        }
        if (this.yön=="sol"){
            x1 = 0;
            x2 = 2;
            y1 = 2;
            y2 = 0;
            if (this.yapılacak.length>0 && this.yapılacak[0][0] == this.x && this.yapılacak[0][1] == this.y){
                if (this.yapılacak[0][2]=="yukarı"){
                    x1 = 2;
                    x2 = 2;
                    y1 = 0;
                    y2 = 0;
                }
                if (this.yapılacak[0][2]=="aşağı"){
                    x1 = 2;
                    x2 = 2;
                    y1 = 2;
                    y2 = 2;
                }
            }
        }
        if (this.yön=="yukarı"){
            x1 = 2;
            x2 = 0;
            y1 = 0;
            y2 = 2;
            if (this.yapılacak.length>0 && this.yapılacak[0][0] == this.x && this.yapılacak[0][1] == this.y){
                if (this.yapılacak[0][2]=="sol"){
                    x1 = 0;
                    x2 = 0;
                    y1 = 2;
                    y2 = 2;
                }
                if (this.yapılacak[0][2]=="sağ"){
                    x1 = 2;
                    x2 = 2;
                    y1 = 2;
                    y2 = 2;
                }
            }
        }
        if (this.yön=="aşağı"){
            x1 = 2;
            x2 = 0;
            y1 = 0;
            y2 = 2;
            if (this.yapılacak.length>0 && this.yapılacak[0][0] == this.x && this.yapılacak[0][1] == this.y){
                if (this.yapılacak[0][2]=="sol"){
                    x1 = 0;
                    x2 = 0;
                    y1 = 0;
                    y2 = 0;
                }
                if (this.yapılacak[0][2]=="sağ"){
                    x1 = 2;
                    x2 = 2;
                    y1 = 0;
                    y2 = 0;
                }
            }
        }
        rectangle(x1+xr(this.x),yr(this.y)+y1,xr(this.x)+48+x2,yr(this.y)+48+y2,[0,255,0],[0,0,0],0);
    }
}
class food{
    constructor(){
        this.x = parseInt(rand(0,26.999999999999999999));
        this.y = parseInt(rand(0,14.999999999999999999));
    }
    show(){
        rectangle(xr(this.x)+20,yr(this.y),xr(this.x)+30,yr(this.y)+20,[34,177,76],[0,0,0],0);
        rectangle(xr(this.x)+20,yr(this.y)+30,xr(this.x)+30,yr(this.y)+50,[34,177,76],[0,0,0],0);
        rectangle(xr(this.x),yr(this.y)+20,xr(this.x)+20,yr(this.y)+30,[34,177,76],[0,0,0],0);
        rectangle(xr(this.x)+30,yr(this.y)+20,xr(this.x)+50,yr(this.y)+30,[34,177,76],[0,0,0],0);
    }
}