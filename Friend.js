class Friend {
	constructor(width, height) {
		this.x = random(width / 2, screenWidth - width / 2);
		this.y = -height;
		this.width = width;
		this.height = height;
		this.r = Math.floor(random(100, 200) + 55);
		this.g = Math.floor(random(100, 200) + 55);
		this.b = Math.floor(random(100, 200) + 55);
		// add a powerup 10% of the time
		this.powerup = random(0, 10) > 9;
		this.speed = random(0.5, 1.5);
	}

	update() {
		// move the friend down according to its speed
		this.y += this.speed;

		// check for collision with the spaceBall
		if(collideRectCircle(this.x - this.width / 2, 
			this.y - this.height / 2, 
			this.width, this.height,
			spaceBall.x, spaceBall.y, 
			spaceBall.size, spaceBall.size)) {

			// splode
			const colour = `rgb(${this.r}, ${this.g}, ${this.b})`;
			const velocity = Math.sqrt(spaceBall.dx ** 2 + spaceBall.dy ** 2);
			splosions.add(new Splosion(this.x, this.y, colour, velocity));

			// drop a powerup if you've got one
			if(this.powerup) {
				powerups.add(new Powerup(this.x, this.y));
			}

			friends.delete(this);

			// get points
			increaseScore(100 + (100 - this.width) + (100 - this.height));

			// bounce the spaceBall
			const line1 = this.height * (spaceBall.x - this.x) 
				+ this.width * (this.y - spaceBall.y);
			const line2 = -this.height * (spaceBall.x - this.x) 
				+ this.width * (this.y - spaceBall.y);
			const zone = line1 * line2;

			if(zone > 0) spaceBall.dy *= -1;
			else if(zone < 0) spaceBall.dx *= -1;
			else if(zone === 0) {
				const [deltaX, deltaY] = [spaceBall.x - this.x, 
										  spaceBall.y - this.y];
				spaceBall.dx = Math.abs(spaceBall.dx) * Math.sign(deltaX);
				spaceBall.dy = Math.abs(spaceBall.dy) * Math.sign(deltaY);
			}

			// rumble the screen a bit
			rumbling += Math.sqrt(spaceBall.dx ** 2 + spaceBall.dy ** 2) / 40;
		}

		// check for collision with the paddle
		if(collideRectRect(this.x - this.width / 2, this.y - this.height / 2,
			this.width, this.height,
			paddle.x - paddle.width / 2, paddle.y - paddle.height / 2,
			paddle.width, paddle.height) && gameActive) {
			// ur dead
			gameOver();
		}

		// despawn the friend if it makes it offscreen
		if(this.y - this.height > screenHeight) {
			friends.delete(this);
		}
	}

	draw() {
		push();
		stroke(this.r, this.g, this.b);
		strokeWeight(8);

		// make it flashy if it has a powerup;
		if(this.powerup) fill(100 * sin(frameCount / 2) + 155);
		else noFill();
		
		rect(this.x, this.y, this.width, this.height, 15);
		pop();
	}
}


