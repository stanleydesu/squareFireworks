"use strict";

/* CODE STRUCTURE:
 *
 * CONSTRUCTORS
 * VARIABLES
 *
 */

const animation = (() => {
// CONSTRUCTORS

	class Cannon {
		constructor(length, color) {
			this.length = length;
			this.color = color;
			this.a;
			this.baseX;
			this.baseY;
			this.endX;
			this.endY;
		}
		update() {
			this.a = Math.atan2(base.y - mouse.y, mouse.x - base.x);
			this.baseX = base.x;
			this.baseY = base.y;
			this.endX = base.x + this.length * Math.cos(this.a);
			this.endY =	base.y - this.length * Math.sin(this.a);
			this.draw();
		}
		draw() {
			c.beginPath();
			c.moveTo(this.baseX, this.baseY);
			c.lineTo(this.endX, this.endY);
			c.lineWidth = 10;
			c.strokeStyle = this.color;
			c.stroke();
		}
	}

	// constructor for projectiles
	class Projectile {
		constructor(x, y, v, a, r, color) {
			this.x = x;
			this.y = y;
			this.vx = v;
			this.vy = v;
			this.a = a;
			this.r = r;
			this.g = gravity;
			this.color = color;
		}
		update() {
			this.vy -= this.g;
			this.x += this.vx * Math.cos(this.a);
			this.y -= this.vy * Math.sin(this.a);
			this.draw();
		}
		draw() {
			c.beginPath();
			c.arc(this.x, this.y, this.r, 0, Math.PI * 2);
			c.fillStyle = this.color;
			c.fill();
		}
	}
	
	// VARIABLES

	const canvas = document.getElementById('canvas');
	const c = canvas.getContext('2d');
	const mouse = { x: innerWidth / 2, y: innerHeight / 2 };
	const base = { x: innerWidth / 2, y: innerHeight };
	const gravity = 2;
})();