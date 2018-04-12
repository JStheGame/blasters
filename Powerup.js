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