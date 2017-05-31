function randomRange(min,max) {
    return Math.random() * (max-min+1) + min;
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
        let width = Math.random()
        let x1 = Math.random() * (this.width - this.maxSize) 

    }
}

class Img {

    constructor(ctx, image) {
        this.data = ctx.getImageData(0, 0, image.width, image.height).data;
        this.width = image.width;
        this.height = image.height;
    }

    show() {
        // teken op canvas dmv context: ctx.setImageData
    }

    drawRect(rect) {
        // krijgt rectangle, tekent die op plaatje
    }

}

class GeneticAlgorithm {

    constructor(populationSize, fitnessFunction, crossoverRate, mutationRate) { // en nog wat meer parameters
		this.populationSize = populationSize;
		this.fitnessFunction = fitnessFunction;
		this.crossoverRate = crossoverRate;
		this.mutationRate = mutationRate;
    }

    run() {
        // draai algorithme
    }
	
	initializePop() {
		// initaliseer populatie
	}
	
	evaluatePop() {
		// evalueer populatie
	}
	
	
	
}

function distance(img1, img2) {
    // bereken sum((img1 - img2)^2)
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

    let elena = new Image();
    elena.onload = () => {
        let ctx = destCanvas.getContext('2d');
        destCanvas.width = width;
        destCanvas.height = height;
        elena.width = width;
        elena.height = height;
        ctx.drawImage(elena, 0, 0, width, height);

        window.destImage = new Img(ctx, elena);
        main();
    };
    elena.src = 'elena.png';

};
arjen.src = 'arjen.png';



function main() {
    console.log(sourceImage);
    console.log(destImage);
    console.log(fitness(sourceImage, destImage))
}
