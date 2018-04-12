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
	}

	update() {
		this.y += 1;

		if(collideRectCircle(this.x - this.width / 2, 
			this.y - this.height / 2, 
			this.width, this.height,
			spaceBall.x, spaceBall.y, 
			spaceBall.size, spaceBall.size)) {

			//splode
			if(this.powerup) {
				powerups.add(new Powerup(this.x, this.y));
			}
			friends.delete(this);

			//get points
			score += 100 + (100 - this.width) + (100 - this.height);

			//bounce the spaceBall
			const line1 = this.height * (spaceBall.x - this.x) 
				+ this.width * (this.y - spaceBall.y);
			const line2 = -this.height * (spaceBall.x - this.x) 
				+ this.width * (this.y - spaceBall.y);
			const zone = line1 * line2;

			if(zone >= 0) spaceBall.dy *= -1;
			if(zone <= 0) spaceBall.dx *= -1;
		}

		if(collideRectRect(this.x - this.width / 2, this.y - this.height / 2,
			this.width, this.height,
			paddle.x - paddle.width / 2, paddle.y - paddle.height / 2,
			paddle.width, paddle.height)) {
			//ur dead
			alert("you died good job");
			noLoop();
		}

		if(this.y - this.height / 2 > windowHeight) {
			friends.delete(this);
		}
	}

	draw() {
		push();
		stroke(this.r, this.g, this.b);
		strokeWeight(8);
		if(this.powerup) fill(255);
		else noFill();
		
		rect(this.x, this.y, this.width, this.height, 15);
		pop();
	}
}


