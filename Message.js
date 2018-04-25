class Message {
	constructor(text) {
		this.text = text;
		this.birthTime = frameCount;
		this.lifeSpan = 200;
		this.x = screenWidth / 2;
		this.y = -100;
	}

	update() {
		// check to see if the message is expired
		if(frameCount > this.birthTime + this.lifeSpan) {
			messages.delete(this);
		}

		// scroll down the screen
		const frames = frameCount - this.birthTime;
		this.y = ((frames - this.lifeSpan / 2) ** 3) / 1000 + screenHeight / 2;
	}

	draw() {
		push();
		textFont("Comfortaa");
		textSize(120);
		textAlign(CENTER, CENTER);
		textStyle(BOLD);
		noFill();
		stroke(255, 255, 255, 155);
		strokeWeight(0.5);
		text(this.text, this.x, this.y)
		pop();
	}
}