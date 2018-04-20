class Blaster {
	constructor(x, y) {
		this.x = x;
		this.y = y;
		this.width = 10;
		this.height = 10;
		this.speed = 10;
	}

	update() {
		// increase the y position
		this.y -= this.speed;

		// check for collision with spaceBall
		if(collideRectCircle(this.x - this.width / 2, 
			this.y - this.height / 2, 
			this.width, this.height, 
			spaceBall.x, spaceBall.y, spaceBall.size)) {
			spaceBall.dy = -Math.abs(spaceBall.dy) - 1;

			// despawn the blaster
			blasters.delete(this);
		}

		// check if it went off screen
		if(this.y + 20 < 0) {
			blasters.delete(this);
		}
	}

	draw() {
		push();
		noFill();
		stroke(255);
		strokeWeight(4);
		triangle(this.x - this.width / 2, this.y, 
			this.x + this.width / 2, this.y, 
			this.x, this.y - this.height);
		pop();
	}
}