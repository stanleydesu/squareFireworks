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

	const isOutsideScreen = (x, y, size) => {
		return x + size < 0 || x - size > cw ||
					 y + size < 0 || y - size > ch
	}

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

	// ANIMATION FUNCTIONS

	const spawnProjectile = () => {
		let x = base.x
		let y = base.y
		let v = getRandomInt(5, 10)
		let len = cannon.length / 2
		let color = colors[getRandomInt(0, colors.length)]
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
		window.addEventListener('keydown', e => {
			if (e.which === 32) spawnProjectile()
		})
	}

	const animate = () => {
		requestAnimationFrame(animate)
		c.fillStyle = 'rgba(0, 0, 0, 1)'
		c.fillRect(0, 0, cw, ch)
		cannon.update()
		projectiles = projectiles.filter(p => !isOutsideScreen(p.x, p.y, p.len))
		projectiles.map(p => p.update())
	}

	// VARIABLES

	const canvas = document.getElementById('canvas')
	const c = canvas.getContext('2d')
	const colors = [
	'rgb(0, 48, 90)',
	'rgb(0, 75, 141)',
	'rgb(0, 116, 217)',
	'rgb(65, 147, 217)',
	'rgb(122, 186, 242)',
	];
	const mouse = { x: innerWidth / 2, y: innerHeight / 2 }
	const base = { x: innerWidth / 2, y: innerHeight }
	const cannon = new Cannon(30, colors[getRandomInt(0, colors.length)])
	let projectiles = []
	let cw = innerWidth
	let ch = innerHeight

	// FUNCTION EXECUTION
	init()
	animate()
})()