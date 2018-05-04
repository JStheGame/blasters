class Message {
	constructor(text) {
		this.text = text;
		this.birthTime = frameCount;
		this.lifeSpan = 120;
		this.x = screenWidth / 2;
		this.y = -100;
		this.opacity = 0;
		this.saturation = 255;
		this.r = Math.floor(255 * Math.random());
		this.g = Math.floor(255 * Math.random());
		this.b = Math.floor(255 * Math.random());
	}

	update() {
		// check to see if the message is expired
		if(frameCount > this.birthTime + this.lifeSpan) {
			messages.delete(this);
		}

		// scroll down the screen, cubic style
		const frames = frameCount - this.birthTime;
		this.y = (screenHeight) 
				 * (frames - this.lifeSpan / 2) ** 3 
				 / (2 * (this.lifeSpan / 2) ** 3) 
				 + screenHeight / 2;
		console.log(this.y);

		// update the opacity, quadratic style
		this.opacity = -1020 * (frames - this.lifeSpan / 2) ** 2 / this.lifeSpan ** 2 + 255;

		// update the saturation, square root style
		this.saturation = Math.sqrt(-(255 ** 2) / this.lifeSpan * (frames - this.lifeSpan));		
	}

	draw() {
		push();
		textFont("Comfortaa");
		textSize(120);
		textAlign(CENTER, CENTER);
		textStyle(BOLD);
		noStroke();
		fill(this.saturation + (255 - this.saturation) * this.r / 255, 
			 this.saturation + (255 - this.saturation) * this.g / 255, 
			 this.saturation + (255 - this.saturation) * this.b / 255, 
			 this.opacity);
		text(this.text, this.x, this.y)
		pop();
	}
}