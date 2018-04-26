class Message {
	constructor(text) {
		this.text = text;
		this.birthTime = frameCount;
		this.lifeSpan = 120;
		this.x = screenWidth / 2;
		this.y = -100;
		this.opacity = 0;
	}

	update() {
		// check to see if the message is expired
		if(frameCount > this.birthTime + this.lifeSpan) {
			messages.delete(this);
		}

		// scroll down the screen
		const frames = frameCount - this.birthTime;
		this.y = (screenHeight) 
				 * (frames - this.lifeSpan / 2) ** 3 
				 / (2 * (this.lifeSpan / 2) ** 3) 
				 + screenHeight / 2;
		console.log(this.y);

		// update the opacity
		// quadratic style
		this.opacity = -1020 * (frames - this.lifeSpan / 2) ** 2 / this.lifeSpan ** 2 + 255;

		// reciprocal style
		//this.opacity = 1 / ((frames - this.lifeSpan / 2) ** 2 / 60 + 1 / 256) - 1
	}

	draw() {
		push();
		textFont("Comfortaa");
		textSize(120);
		textAlign(CENTER, CENTER);
		textStyle(BOLD);
		noStroke();
		fill(255, 255, 255, this.opacity);
		text(this.text, this.x, this.y)
		pop();
	}
}