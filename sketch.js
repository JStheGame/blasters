// sprite variables
let bg;
let paddle;
let spaceBall;
const friends = new Set();
const powerups = new Set();
const splosions = new Set();

// gameplay variables
let rumbling = 0;
let score;
const keys = {};

function increaseScore(howMuch) {
	score += howMuch;
}

window.addEventListener("keydown", ({which}) => {
	keys[which] = 1;

	if(which === 90) {
		paddle.dash();
	}
})

window.addEventListener("keyup", ({which}) => {
	keys[which] = 0;
})

// runs once, when the page is ready
function setup() {
	createCanvas(windowWidth, windowHeight);
	noSmooth();
	rectMode(CENTER);
	bg = new Background(200);
	paddle = new Paddle();
	spaceBall = new SpaceBall(30);
	score = 0;
}

// this function gets called every frame, 
// and it updates the position of all the sprites
function update() {
	// add 1 friend every second; eventually speed this up as score increases
	if(frameCount % 60 === 0) {
		friends.add(new Friend(random(20, 100), random(20, 100)));
	}

	// update all the sprites
	bg.update();
	paddle.update();
	spaceBall.update();
	friends.forEach(friend => {
		friend.update();
	});
	powerups.forEach(powerup => {
		powerup.update();
	});
	splosions.forEach(splosion => {
		splosion.update();
	});
}

// this function fires every frame
function draw() {
	update();

	// paint the background black
	background(0);

	// handle the rumbling
	translate(spaceBall.x, spaceBall.y);
	rotate(rumbling * (sin(frameCount * 2) * PI / 90));
	translate(-spaceBall.x, -spaceBall.y);
	rumbling *= 0.9;

	// draw all the sprites
	bg.draw();
	paddle.draw();
	spaceBall.draw();
	friends.forEach(friend => {
		friend.draw();
	})
	powerups.forEach(powerup => {
		powerup.draw();
	})
	splosions.forEach(splosion => {
		splosion.draw();
	});

	// display the score
	push();
	fill(255);
	textSize(48);
	textFont('monospace');
	textStyle(BOLD);
	text(Math.floor(score), 40, 70);
	pop();
}




