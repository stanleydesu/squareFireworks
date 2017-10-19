"use strict"

/* CODE STRUCTURE:
 *
 * UTILITY FUNCTIONS
 * CONSTRUCTORS
 * ANIMATION FUNCTIONS
 * VARIABLES
 *
 */

const animation = (() => {

	// UTILITY FUNCTIONS

	const getRandomInt = (min, max) => Math.floor(min + Math.random() * (max - min + 1))

	// CONSTRUCTORS

	class Cannon {
		constructor (length, color) {
			this.length = length
			this.color = color
			this.a
		}
		update () {
			this.a = Math.atan2(base.y - mouse.y, mouse.x - base.x)
			this.draw()
		}
		draw () {
			c.save()
			c.translate(base.x, base.y)
			c.rotate(-this.a + Math.PI / 2)
			c.fillStyle = this.color
			c.fillRect(-this.length / 2, -this.length / 2, this.length, this.length)
			c.fillRect(-this.length / 4, -this.length * 1.2, this.length / 2, this.length / 2)
			c.restore()
		}
	}

	// constructor for projectiles
	class Projectile {
		constructor (x, y, v, a, len, color) {
			this.x = x
			this.y = y
			this.v = v
			this.a = a
			this.len = len
			this.color = color
		}
		update () {
			this.x += this.v * Math.cos(this.a)
			this.y -= this.v * Math.sin(this.a)
			this.draw()
		}
		draw () {
			c.save()
			c.translate(this.x, this.y)
			c.rotate(-this.a)
			c.fillStyle = this.color
			c.fillRect(-this.len / 2, -this.len / 2, this.len, this.len)
			c.restore()
		}
	}

	// VARIABLES

	const canvas = document.getElementById('canvas')
	const c = canvas.getContext('2d')
	const mouse = { x: innerWidth / 2, y: innerHeight / 2 }
	const base = { x: innerWidth / 2, y: innerHeight }
	const cannon = new Cannon(30, 'white')
	const projectiles = []
	let cw = innerWidth
	let ch = innerHeight

})()