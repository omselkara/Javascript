let think = 4;
////-----------------Color of ai
let whiteai = false
////-----------------
let calced = [0,0,0,0];
function ai(map){
    let result = minmax(true,true,map,0);
    moveto(result[0],result[1],result[2],result[3]);
}
function minmax(first,ismax,map,step){
    if (step>=think){
        let score = map.calcsumofscore();
        return score;
    }
    calced[step]++;
    if (map.checkmate()){
        if (map.sıra%2==0){
            if (!whiteai){
                return Infinity;
            }
            return -Infinity;
        }
        else{
            if (!whiteai){
                return -Infinity;
            }
            return Infinity;
        }
    }
    let boards = [];
    let color = ismax;
    if (!whiteai){
        color = !ismax
    }
    for (let i of map.getpieces(color)){
        let moves = i.getposiblemoves(map);
        for (let a of moves){
            let clone = map.copy();
            if (clone.moveto(i.x,i.y,a[0],a[1])){
                boards.push(clone);
            }
        }
    }
    let value = Infinity;
    if (ismax){
        value = -Infinity;
        let yer = 0;
        for (let i=0;i<boards.length;i++){
            let result = minmax(false,false,boards[i],step+1);
            if (value<result){
                value = result;
                yer = i;
            }
            else if (value==result && rand(0,1)<=0.33){
                yer = i;
            }
        }
        if (!first){
            return value;
        }
        print(value);
        print(calced);
        return boards[yer].moves[boards[yer].moves.length-1];
    }
    else{
        for (let i of boards){
            value = min(value,minmax(false,true,i,step+1));
        }
        return value;
    }
}