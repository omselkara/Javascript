class car{
    constructor(x,y,turnrate){
        this.turnrate = turnrate;
        this.zero = new p5.Vector(x,y);
        this.points = [new p5.Vector(-20,-30),
                       new p5.Vector(+20,-30),
                       new p5.Vector(+20,+30),
                       new p5.Vector(-20,+30),
                       new p5.Vector(-20,-30),
                       new p5.Vector(-5 ,-30),
                       new p5.Vector(-5 ,-20),
                       new p5.Vector(-20,-20),
                       new p5.Vector(+20,-30),
                       new p5.Vector(+5 ,-30),
                       new p5.Vector(+5 ,-20),
                       new p5.Vector(+20,-20),
                       new p5.Vector(-15,-15),
                       new p5.Vector(+15,-15),
                       new p5.Vector(+15,+20),
                       new p5.Vector(-15,+20),];
        this.movedat = frameCount;
        this.dots = [];
        this.angle = 0;
        this.dead = false;
    }
    show(){
        this.rotate_car();
        fill(255,0,0);
        stroke(0);
        strokeWeight(1);
        beginShape();
        for (let i=0;i<4;i++){
            vertex(this.dots[i].x,this.dots[i].y);
        }
        vertex(this.dots[0].x,this.dots[0].y);
        endShape();
        fill(200,200,0);
        beginShape();
        for (let i=4;i<8;i++){
            vertex(this.dots[i].x,this.dots[i].y);
        }
        vertex(this.dots[4].x,this.dots[4].y);
        endShape();
        beginShape();
        for (let i=8;i<12;i++){
            vertex(this.dots[i].x,this.dots[i].y);
        }
        vertex(this.dots[8].x,this.dots[8].y);
        endShape();
        noFill();
        strokeWeight(2);
        beginShape();
        for (let i=12;i<16;i++){
            vertex(this.dots[i].x,this.dots[i].y);
        }
        vertex(this.dots[12].x,this.dots[12].y);
        endShape();
    }
    rotate_car(){
        this.dots = [];
        for (let i=0;i<this.points.length;i++){
            this.dots.push(new p5.Vector.add(this.rotation(this.points[i].copy()),this.zero));
        }
    }
    rotation(a){
        return new p5.Vector(a.x*cos(radians(this.angle+90))-a.y*sin(radians(this.angle+90)),a.x*sin(radians(this.angle+90))+a.y*cos(radians(this.angle+90)));
    }
    move(dir){
        if (!this.dead){
            if (dir=="w"){
                this.zero.x += cos(radians(this.angle))*5;
                this.zero.y += sin(radians(this.angle))*5;
            }
            else{
                this.zero.x -= cos(radians(this.angle))*5;
                this.zero.y -= sin(radians(this.angle))*5;
            }
        }
    }
    turn(dir){
        if (!this.dead){
            if (dir=="a"){
                this.angle -= this.turnrate;
            }
            else{
                this.angle += this.turnrate;
            }
        }
    }
    collide(wall1){
        let colide = false;
        let x1 = wall1[0];
        let x2 = wall1[2];
        let y1 = wall1[1];
        let y2 = wall1[3];
        let lines = [];
        for (let a=0;a<3;a++){
            lines.push([this.dots[a].x,this.dots[a].y,this.dots[a+1].x,this.dots[a+1].y]);
        }
        lines.push([this.dots[3].x,this.dots[3].y,this.dots[0].x,this.dots[0].y]);
        for (let a=0;a<4;a++){
            let x3 = lines[a][0];
            let x4 = lines[a][2];
            let y3 = lines[a][1];
            let y4 = lines[a][3];
            let denominator = (x1-x2)*(y3-y4)-(y1-y2)*(x3-x4);
            if (denominator==0){

            }
            else{
                let t = ((x1-x3)*(y3-y4)-(y1-y3)*(x3-x4))/denominator;
                let u = ((x2-x1)*(y1-y3)-(y2-y1)*(x1-x3))/denominator;
                if (t>=0 && t<=1 && u>=0 && u<=1){
                    colide = true;
                    break;
                }
            }
        }
        return colide;
    }
    inputs(walls,distance=true){
        let look = [0+this.angle,45+this.angle,90+this.angle,270+this.angle,315+this.angle];
        let targets = [];
        for (let angle of look){
            let closest = Infinity;
            let xy;
            for (let i of walls){
                let duvar = [i.x1,i.y1,i.x2,i.y2];
                let target = this.cast(duvar,angle);
                if (target!=null){
                    if (dist(this.zero.x,this.zero.y,target[0],target[1])<closest){
                        closest = dist(this.zero.x,this.zero.y,target[0],target[1]);
                        xy = target;
                    }
                }
            }
            if (distance){
                targets.push(dist(this.zero.x,this.zero.y,xy[0],xy[1]));
            }
            else{
                targets.push(xy)
            }
        }
        return targets;
    }
    cast(i,angle){
        let x1 = i[0];
        let x2 = i[2];
        let y1 = i[1];
        let y2 = i[3];
        let x3 = this.zero.x;
        let x4 = this.zero.x+cos(radians(angle));
        let y3 = this.zero.y;
        let y4 = this.zero.y+sin(radians(angle));
        let denominator = (x1-x2)*(y3-y4)-(y1-y2)*(x3-x4);
        if (denominator==0){
            return null;
        }
        let t = ((x1-x3)*(y3-y4)-(y1-y3)*(x3-x4))/denominator;
        let u = ((x2-x1)*(y1-y3)-(y2-y1)*(x1-x3))/denominator;
        if (t>=0 && t<=1 && u>=0) {
            let x = x1+t*(x2-x1);
            let y = y1+t*(y2-y1);
            return [x,y];
        }
        else{
            return null;
        }
    }
}