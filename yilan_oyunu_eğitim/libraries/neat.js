let biases,
    weights;
let isload = false;
let mutate = true;
function preload() {
    if (isload){
        biases = loadStrings("bias.txt");
        weights = loadStrings("weight.txt");
    }
}
function load(){
    weights.splice(weights.length-1,1);
    biases.splice(biases.length-1,1);
    for (let i of range(0,biases.length)){
        biases[i] = parseFloat(biases[i]);
    }
    let list1 = [];
    for (let i of range(0,weights.length)){
        list1.push([]);
        let element1 = split(weights[i],",");
        for (let s of range(0,net.genomes[0].neurons[i].length)){
            list1[i].push([]);
            for (let a of range(0,net.genomes[0].neurons[i][s].cons.length)){
                list1[i][s].push(parseFloat(element1[(s*net.genomes[0].neurons[i][s].cons.length)+a]));
            }
        }
    }
    weights = list1;
    for (let i of range(0,net.genomes.length)){
        for (let l of range(0,net.genomes[i].neurons.length)){
            net.genomes[i].biases[l].biass = biases[l];
            for (let n of range(0,net.genomes[i].neurons[l].length)){
                for (let c of range(0,net.genomes[i].neurons[l][n].cons.length)){
                    net.genomes[i].neurons[l][n].cons[c].weight = weights[l][n][c];
                }
            }
        }
    }
}
function saveall(){
    let fitness = net.genomes[0].fitness;
    let yer = 0;
    for (let i of range(1,net.pop)){
        if (net.genomes[i].fitness>fitness){
            fitness = net.genomes[i].fitness;
            yer = i;
        }
    }
    let bias = [],
    weights = [];
    for (let b of range(0,net.genomes[yer].biases.length)){
        bias.push(net.genomes[yer].biases[b].biass);
    }
    for (let a of range(0,net.genomes[yer].neurons.length)){
        weights.push([]);
        for (let o of range(0,net.genomes[yer].neurons[a].length)){
            weights[a].push([]);
            for (let c of range(0,net.genomes[yer].neurons[a][o].cons.length)){
                weights[a][o].push(net.genomes[yer].neurons[a][o].cons[c].weight);
            }
        }
    }
    saveStrings(bias, 'bias.txt');
    saveStrings(weights, 'weight.txt');
}
class network{
    constructor(input,outputs,pop){
        this.inputlen = input;
        this.outputs = outputs;
        this.pop = pop;
        this.generation = 0;
        this.genomes = [];
        for (let i of range(0,pop)){
            this.genomes.push(new genome(this.inputlen,this.outputs));
        }
    }
    calcsumfitness(){
        let sum = 0;
        for (let i of range(0,this.pop)){
            sum += this.genomes[i].fitness;
        }
        return sum;
    }
    calcminfitness(){
        let min = this.genomes[0].fitness;
        for (let i of range(1,this.pop)){
            if (this.genomes[i].fitness<min){
                min = this.genomes[i].fitness;
            }
        }
        return min;
    }
    getbestfitnes(){
        let fitness = this.genomes[0].fitness;
        let yer = 0;
        for (let i of range(1,this.pop)){
            if (this.genomes[i].fitness>fitness){
                fitness = this.genomes[i].fitness;
                yer = i;
            }
        }
        return yer;
    }
    select(){
        this.generation++;
        console.log("Generation:"+this.generation);
        let clone = this.genomes[this.getbestfitnes()].getclone();
        for (let i of range(0,this.pop)){
            for (let b of range(0,this.genomes[i].neurons.length)){
                this.genomes[i].biases[b].biass = clone[0][b];
                for (let n of range(0,this.genomes[i].neurons[b].length)){
                    for (let c of range(0,this.genomes[i].neurons[b][n].cons.length)){
                        this.genomes[i].neurons[b][n].cons[c].weight = clone[1][b][n][c];
                    }
                }
            }
        }
        if (mutate){
            this.mutate();
        }
        for (let i of range(0,this.genomes.length)){
            this.genomes[i].fitness = 0;
        }
    }
    mutate(){
        for (let i of range(0,this.pop)){
            this.genomes[i].mutate();
        }
    }
}
class genome{
    constructor(input,outputs){
        this.inputlen = input;
        this.outputs = outputs;
        this.fitness = 0;
        this.neurons = [];
        this.biases = [];
        this.neurons.push([]);
        for (let i of range(0,this.outputs[0])){
            this.neurons[0].push(new neuron(this.inputlen));
        }
        this.biases.push(new bias());
        for (let i of range(1,this.outputs.length)){
            this.neurons.push([]);
            for (let o of range(0,this.outputs[i])){
                this.neurons[i].push(new neuron(this.outputs[i-1]));
            }
            this.biases.push(new bias());
        }
    }
    activate(inputs){
        let give = [];
        for (let i of inputs){
            give.push(i);
        }
        for (let i of range(0,this.neurons.length)){
            let yeni = [];
            for (let o of range(0,this.neurons[i].length)){
                yeni.push(this.neurons[i][o].output(give,this.biases[i].biass));
            }
            give = yeni;
        }
        return give;
    }
    mutate(){
        for (let i of range(0,this.neurons.length)){
            for (let s of range(0,this.neurons[i].length)){
                this.neurons[i][s].mutate();
            }
        }
        for (let i of range(0,this.biases.length)){
            this.biases[i].mutate();
        }
    }
    getclone(){
        let biases = [];
        let weights = [];
        for (let i of range(0,this.neurons.length)){
            biases.push(this.biases[i].biass);
            weights.push([]);
            for (let n of range(0,this.neurons[i].length)){
                weights[i].push([]);
                for (let c of range(0,this.neurons[i][n].cons.length)){
                    weights[i][n].push(this.neurons[i][n].cons[c].weight);
                }
            }
        }
        return [biases,weights];
    }
}
class neuron{
    constructor(previouslen){
        this.previouslen = previouslen;
        this.cons = [];
        for (let i of range(0,this.previouslen)){
            this.cons.push(new conn());
        }
    }
    output(inputs,bias){
        let sum=0;
        for (let i of range(0,this.previouslen)){
            sum += this.cons[i].out(inputs[i]);
        }
        return Math.tanh(sum+bias);
    }
    mutate(){
        for (let i of range(0,this.cons.length)){
            this.cons[i].mutate();
        }
    }
}
class conn{
    constructor(){
        this.weight = rand(-30,30);
    }
    out(sayı){
        return sayı*this.weight;
    }
    mutate(){
        if (Math.random()<=0.1){
            this.weight = rand(-30,30);
        }
        else{
            if (Math.random()<0.1){
                this.weight = 0;
            }
        }
    }
}
class bias{
    constructor(){
        this.biass = rand(-30,30);
    }
    mutate(){
        if (Math.random()<=0.1){
            this.biass = rand(-30,30);
        }
        else{
            if (Math.random()<0.1){
                this.biass = 0;
            }
        }
    }
}