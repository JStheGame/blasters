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
		}

		if(this.y - this.height / 2 > windowHeight) {
			friends.delete(this);
		}
	}

	draw() {
		push();
		stroke(this.r, this.g, this.b);
		strokeWeight(8);
		if(this.powerup) {
			fill(255);
		} else {
			noFill();
		}
		
		rect(this.x, this.y, this.width, this.height, 15);
		pop();
	}
}


class Powerup {
	constructor(x, y) {
		this.type = "speedUp";
		this.x = x;
		this.y = y;
		this.size = 30;
	}

	update() {
		this.y += 1;

		//if eaten, or if off screen, delete
		if(collideRectCircle(paddle.x - paddle.width / 2, 
					paddle.y - paddle.height / 2, 
					paddle.width, paddle.height,
					this.x, this.y, this.size, this.size)) {
			powerups.delete(this);
			paddle.speedUp(0.5);
		}


		if(this.y - 30 > windowHeight) {
			powerups.delete(this);
		}
	}

	draw() {
		push();
		noFill();
		stroke(100 * sin(frameCount) + 155, 120, 120);
		strokeWeight(8);
		ellipse(this.x, this.y, this.size);
		pop();
	}
}