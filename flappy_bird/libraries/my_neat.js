function rand(min,max){
    return Math.random() *(max-min)+min;
}
let isload = false;
function reset(){
    birds = [],
    pipes = [],
    skor = 0,
    pipeno = 0;
    for (let i=0;i<pop;i++){
        birds.push(new bird(i));
    }
    frame=0;
    if (!isload){
        nets.train();
    }
}
let biases,
    weights;
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
        for (let s of range(0,nets.genomes[0].neurons[i].length)){
            list1[i].push([]);
            for (let a of range(0,nets.genomes[0].neurons[i][s].cons.length)){
                list1[i][s].push(parseFloat(element1[(s*nets.genomes[0].neurons[i][s].cons.length)+a]));
            }
        }
    }
    weights = list1;
    nets.weights = weights;
    nets.bias = biases;
    nets.değiş=0;
    nets.train(true);
}
function saveall(){
    let bias = [],
        weights = [];
    for (let b of range(0,nets.bias.length)){
        bias.push(nets.bias[b]);
    }
    for (let a of range(0,nets.weights.length)){
        weights.push([]);
        for (let o of range(0,nets.weights[a].length)){
            weights[a].push([]);
            for (let c of range(0,nets.weights[a][o].length)){
                weights[a][o].push(nets.weights[a][o][c]);
            }
        }
    }
    saveStrings(bias, 'bias.txt');
    saveStrings(weights, 'weight.txt');
}
function range(min,max){
    let list = [];
    for (let i=min;i<max;i++){
        list.push(i);
    }
    return list;
}
class net{
    constructor(inputs,neurons,pop){
        this.input = inputs;
        this.generation = 0;
        this.neurons = neurons;
        this.pop = pop;
        this.genomes = [];
        this.bias = [];
        this.weights = [];
        this.değiş = 1;
        this.best = -99999999;
        for (let i of range(0,this.pop)){
            this.genomes.push(new genome(this.input,this.neurons));
        }
    }
    train(isloaded,learnrate=0.2){
        if (!isloaded){
            for (let i of range(0,this.genomes.length)){
                if (this.genomes[i].fitness>this.best){
                    this.değiş = 1;
                }
            }
        }
        if (this.değiş==1){
            let fitness = -9999999999999,
                yer = 0;
            this.weights = [];
            this.bias = [];
            for (let i of range(0,this.genomes.length)){
                if (this.genomes[i].fitness>fitness){
                    yer = i;
                    fitness = this.genomes[i].fitness;
                }
            }
	        print("Best fitness changed to "+fitness);
            for (let b of range(0,this.genomes[yer].biases.length)){
                this.bias.push(this.genomes[yer].biases[b].bias);
            }
            for (let a of range(0,this.genomes[yer].neurons.length)){
                this.weights.push([]);
                for (let o of range(0,this.genomes[yer].neurons[a].length)){
                    this.weights[a].push([]);
                    for (let c of range(0,this.genomes[yer].neurons[a][o].cons.length)){
                        this.weights[a][o].push(this.genomes[yer].neurons[a][o].cons[c].weight);
                    }
                }
            }
            this.değiş = 0;
            this.best = fitness;
        }
        if (!isloaded){
            for (let i of range(0,this.genomes.length)){
                for (let b of range(0,this.genomes[i].biases.length)){
                    this.genomes[i].biases[b].bias = this.bias[b]+rand(-30*learnrate,30*learnrate);
                }
                for (let a of range(0,this.genomes[i].neurons.length)){
                    for (let o of range(0,this.genomes[i].neurons[a].length)){
                        for (let c of range(0,this.genomes[i].neurons[a][o].cons.length)){
                            this.genomes[i].neurons[a][o].cons[c].weight = this.weights[a][o][c]+rand(-30*learnrate,30*learnrate);
                        }
                    }
                }
                this.genomes[i].fitness = 0;
                if (i<this.genomes.length/10){
                    this.genomes[i] = new genome(this.input,this.neurons);
                }
            }
            this.generation += 1;
            print("Generation:"+this.generation);
        }
        else{
            for (let i of range(0,this.genomes.length)){
                for (let b of range(0,this.genomes[i].biases.length)){
                    this.genomes[i].biases[b].bias = this.bias[b];
                }
                for (let a of range(0,this.genomes[i].neurons.length)){
                    for (let o of range(0,this.genomes[i].neurons[a].length)){
                        for (let c of range(0,this.genomes[i].neurons[a][o].cons.length)){
                            this.genomes[i].neurons[a][o].cons[c].weight = this.weights[a][o][c];
                        }
                    }
                }
            }
        }
    }
}
class genome{
    constructor(inputs,neurons){
        this.input = inputs;
        this.neuron = neurons;
        this.biases = [];
        this.neurons = [];
        this.fitness = 0;
        this.eski = 0;
        this.neurons.push([]);
        this.biases.push(new bias());
        for (let a of range(0,this.neuron[0])){
            this.neurons[0].push(new neuron(this.input));
        }
        for (let i of range(1,this.neuron.length)){
            this.neurons.push([]);
            this.biases.push(new bias());
            for (let a of range(0,this.neuron[i])){
                this.neurons[i].push(new neuron(this.neurons[i-1].length));
            }
        }
    }
    activate(input){
        let give = input;
        let yeni;
        for (let i of range(0,this.neurons.length)){
            yeni = [];
            for (let a of range(0,this.neurons[i].length)){
                yeni.push(this.neurons[i][a].activate(give,this.biases[i].bias))
            }
            give = yeni;
        }
        return give;
    }
}
class neuron{
    constructor(previouslen){
        this.previouslen = previouslen;
        this.cons = [];
        for (let _ of range(0,this.previouslen)){
            this.cons.push(new conn());
        }
    }
    activate(inputs,bias){
        let sum = 0;
        for (let i of range(0,this.previouslen)){
            sum += this.cons[i].out(inputs[i]);
        }
        return Math.tanh(sum+bias);
    }
}
class bias{
    constructor(){
        this.bias = rand(-30,30);
    }
}
class conn{
    constructor(){
        this.weight = rand(-30,30);
    }
    out(input){
        return this.weight*input;
    }
}