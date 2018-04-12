class SpaceBall {
	constructor(size) {
		this.x = 100;
		this.y = 100;
		this.dx = 5;
		this.dy = -5;
		this.size = size;
	}

	update() {
		this.x += this.dx;
		this.y += this.dy;

		if(this.x - this.size / 2 < 0) {
			this.x = this.size / 2;
			this.dx *= -1;
		}

		if(this.x + this.size / 2 > windowWidth) {
			this.x = windowWidth - this.size / 2;
			this.dx *= -1;
		}

		if(this.y - this.size / 2 < 0) {
			this.y = this.size / 2;
			this.dy *= -1;
		}

		if(this.y - this.size / 2 > windowHeight) {
			alert("you died good job");
			noLoop();
		}

		if (collideRectCircle(paddle.x - paddle.width / 2, 
					paddle.y - paddle.height / 2, 
					paddle.width, paddle.height,
					this.x, this.y, this.size, this.size)) {
			const yVelocity = this.dy;
			const xVelocity = this.dx;

			//gain some momentum from the paddle
			this.dy = -Math.abs(this.dy) + paddle.dy / 2;
			this.dx += paddle.dx / 2;

			//recoil the paddle a bit
			paddle.dy += yVelocity / 2;
			paddle.dx += xVelocity / 2;
			rumbling = Math.sqrt(this.dx ** 2 + this.dy ** 2) / 10;
		}
	}

	draw() {
		push();

		noFill();
		stroke(255);
		strokeWeight(8);
		ellipse(this.x, this.y, this.size, this.size);

		pop();
	}
}