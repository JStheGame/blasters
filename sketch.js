let bg;
let paddle;
let spaceBall;
const friends = new Set();
const powerups = new Set();
let rumbling = 0;
let score;

function setup() {
	createCanvas(windowWidth, windowHeight);
	noSmooth();
	rectMode(CENTER);
	bg = new Background(100);
	paddle = new Paddle();
	spaceBall = new SpaceBall(30);
	score = 0;
}

function update() {
	if(frameCount % 60 === 0) {
		friends.add(new Friend(random(20, 100), random(20, 100)));
	}

	bg.update();
	paddle.update();
	spaceBall.update();
	friends.forEach(friend => {
		friend.update();
	})
	powerups.forEach(powerup => {
		powerup.update();
	})
}

function draw() {
	update();

	background(0);
	translate(spaceBall.x, spaceBall.y);
	rotate(rumbling * (sin(frameCount) * PI / 90));
	translate(-spaceBall.x, -spaceBall.y);

	bg.draw();
	paddle.draw();
	spaceBall.draw();
	friends.forEach(friend => {
		friend.draw();
	})
	powerups.forEach(powerup => {
		powerup.draw();
	})

	push();
	fill(255);
	text(Math.floor(score), 50, 50)

	pop();

	rumbling *= 0.9;
}




