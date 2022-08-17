const title = document.querySelector('h1');
let dots;
let mouseRadius = 150;
let dotBasicSize = 40;
let dotBiggerSize = 60;
let dotCurSize = dotBasicSize;
let backgroundColor;
let mouseColor = {r: 0, g: 0, b: 255};


let rows, cols;
let gapBetweenCircles = 80;

function setup() {
	let cnv = createCanvas(windowWidth, windowHeight);
	cnv.parent('canvas');

	backgroundColor = '#000';

	rows = floor(windowHeight / ((dotCurSize/2) + gapBetweenCircles));
	cols = floor(windowWidth / ((dotCurSize/2) + gapBetweenCircles));

	dots = createDots(rows, cols);
}

function draw() {
	background(backgroundColor);
	noStroke();
	fill(mouseColor.r, mouseColor.g, mouseColor.b);
	circle(mouseX, mouseY, mouseRadius);

	fill('#fff')
	drawDots();
}


function windowResized() {
	rows = floor(windowHeight / ((dotCurSize/2) + gapBetweenCircles));
	cols = floor(windowWidth / ((dotCurSize/2) + gapBetweenCircles));
	dots = createDots(rows, cols);
  resizeCanvas(windowWidth, windowHeight);
}

function createDots(rows, cols) {
	dots = Array.from(Array(rows), () => new Array(cols));

	let y = dotCurSize + dotCurSize /2;
	for (let i = 0; i < rows; i++){
		let x = dotCurSize + dotCurSize/2;
		for (let j = 0; j < cols; j++) {
			dots[i][j] = new Dot(x, y, dotBasicSize, {r: 255, g: 255, b: 255});
			x += dotCurSize/2 + gapBetweenCircles;
		}
		y += dotCurSize/2 + gapBetweenCircles;
	}
	
	return dots;
}

function drawDots() {
	dots.forEach(row => {
		row.forEach(dot => {
			dotCurSize = isColliding(dot.x, dot.y, dot.getSize()/2, mouseX, mouseY, mouseRadius) ? dotBiggerSize : dotBasicSize;
			dot.setSize(dotCurSize);
			dot.draw();
		});
	});
}


/**
 * function that detects if two circles are colliding
 * @param {number} x1 x coordinate of first circle 
 * @param {number} y1 y coordinate of first circle 
 * @param {number} r1 radius of first circle
 * @param {number} x2 x coordinate of second circle 
 * @param {number} y2 y coordinate of second circle 
 * @param {number} r2 radius of second circle
 * @returns number
 */
function isColliding(x1, y1, r1, x2, y2, r2) {
	let dx = x2 - x1;
	let dy = y2 - y1;
	let d = sqrt(dx*dx + dy * dy);
	return d <= r1 + r2;
}

function mousePressed() {
	backgroundColor = floor(random(255));
	mouseColor = {
		r: floor(random(255)),
		g: floor(random(255)),
		b: floor(random(255))
	}
	title.style.color = `rgba(${mouseColor.r}, ${mouseColor.g}, ${mouseColor.b}, ${random(.4, 1)})`;
	let r = floor(random(255));
	let g = floor(random(255));
	let b = floor(random(255));
	let newColor = {r, g, b};
	dots.forEach(row => {
		row.forEach(dot => {
			dot.setColor(newColor);
		});
	});
}
