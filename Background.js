class Background {
	constructor(howManyStars) {
		this.stars = Array.from({length: howManyStars}, 
			() => new p5.Vector(random(0, screenWidth), 
				random(0, screenHeight), 
				random(0, 1)));

	}

	update() {
		// move all the stars downward, with speed based on z-component
		this.stars.map(star => {
			star.y += 5 * star.z + 2 + level;
			if(star.y - 20 > screenHeight) {
				//respawn the star
				star.x = random(0, screenWidth);
				star.y = -20;
			}
		});
	}

	draw() {
		push();
		fill(255);
		noStroke();

		this.stars.map(star => {
			const size = 3 * star.z ** 2 + 2;
			ellipse(star.x, star.y, size, size + (level - 1) ** 2);
		});

		pop();
	}
}
