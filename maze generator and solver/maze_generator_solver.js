let w = 20;
let game = [];
let çözüm;
let sıra = 0;
function setup(){
    createCanvas(800,800);
    pg = createGraphics(800,800);
    game = generate(0,0,w);
    çözüm = solve(game,0,0,parseInt(width/w)-1,parseInt(height/w)-1);
    rectangle(0,0,800,800,[255,255,255],[0,0,0],1);
    for (let y of range(0,parseInt(height/w))){
        for (let x of range(0,parseInt(width/w))){
            pg.textSize(10)
            pg.stroke(0);
            pg.strokeWeight(1);
            if (game[y][x][0]){
                pg.line(x*w,y*w,x*w,y*w+w);
            }
            if (game[y][x][1]){
                pg.line(x*w+w,y*w,x*w+w,y*w+w);
            }
            if (game[y][x][2]){
                pg.line(x*w,y*w,x*w+w,y*w);
            }
            if (game[y][x][3]){
                pg.line(x*w,y*w+w,x*w+w,y*w+w);
            }
        }
    }
    rectangle((parseInt(width/w)-1)*w,(parseInt(height/w)-1)*w,(parseInt(width/w)-1)*w+w,(parseInt(height/w)-1)*w+w,[0,255,0],[0,0,0],0);
}

function draw(){
    rectangle(çözüm[sıra][0]*w,çözüm[sıra][1]*w,çözüm[sıra][0]*w+w,çözüm[sıra][1]*w+w,[255,0,0],[0,0,0],0);
    image(pg,0,0);
    if (sıra<çözüm.length-1){
        sıra++;
    }
}