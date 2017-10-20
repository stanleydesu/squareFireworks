"use strict"

/* CODE STRUCTURE:
 *
 * UTILITY FUNCTIONS
 * CONSTRUCTORS
 * ANIMATION FUNCTIONS
 * VARIABLES
 * FUNCTION EXECUTION
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
			this.a = Math.atan2(base.y - mouse.y, mouse.x - base.x)
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
			// c.fillRect(-this.length / 4, -this.length * 1.2, this.length / 2, this.length / 2)
			c.restore()
		}
	}

	// constructor for projectiles
	class Projectile {
		constructor (x, y, v, len, color) {
			this.x = x
			this.y = y
			this.v = v
			this.len = len
			this.color = color
			this.a = Math.atan2(base.y - mouse.y, mouse.x - base.x)
			this.hasLaunched
		}
		launch () {
			this.hasLaunched = true
		}
		update () {
			if (this.hasLaunched) {
				this.x += this.v * Math.cos(this.a)
				this.y -= this.v * Math.sin(this.a)
			} else {
				this.a = Math.atan2(base.y - mouse.y, mouse.x - base.x)
			}
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

	// ANIMATION FUNCTIONS

	const spawnProjectile = () => {
		let x = base.x
		let y = base.y
		let v = getRandomInt(5, 10)
		let len = cannon.length / 2
		let color = 'white'
		projectiles.push(new Projectile(x, y, v, len, color))
	}

	const resize = () => {
		cw = innerWidth
		ch = innerHeight
		base.x = cw / 2
		base.y = ch
		canvas.width = cw
		canvas.height = ch
	}

	const init = () => {
		resize()
		window.addEventListener('resize', resize)
		window.addEventListener('mousemove', e => {
			mouse.x = e.x
			mouse.y = e.y
		})
		window.addEventListener('click', function () {
			spawnProjectile()
			if (!projectiles[0].hasLaunched) {
				projectiles[0].launch()
			}
		})

	}

	const animate = () => {
		requestAnimationFrame(animate)
		c.clearRect(0, 0, cw, ch)
		cannon.update()
		projectiles.map(p => p.update())
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

	// FUNCTION EXECUTION
	init()
	animate()
})()