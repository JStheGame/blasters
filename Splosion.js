class Splosion {
	constructor(x, y, colour, velocity) {
		this.x = x;
		this.y = y;
		this.birthTime = frameCount;
		this.pieces = Array.from({length: 10}, 
			() => new Piece(x, y, colour, velocity));
		this.lifeSpan = 30;
	}

	update() {
		if(frameCount - this.birthTime > this.lifeSpan) {
			splosions.delete(this);
		}

		this.pieces.map(piece => piece.update());
	}

	draw() {
		this.pieces.map(piece => {
			const msPassed = frameCount - this.birthTime
			const lifeRemaining = (this.lifeSpan - msPassed) / this.lifeSpan;
			piece.draw(lifeRemaining);
		});
	}
}

class Piece {
	constructor(x, y, colour, velocity) {
		this.x = x;
		this.y = y;
		this.dx = (velocity ** 2 / 15) * random(-1, 1);
		this.dy = (velocity ** 2 / 15) * random(-1, 1);
		this.colour = colour;
	}

	update() {
		this.x += this.dx;
		this.y += this.dy;
	}

	draw(lifeRemaining) {
		push();
		noFill();
		stroke(this.colour);
		strokeWeight(6 * lifeRemaining);
		ellipse(this.x, this.y, 18 * lifeRemaining);
		pop();
	}
}