class Background {
	constructor(howManyStars) {
		this.stars = Array.from({length: howManyStars}, 
			() => new p5.Vector(random(0, windowWidth), 
				random(0, windowHeight), 
				random(0, 1)));

	}

	update() {
		// move all the stars downward, with speed based on z-component
		this.stars.map(star => {
			star.y += 5 * star.z + 2 + 20 * (sin(frameCount / 2000)) ** 10;
			if(star.y - 20 > windowHeight) {
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

		this.stars.map(star => {
			const size = 4 * star.z ** 2 + 2;
			ellipse(star.x, star.y, size, size * (1 + 10 * (sin(frameCount / 2000) ** 10)));
		});

		pop();
	}
}
