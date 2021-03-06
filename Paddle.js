class Paddle {
	constructor() {
		this.x = screenWidth / 2;
		this.y = 3 * screenHeight / 4;
		this.dx = 0;
		this.dy = 0;
		this.speed = 1;
		this.dashSpeed = 30;
		this.width = 200;
		this.height = 25;
	}

	speedUp(howMuch) {
		this.speed = constrain(this.speed + howMuch, 0.5, 10);
	}

	embiggen(howMuch) {
		this.width = constrain(this.width + howMuch, 25, screenWidth);
	}

	dash() {
		if(keys[37]) this.dx -= this.dashSpeed;
		if(keys[38]) this.dy -= this.dashSpeed;
		if(keys[39]) this.dx += this.dashSpeed;
		if(keys[40]) this.dy += this.dashSpeed;
	}

	blast() {
		if(blasters.size < blasterLimit && gameActive) {
			blasters.add(new Blaster(paddle.x - 10, paddle.y - paddle.height / 2));
			blasters.add(new Blaster(paddle.x + 10, paddle.y - paddle.height / 2));
		}
	}

	getColour() {
		const [r, g, b] = [
			200 * (1 - (this.y / screenHeight)) + 55, 
			100 * (sin(frameCount / 10) + 1) + 55, 
			100 * (-sin(frameCount / 3) + 1) + 55
		].map(x => Math.floor(x));
		return `rgb(${r}, ${g}, ${b})`;
	}

	update() {
		// listen for keyboard inputs, speed up in the direction of input
		if(keys[37]) this.dx -= this.speed;
		if(keys[38]) this.dy -= this.speed;
		if(keys[39]) this.dx += this.speed;
		if(keys[40]) this.dy += this.speed;

		// update the paddle position
		this.x += this.dx;
		this.y += this.dy;

		// make sure the paddle doesn't go off screen
		this.x = constrain(this.x, this.width / 2, screenWidth - this.width / 2);
		this.y = constrain(this.y, this.height / 2, screenHeight - this.height / 2);
		
		// decay the velocity (friction)
		this.dx *= 0.85;
		this.dy *= 0.85;
	}	

	draw() {
		if(gameActive) {
			push();
			stroke(this.getColour());
			strokeWeight(8);
			noFill();
			rect(this.x, this.y, this.width, this.height, 15);
			pop();
		}
	}
}