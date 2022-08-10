function my_map(sayı,min1,max1,min2,max2){
    let aralık1 = Math.abs(min1)+max1;
    let aralık2 = Math.abs(min2)+max2;
    let üs = sayı-min1;
    let sonuç = min2+(üs/(aralık1/aralık2));
    return sonuç;   
}
function rand(min,max){
    return Math.random() *((max)-min)+min;
}
function my_max(list){
    let yer = 0;
    let sayı = list[0];
    for (let i of range(1,list.length)){
        if (list[i]>sayı){
            yer = i;
            sayı = list[i];
        }
    }
    return yer;
}
function my_min(list){
    let yer = 0;
    let sayı = list[0];
    for (let i of range(1,list.length)){
        if (list[i]<sayı){
            yer = i;
            sayı = list[i];
        }
    }
    return yer;
}
function range(min,max){
    let list = [];
    for (let i=min;i<max;i++){
        list.push(i);
    }
    return list;
}
function rectangle(x1,y1,x2,y2,fillwith=[0,0,0],strokewith=[0,0,0],width=1){
    fill(fillwith[0],fillwith[1],fillwith[2]);
    strokeWeight(width);
    stroke(strokewith[0],strokewith[1],strokewith[2]);
    beginShape();
    vertex(x1,y1);
    vertex(x2,y1);
    vertex(x2,y2);
    vertex(x1,y2);
    vertex(x1,y1);
    endShape();
}