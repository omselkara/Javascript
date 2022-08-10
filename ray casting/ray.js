class ray{
    constructor(angle){
        this.x = cos(radians(angle))
        this.y = sin(radians(angle))
    }
    cast(x,y,wall){
        let x1 = wall.x1;
        let x2 = wall.x2;
        let y1 = wall.y1;
        let y2 = wall.y2;
        let x3 = x;
        let x4 = x+this.x;
        let y3 = y;
        let y4 = y+this.y;
        let denominator = (x1-x2)*(y3-y4)-(y1-y2)*(x3-x4);
        if (denominator==0){
            return null;
        }
        let t = ((x1-x3)*(y3-y4)-(y1-y3)*(x3-x4))/denominator;
        let u = ((x2-x1)*(y1-y3)-(y2-y1)*(x1-x3))/denominator;
        if (t > 0 && t < 1 && u > 0) {
            let x = x1+t*(x2-x1);
            let y = y1+t*(y2-y1);
            return [x,y];
        }
        else{
            return null;
        }
    }
}