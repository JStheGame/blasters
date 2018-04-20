// constants
const screenWidth = 700;
const screenHeight = 850;

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
let hiScore;
let difficulty = 0;
let level = 1;
let gameActive = true;
const keys = {};

function increaseScore(howMuch) {
	if(gameActive) {
		score += howMuch;
		level = Math.floor(score / 1000) + 1;
	}
}

function gameOver() {
	// splode the paddle
	const colour = paddle.getColour();
	splosions.add(new Splosion(paddle.x, paddle.y, colour, 20));
	gameActive = false;
}

function reset() {
	// check for hi score
	if(score > hiScore) {
		hiScore = score;
	}

	// reset all gameplay elements
	rumbling = 0;
	score = 0;
	difficulty = 0;
	level = 1;
	gameActive = true;
	for(const code in keys) {
		keys[code] = 0;
	}

	// reset all sprites
	bg = new Background(200);
	paddle = new Paddle();
	spaceBall = new SpaceBall(30);
	friends.clear();
	powerups.clear();
	splosions.clear();
}

window.addEventListener("keydown", ({which}) => {
	keys[which] = 1;

	// z key press
	if(which === 90) {
		paddle.dash();
	}

	// enter key press
	if(which === 13 && !gameActive) {
		reset();
	}
})

window.addEventListener("keyup", ({which}) => {
	keys[which] = 0;
})

// runs once, when the page is ready
function setup() {
	createCanvas(screenWidth, screenHeight);
	noSmooth();
	rectMode(CENTER);

	// load from localStorage eventually
	hiScore = 0;
	reset();
}

// this function gets called every frame, 
// and it updates the position of all the sprites
function update() {
	// add 1 friend every second; eventually speed this up as score increases
	if(frameCount % (60 - level * 5) === 0) {
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
	// display the hi score
	textSize(20);
	text("hi: " + Math.floor(hiScore), 40, 100);
	pop();

	// flash the game over screen if the game's over
	if(!gameActive) {
		// screem dimmer
		push();
		//filter(BLUR, 3)
		fill("rgba(0, 0, 0, 0.5)");
		noStroke();
		rect(screenWidth / 2, screenHeight / 2, screenWidth, screenHeight)
		pop();

		// gameover text
		push();
		fill(255);
		noStroke();
		textFont("monospace");
		textSize(50);
		textStyle(BOLD);
		textAlign(CENTER);
		text("you died good job", screenWidth / 2, screenHeight / 2 - 30)
		
		textSize(20);
		text("press enter", screenWidth / 2, screenHeight / 2 + 30)
		
		if(score > hiScore) {
			text("hey you did a hi score!!", screenWidth / 2, screenHeight / 2 - 90)
		}
		pop();
	}
}




