// list of powerups
const effects = {
	"speed\nup": () => paddle.speedUp(0.5),
	"speed\ndown": () => paddle.speedUp(-0.5),
	"paddle\nembiggen": () => paddle.embiggen(25),
	"paddle\nshrink": () => paddle.embiggen(-25),
	"spaceball\nembiggen": () => spaceBall.embiggen(10),
	"spaceball\nfreeze": () => spaceBall.freeze(),
	"1000\npoints": () => increaseScore(1000),
	"blaster\nget": () => blasterIncrease(2)
};

const types = Object.keys(effects);

// could probably use a generator function or closure to get a better randomizer
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

		// provide the effect if the paddle eats the powerup
		if(collideRectCircle(paddle.x - paddle.width / 2, 
					paddle.y - paddle.height / 2, 
					paddle.width, paddle.height,
					this.x, this.y, this.size, this.size) && gameActive) {
			powerups.delete(this);
			effects[this.type]();
			flashMessage(this.type);
		}

		// delete the powerup if it goes offscreen
		if(this.y - this.size > screenHeight) {
			powerups.delete(this);
		}
	}

	draw() {
		// draw the powerup itself
		push();
		noFill();
		stroke(100 * sin(frameCount) + 155, 120, 120);
		strokeWeight(8);
		ellipse(this.x, this.y, this.size);
		pop();

		// draw the text (show what type it is)
		push();
		noStroke();
		fill(255);
		textFont("monospace");
		textAlign(CENTER, CENTER);
		textStyle(BOLD);
		text(this.type, this.x, this.y);
		pop();
	}
}