class SubRegionMutation {
    constructor(min_size, max_size, sourceImage) {

    }

    mutate(image) {
        // pak subregion uit sourceImage
        // en plak die op image

    }
}

class Img {

    constructor(ctx, image) {
        this.data = ctx.getImageData(0, 0, image.width, image.height);
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

    constructor(populationSize, fitnessFunction) { // en nog wat meer parameters

    }

    run() {
        // draai algorithme
    }

}

function distance(img1, img2) {
    // bereken sum((img1 - img2)^2)
    let distance = 0;
    let temp = 0;
    for (i = 0; i < img1.length; i++) {
        temp = (img1[i] - img2[i])
        distance += temp * temp
    }
    return distance
}

function fitness(img1, img2) {
    let fitness = distance(img1,img2)/(255*4*img1.length*img1.width)
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
}
