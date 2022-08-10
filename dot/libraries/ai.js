class network{
    constructor(pop){
        this.pop = pop;
        this.genomes = [];
        for (let i of range(0,this.pop)){
            this.genomes.push(new genome(100));
        }
    }
    maxoffit(){
        let fitness = this.genomes[0].fitness;
        for (let i of range(1,this.pop)){
            if (this.genomes[i].fitness>fitness){
                fitness = this.genomes[i].fitness;
            }
        }
        return fitness;
    }
    minoffit(){
        let fitness = this.genomes[0].fitness;
        for (let i of range(1,this.pop)){
            if (this.genomes[i].fitness<fitness){
                fitness = this.genomes[i].fitness;
            }
        }
        return fitness;
    }
    sumoffit(){
        let sum = 0;
        for (let i of range(1,this.pop)){
            sum += this.genomes[i].fitness;
        }
        return sum;
    }
    select(){
        let yedek = [];
        let fit;
        for (let i of range(0,this.pop)){
            fit = rand(this.minoffit(),this.maxoffit());
            for (let a of range(0,this.pop)){
                if (this.genomes[a].fitness>=fit){
                    yedek.push(this.genomes[a].getclone());
                    break;
                }
            }
        }
        for (let i of range(0,this.pop)){
            this.genomes[i].setclone(yedek[i]);
            this.genomes[i].fitness = 0;
            this.genomes[i].finish = false;
            this.genomes[i].step = 0;
        }
    }
}
class genome{
    constructor(size){
        this.size = size;
        this.finish = false;
        this.step = 0;
        this.fitness = 0;
        this.outs = [];
        this.newout();
    }
    newout(){
        this.outs = [];
        for (let i of range(0,this.size)){
            this.outs.push(parseInt(rand(0,360)));
        }
        this.step = 0;
    }
    activate(){
        this.step++;
        if (this.step-1<this.size){
            return this.outs[this.step-1];
        }
        else{
            this.step = 1;
            this.finish = true;
            return this.outs[0];
        }
    }
    getclone(){
        return this.outs;
    }
    setclone(clone){
        this.size += 25;
        this.newout();
        for (let i of range(0,clone.length)){
            this.outs[i] = clone[i];
        }
        this.mutate();
    }
    mutate(){
        if (rand(0,1)<=0.01){
            for (let i of range(0,this.size)){
                this.outs[i] = parseInt(rand(0,360));
            } 
        }
        else{
            for (let i of range(0,this.size)){
                if (rand(0,1)<=0.01){
                    this.outs[i] = parseInt(rand(0,360));
                }
            }
        }
    }
}