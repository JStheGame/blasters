class Background {
	constructor(howManyStars) {
		this.stars = Array.from({length: howManyStars}, 
			() => new p5.Vector(random(0, windowWidth), 
				random(0, windowHeight), 
				random(0, 1)));

	}

	update() {
		this.stars.forEach(star => {
			star.y += 5 * star.z + 2;
			if(star.y > windowHeight) {
				//respawn the star
				star.x = random(0, windowWidth);
				star.y = -20;
			}
		});
	}

	draw() {
		push();
		fill(255);
		noStroke();
		//text(this.stars[0].x, 50, 50)

		this.stars.forEach(star => {
			const size = 5 * star.z ** 2 + 2;
			ellipse(star.x, star.y, size, size);
		})
		pop();
	}
}
