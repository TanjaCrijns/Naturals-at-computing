images = [
    'Elena',
    'Arjen',
    'Monalisa',
    'Trump',
];

let sourceImageSelector = document.getElementById('source-image-selection');
let targetImageSelector = document.getElementById('target-image-selection');

for (image of images) {
    let soption = document.createElement('option');
    soption.value = image.toLowerCase() + '.png';
    soption.text = image;
    let toption = document.createElement('option');
    toption.value = image.toLowerCase() + '.png';
    toption.text = image;
    sourceImageSelector.appendChild(soption);
    targetImageSelector.appendChild(toption);
}

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

    constructor(ctx, width, height, imageData) {
        this.imageData = imageData;
        this.data = imageData.data;
        this.width = width;
        this.height = height;
        this.ctx = ctx;
    }

    show() {
        this.ctx.putImageData(this.imageData, 0, 0);
    }

    copy() {
        let imageData = this.ctx.createImageData(this.width, this.height)
        let newImage = new Img(this.ctx, this.width, this.height, imageData);
        return newImage;
    }

}

class GeneticAlgorithm {

    constructor(populationSize, fitnessFunction, targetImage, sourceImage, attemptImage) {
		this.populationSize = populationSize;
		this.fitnessFunction = fitnessFunction;
		this.crossoverRate = crossoverRate;
		this.mutationRate = mutationRate;
		this.targetImage = targetImage;
		this.population = new Population(attemptImage);
    }

    run() {
		initializePop();
		this.population.evaluatePop();
		
		numberOfParents = 20;
		numberOfChildren = this.populationSize/numberOfParents;
		populationCount = 0;
		while (this.population.getPopulationMax < 0.99){
			parents = rouletteSelection(numberOfParents);
			childern = [];
			for(var i = 1; i <= parents.length; i++) {
				for(var j = 1; j <=numberOfChildren; j++){
					populationCount = populationCount++;
					copyAttemptImage = parents[i].getImage();
					mutate(copyAttemptImage);
					child = new Individual(populationCount,copyAttemptImage,parents[i].getFitness());
					children.append(child);
				}
			}
			this.population.setPopulation(children);
			this.population.evaluatePop();
			bestSolution = getBestSolution();
			bestSolution.img.show();
			populationCount = 0;
		}
		evaluatePop();
		bestSolution = getBestSolution();
    }
	

	mutate(copyAttemptImage) {
		subRegionMutator = new subRegionMutation(10, 20, this.sourceImage);
		subRegionMutator.mutate(copyAttemptImage)
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

    eliteSelection(numberOfParents) {
        let individuals = population.getSortedIndividuals();
        return individuals.slice(0,numberOfParents);
    }

    tournamentSelection(numberOfParents, tournamentSize) {
        let individuals = population.getSortedIndividuals();
        let parents = [];
		for (var i = 0; i < numberOfParents; i++) {
            let gladiators = [];
            let gladiatorIDXs = [];
		    for (var j = 0; j < tournamentSize; j++) {
                randomNumber = randomRange(0, population.populationSize);
                gladiators.push(individuals[randomNumber].getFitness());
                gladiatorIDXs.push(randomNumber);
            }
            let max = gladiators[0];
            let maxIDX = gladiatorIDXs[0]
            for (var k = 0; k < gladiators.length; k++) {
                if (gladiators[k] > max) {
                    max = gladiators[k];
                    maxIDX = gladiatorIDXs[k];
                }
            }
            parents.push(individuals[maxIDX]);
        }
        return parents
    }

	initializePop() {
		// initaliseer populatie
		this.population.initializePop(this.populationSize);
		individuals = this.population.getPopulation();
		for(var i = 1; i <= individuals.length; i++) {
			copyAttemptImage = individuals[i].getImage();
			mutate(copyAttemptImage);
		}
	}
	
	evaluatePop() {
		// evalueer populatie
		individuals = this.population.getPopulation();
		for (var i = 0; j < individuals.length; i++) {
			individual = individuals[i];
			individualImage = individual.getImage();
			individualFitness = fitnessFunction(this.targetImage,individualImage);
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
	
	constructor(attemptImage) {
		this.individuals = [];
		this.copyImage = attemptImage.copy();
		this.max = {img: this.copyImage, fitness: 0};
	}
	
	initializePop(populationSize) {
		for (var i = 1; i <= this.populationSize; i++) {
			var individual = new Individual(i,this.copyImage,0);
			entry = [i,individual]
			this.individuals.push(entry);
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
	
	sortFitnessScores(){
		scores = [];
		for (var i = 1; i <= this.individuals.length; i++) {
			score = this.individuals[i].getFitness();
			id = this.individuals[i].getId();
			entry = [id,score];
			scores.push(entry)
		}
		scores = scores.sort(function(a,b){return a[1]>b[1];});
		return scores;
	}
	
	getSortedIndividuals() {
		sortedIndividuals = [];
		sortedScores = sortFitnessScores();
		for(var i = 1; i <= sortedScores.length; i++) {
			[id,score] = sortedScores[i];
			for(var j = 1; j <= this.individuals.length; j++) {
				[individual_id,individual] = this.individuals[j];
				if (id == individual_id) {
					sortedIndividuals.push(individual);
				}
			}
		}
		return sortedIndividuals;
	}
	
}

class Individual{
	
	constructor(id, copyAttemptImage, fitness) {
		this.id = id;
		this.image = copyAttemptImage;
		this.fitness = fitness;
	}
	
	
	getId() {
		return this.id;
	}
	
	setId(id) {
		this.id = id;
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
	
	setImage(img) {
		this.image = img;
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

let width = 300;
let height = 300;

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

    window.sourceImage = new Img(ctx, width, height, ctx.getImageData(0, 0, width, height));

    elena.onload = () => {
        let ctx = destCanvas.getContext('2d');
        destCanvas.width = width;
        destCanvas.height = height;
        elena.width = width;
        elena.height = height;
        ctx.drawImage(elena, 0, 0, width, height);
        attemptCtx = attemptCanvas.getContext('2d');
        attemptCtx.fillRect(0, 0, width, height);
        attemptImage = new Img(attemptCtx, width, height, attemptCtx.getImageData(0, 0, width, height));

        window.destImage = new Img(ctx, width, height, ctx.getImageData(0, 0, width, height));
        main();
    };
    elena.src = 'elena.png';

};
arjen.src = 'arjen.png';



function main() {
    mutation = new SubRegionMutation(10, 20, sourceImage);
    for (let i = 0; i < 1000; i++) {        
        mutation.mutate(attemptImage);
        attemptImage.show();
    }
}

function startAlgorithm() {
	ga = new GeneticAlgorithm(100,fitness,elena,arjen,attemptImage);
	
}
