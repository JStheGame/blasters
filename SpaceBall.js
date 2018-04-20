const maxSpeed = 20;

class SpaceBall {
	constructor(size) {
		this.x = 100;
		this.y = 100;
		this.dx = 5;
		this.dy = -5;
		this.size = size;
	}

	embiggen(howMuch) {
		this.size += howMuch;
	}

	freeze() {
		this.dx = 0;
		this.dy = 0;
	}

	update() {
		// limit the speed
		if(this.dx > maxSpeed) this.dx = (this.dx - maxSpeed) * 0.5 + maxSpeed;
		if(this.dy > maxSpeed) this.dy = (this.dy - maxSpeed) * 0.5 + maxSpeed;

		// store last frame's position
		const lastX = this.x;
		const lastY = this.y;

		// change position based on velocity
		this.x += this.dx;
		this.y += this.dy;

		// check for wall bounces
		// left wall
		if(this.x - this.size / 2 < 0) {
			this.x = this.size / 2;
			this.dx *= -1;
		}
		// right wall
		if(this.x + this.size / 2 > screenWidth) {
			this.x = screenWidth - this.size / 2;
			this.dx *= -1;
		}
		// top wall (ceiling)
		if(this.y - this.size / 2 < 0) {
			this.y = this.size / 2;
			this.dy *= -1;
		}

		// game over if the ball goes off the bottom of the screen
		if(this.y - this.size > screenHeight && gameActive) {
			gameOver();
		}

		// check for collision with the paddle
		

		// experimental new idea
		/*
		if(paddle.x - paddle.width / 2 <= this.x 
		   && this.x <= paddle.x + paddle.width / 2
		   && paddle.y + paddle.height / 2 <= this.y + this.size / 2
		   && paddle.y + paddle.height / 2 > lastY + this.size / 2) {
			this.dy = -Math.abs(this.dy);
			rumbling += Math.sqrt(this.dx ** 2 + this.dy ** 2) / 10;
		}
		*/
			


		// old collision style
		if (collideRectCircle(paddle.x - paddle.width / 2, 
					paddle.y - paddle.height / 2, 
					paddle.width, paddle.height,
					this.x, this.y, this.size, this.size) && gameActive) {
			const yVelocity = this.dy;
			const xVelocity = this.dx;

			// find the difference between the centers of the paddle and spaceBall
			const [distX, distY] = [paddle.x - this.x, paddle.y - this.y]
			const [deltaX, deltaY] = [distX, distY]
									 .map(delta => Math.sign(delta));

			const line1 = paddle.height * (this.x - paddle.x) 
				+ paddle.width * (paddle.y - this.y);
			const line2 = -paddle.height * (this.x - paddle.x) 
				+ paddle.width * (paddle.y - this.y);
			const zone = line1 * line2;

			if(zone < 0) {
				// colliding on the side of the paddle

				// gain some momentum from the paddle
				this.dx = -deltaX * this.dx + 3 * paddle.dx / 4;
				this.dy += 9 * paddle.dy / 10;

				// recoil the paddle a bit
				paddle.dx += deltaX * Math.abs(xVelocity / 5 + 2);
				paddle.dy += yVelocity / 10;

				// separate the sprites
				this.x -= deltaX * (5 + paddle.width / 2 + this.size / 2 - Math.abs(distX));
				paddle.x += deltaX;
			} else if(zone > 0) {
				// colliding on the top or bottom

				// gain some momentum from the paddle
				this.dy = -deltaY * this.dy + 3 * paddle.dy / 4;
				this.dx += 9 * paddle.dx / 10;

				// recoil the paddle a bit
				paddle.dy += deltaY * Math.abs(yVelocity / 5 + 2);
				paddle.dx += xVelocity / 10;

				// separate the sprites
				this.y -= deltaY * (5 + paddle.height / 2 + this.size / 2 - Math.abs(distY));
				paddle.y += deltaY;
			} else if(zone === 0) {
				// do a corner thing

			}

			
			
			// rumble the screen a bit
			rumbling += Math.sqrt(this.dx ** 2 + this.dy ** 2) / 10;
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