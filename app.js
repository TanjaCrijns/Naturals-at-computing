function randomRange(min,max) {
    return Math.floor(Math.random() * (max-min+1) + min);
}

class SubRegionMutation {
    constructor(minSize, maxSize, sourceImage) {
        this.minSize = minSize;
        this.maxSize = maxSize;
        this.width = sourceImage.width;
        this.height = sourceImage.height;
        this.sourceData = sourceImage.data;
    }

    mutate(image) {
        let patchWidth = randomRange(this.minSize, this.maxSize);
        let patchHeight = randomRange(this.minSize, this.maxSize);
        let xSource = randomRange(0, this.width - patchWidth);
        let ySource = randomRange(0, this.height - patchHeight);
        let xDest = randomRange(0, image.width - patchWidth);
        let yDest = randomRange(0, image.height - patchHeight);

        for (let yy = 0; yy < patchHeight; yy++) {
            for (let xx = 0; xx < patchWidth; xx++) {
                image.data[((xx+xDest) + (yy+yDest) * image.width) * 4 + 1] = this.sourceData[((xx+xSource) + (yy+ySource) * image.width) * 4 + 1]
                image.data[((xx+xDest) + (yy+yDest) * image.width) * 4 + 2] = this.sourceData[((xx+xSource) + (yy+ySource) * image.width) * 4 + 2]
                image.data[((xx+xDest) + (yy+yDest) * image.width) * 4 + 0] = this.sourceData[((xx+xSource) + (yy+ySource) * image.width) * 4 + 0]
            }
        }

    }
}

class Img {

    constructor(ctx, image) {
        this.imageData = ctx.getImageData(0, 0, image.width, image.height);
        console.log(this.imageData);
        this.data = this.imageData.data;
        this.width = image.width;
        this.height = image.height;
        this.ctx = ctx;
    }

    show() {
        this.ctx.putImageData(this.imageData, 0, 0);
    }

    drawRect(rect) {
        // krijgt rectangle, tekent die op plaatje
    }

}

class GeneticAlgorithm {

    constructor(populationSize, fitnessFunction, crossoverRate, mutationRate, targetImage) { // en nog wat meer parameters
		this.populationSize = populationSize;
		this.fitnessFunction = fitnessFunction;
		this.crossoverRate = crossoverRate;
		this.mutationRate = mutationRate;
		this.targetImage = targetImage;
		this.population = new Population();
    }

    run(stopping_criterion) {
        // draai algorithme
		while (!stopping_criterion){
			// parents <- selectparents(population)
			//childern <- []
			//for(parent1,parent2 <- parents)
				//child1, child2 <- crossover(parent1, parent2, crossoverRate)
				//children <- mutate(child1,mutationRate)
				//children <- mutate(child2, mutationRate)
		}
		evaluatePop();
		bestSolution = getBestSolution();
		//this.population = replace(this.population,children);
    }
	
    rouletteSelection(numberOfParents) {
        let totalFitness = 0;
        let proportionList = [];
        let individuals = population.getSortedIndividuals();
        let parents = [];

        for (let i = 0; i < individuals.length; i++) {
            totalFitness += individuals[i].getFitness();   
        }
        for (let j = 0; j < individuals.length; j++) {
            proportionList.push(individuals[j].getFitness() / totalFitness);
        }
        for (let k = 0; k < numberOfParents; k++) {
            let idx = selectByProportion(proportionList);
            parents.push(individuals[idx]);
            individuals.splice(idx, 1);
            proportionList.splice(idx, 1);
        }

        return parents;

    }

    selectByProportion(proportionList) {
        let randomNumber = randomRange(0,1);
        let choice = null;
        for (let i = 0; i < proportionList.length; i++) {
            randomNumber -= proportionList[i]
            if (randomNumber <= 0) {
                choice = i ;
                break; 
            }
        }
        return choice;
    }


	initializePop() {
		// initaliseer populatie
		this.population.initializePop(this.populationSize);
	}
	
	evaluatePop() {
		// evalueer populatie
		individuals = this.population.getPopulation();
		for (var i = 0; j < individuals.length; i++) {
			individual = individuals[i];
			individualImage = individual.getImage();
			individualFitness = fitness(this.targetImage,individualImage);
			individual.setFitness(individualFitness);
			if (individualFitness > this.population.max.fitness) {
				this.population.setPopulationMax(individualFitness,individualImage);
			}
		}
	}
	
	getBestSolution() {
		// bepaal beste resultaat in de populatie
		return this.population.getPopulationMax();
	}
	
}

class Population {
	
	constructor() {
		this.individuals = [];
		this.max = {img: "image_object", fitness: 0};
	}
	
	initializePop(populationSize) {
		for (var i = 1; i <= this.populationSize; i++) {
			var individual = new Individual();
			this.individuals.push(individual);
		}
	}
	
	getPopulation() {
		return this.individuals;
	}
	
	setPopulation(individuals) {
		this.individuals = individuals;
	}
	
	setPopulationMax(maxFitness,img) {
		this.max.fitness = maxFitness;
		this.max.img = img;
	}
	
	getPopulationMax() {
		return this.max;
	}
	
}

class Individual{
	
	constructor() {
		this.image = new Image();
		this.fitness = 0;
	}
	
	setFitness(newFitness) {
		this.fitness = newFitness;
	}

	getFitness() {
		return this.fitness;
	}
	
	getImage() {
		return this.image;
	}
	
}

function distance(img1, img2) {
    let distance = 0;
    for (i = 0; i < img1.data.length; i++) {
        distance += Math.abs(img1.data[i] - img2.data[i]);
    }
    return distance;
}

function fitness(img1, img2) {
    let fitness = 1 - distance(img1,img2)/(255*4*img1.height*img1.width);
    return fitness;
}

let srcCanvas = document.getElementById('sourceImage');
let attemptCanvas = document.getElementById('attempt')
let destCanvas = document.getElementById('destImage');

let width = 400;
let height = 400;

// meuk code om de plaatjes in te laden, roept main aan als het klaar is
let arjen = new Image();
let elena = new Image();
arjen.onload = () => {
    let ctx = srcCanvas.getContext('2d');
    srcCanvas.width = width;
    srcCanvas.height = height;
    arjen.width = width;
    arjen.height = height;
    ctx.drawImage(arjen, 0, 0, width, height);

    attemptCanvas.width = width;
    attemptCanvas.height = height;

    window.sourceImage = new Img(ctx, arjen);

    elena.onload = () => {
        let ctx = destCanvas.getContext('2d');
        destCanvas.width = width;
        destCanvas.height = height;
        elena.width = width;
        elena.height = height;
        ctx.drawImage(elena, 0, 0, width, height);
        attemptCtx = attemptCanvas.getContext('2d');
        attemptCtx.fillRect(0, 0, width, height);
        attemptImage = new Img(attemptCtx, attemptCanvas);

        window.destImage = new Img(ctx, elena);
        main();
    };
    elena.src = 'elena.png';

};
arjen.src = 'arjen.png';



function main() {
    mutation = new SubRegionMutation(50, 100, sourceImage);
    for (let i = 0; i < 100; i++) {        
        mutation.mutate(attemptImage);
        attemptImage.show();
    }
}
