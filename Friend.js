class Friend {
	constructor(width, height) {
		this.x = random(width / 2, windowWidth - width / 2);
		this.y = -height;
		this.width = width;
		this.height = height;
		this.r = random(100, 200) + 55;
		this.g = random(100, 200) + 55;
		this.b = random(100, 200) + 55;
		this.powerup = random(0, 10) > 9;
		this.speed = 1;
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
			if(this.powerup) {
				powerups.add(new Powerup(this.x, this.y));
			}
			friends.delete(this);

			// get points
			score += 100 + (100 - this.width) + (100 - this.height);

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

		// check fror collision with the paddle
		if(collideRectRect(this.x - this.width / 2, this.y - this.height / 2,
			this.width, this.height,
			paddle.x - paddle.width / 2, paddle.y - paddle.height / 2,
			paddle.width, paddle.height)) {
			// ur dead
			alert("you died good job");
			noLoop();
		}

		// despawn the friend if it makes it offscreen
		if(this.y - this.height / 2 > windowHeight) {
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


