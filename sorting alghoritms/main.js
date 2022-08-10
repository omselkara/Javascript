let values = [];
let framecount = 0;
function setup() {
    createCanvas(800,800);
    frameRate(Infinity);
    let sayılar = [];
    for (let i=0;i<width;i++){
        sayılar.push(i);
    }
    while (sayılar.length!=0){
        let yer = Math.floor(random(sayılar.length-0.0000000000000000001));
        values.push(sayılar[yer]);
        sayılar.splice(yer,1);
    }
}

function draw() {
    background(0);
    stroke(255);
    for (let i=0;i<values.length;i++){
        line(i,800,i,800-values[i]);
    }
    list = sort_func(values);
    values = list[0];
    if (list[1]){
        noLoop();
        alert("Bitti. "+framecount+" döngüde bitirdi.")
    }
    framecount++;
}
function sort_func(values){
    let bitti = true;
    for (let i=1;i<values.length;i++){
        if (values[i]<values[i-1]){
            bitti = false;
            let x = values[i];
            let y = values[i-1];
            values[i-1] = x;
            values[i] = y;
        }
    }
    return [values,bitti];
}

/*function sort_func(values){
    let yer = framecount;
    for (let i=framecount+1;i<values.length;i++){
        if (values[i]<values[yer]){
            yer = i;
        }
    }
    let x = values[yer];
    let y = values[framecount];
    values[yer] = y;
    values[framecount] = x;
    let bitti = false;
    if (framecount>=width){
        bitti = true;
    }
    return [values,bitti];
}
*/

