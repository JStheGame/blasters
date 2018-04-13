class Paddle {
	constructor() {
		this.x = windowWidth / 2;
		this.y = 3 * windowHeight / 4;
		this.dx = 0;
		this.dy = 0;
		this.speed = 1;
		this.width = 200;
		this.height = 30;
	}

	speedUp(howMuch) {
		this.speed += howMuch;
	}

	embiggen(howMuch) {
		this.width += howMuch;
	}

	update() {
		// listen for keyboard inputs, speed up in the direction of input
		if(keyIsDown(LEFT_ARROW)) {
			this.dx -= this.speed;
		}

		if(keyIsDown(RIGHT_ARROW)) {
			this.dx += this.speed;
		}

		if(keyIsDown(UP_ARROW)) {
			this.dy -= this.speed;
		}

		if(keyIsDown(DOWN_ARROW)) {
			this.dy += this.speed;
		}

		// update the paddle position
		this.x += this.dx;
		this.y += this.dy;

		// make sure the paddle doesn't go off screen
		this.x = constrain(this.x, this.width / 2, windowWidth - this.width / 2);
		this.y = constrain(this.y, this.height / 2, windowHeight - this.height / 2);
		
		// decay the velocity (friction)
		this.dx *= 0.85;
		this.dy *= 0.85;
	}	

	draw() {
		push();
		stroke(200 * (1 - (this.y / windowHeight)) + 55, 
			100 * (sin(frameCount / 10) + 1) + 55, 
			100 * (-sin(frameCount / 3) + 1) + 55);
		strokeWeight(8);
		noFill(60)
		rect(this.x, this.y, this.width, this.height, 15);
		pop();
	}
}