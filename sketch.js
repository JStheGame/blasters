let bg;
let paddle;
let spaceBall;
const friends = new Set();
const powerups = new Set();
let rumbling = 0;

function setup() {
	createCanvas(windowWidth, windowHeight);
	noSmooth();
	rectMode(CENTER);
	bg = new Background(300);
	paddle = new Paddle();
	spaceBall = new SpaceBall(30);
	friends.add(new Friend(30, 50));
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

	rumbling *= 0.9;
}




