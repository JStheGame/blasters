// list of powerups
const effects = {
	speedUp: () => paddle.speedUp(0.5),
	embiggen: () => paddle.embiggen(25),
	shrink: () => paddle.embiggen(-25)
};

const types = Object.keys(effects);
const randomType = () => types[Math.floor(types.length * random())];

class Powerup {
	constructor(x, y) {
		this.type = randomType();
		this.x = x;
		this.y = y;
		this.size = 30;
	}

	update() {
		// move down on every frame
		this.y += 1;

		// speed up the paddle if it eats the powerup
		if(collideRectCircle(paddle.x - paddle.width / 2, 
					paddle.y - paddle.height / 2, 
					paddle.width, paddle.height,
					this.x, this.y, this.size, this.size)) {
			powerups.delete(this);
			effects[this.type]();
		}

		// delete the powerup if it goes offscreen
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