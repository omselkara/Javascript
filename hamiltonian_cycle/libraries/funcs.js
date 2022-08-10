function my_map(sayı,min1,max1,min2,max2){
    let aralık1 = Math.abs(min1)+max1;
    let aralık2 = Math.abs(min2)+max2;
    let üs = sayı-min1;
    let sonuç = min2+(üs/(aralık1/aralık2));
    return sonuç;   
}
function rand(min,max){
    return my_map(Math.random(),0,1,min,max+0.99999999999999999999999999999999999999999999999);
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
function shuffle(list){
    a = [];
    for (let i of list){
        a.push(i);
    }
    b = [];
    while (b.length!=list.length){
        let yer = parseInt(rand(0,a.length-1));
        b.push(a[yer]);
        a.splice(yer,1);
    }
    return b;
}
function olasılık(ihtimaller,uzunluk,New=[]){
    let liste = [];
    for (let i of range(0,New.length)){
        liste.push(New[i]);
    }
    let sayı = 1;
    if (New.length==0){
        for (let i of ihtimaller){
            liste.push([i]);
        }
        sayı = 0;
    }
    for (let i of range(1-sayı,uzunluk)){
        let yeni = [];
        for (let a of liste){
            for (let ihtimal of ihtimaller){
                ekle = JSON.parse(JSON.stringify(a));
                ekle.push(ihtimal);
                yeni.push(ekle);
            }
        }
        liste = [];
        for (let i of range(0,yeni.length)){
            liste.push(yeni[i]);
        }
    }
    return liste
}