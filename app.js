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
}

function fitness(img1, img2) {
    // schaal distance naar [0, 1] waarbij 1=goed
}

let srcCanvas = document.getElementById('sourceImage');
let attemptCanvas = document.getElementById('attempt')
let destCanvas = document.getElementById('destImage');


// meuk code om de plaatjes in te laden, roept main aan als het klaar is
let arjen = new Image();
arjen.onload = () => {
    let ctx = srcCanvas.getContext('2d');
    srcCanvas.width = arjen.width;
    srcCanvas.height = arjen.height;
    ctx.drawImage(arjen, 0, 0);

    attemptCanvas.width = arjen.width;
    attemptCanvas.height = arjen.height;

    window.sourceImage = new Img(ctx, arjen);

    let elena = new Image();
    elena.onload = () => {
        let ctx = destCanvas.getContext('2d');
        destCanvas.width = elena.width;
        destCanvas.height = elena.height;
        ctx.drawImage(elena, 0, 0);

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
