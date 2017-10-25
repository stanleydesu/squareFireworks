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
		constructor (x, y, v, a, len, color, canExplode) {
			this.x = x
			this.y = y
			this.vx = v
			this.vy = v
			this.a = a
			this.len = len
			this.color = color
			this.canExplode = canExplode
			this.lifeTime = canExplode ? getRandomInt(1, 4) : 2
		}
		update () {
			this.lifeTime -= 0.05
			this.x += this.vx * Math.cos(this.a)
			this.y -= this.vy * Math.sin(this.a)
			this.draw()
		}
		draw () {
			c.save()
			c.translate(this.x, this.y)
			c.rotate(-this.a)
			c.globalAlpha = this.lifeTime > 0 ? this.lifeTime : 0
			c.fillStyle = this.color
			c.fillRect(-this.len / 2, -this.len / 2, this.len, this.len)
			c.restore()
		}
	}

	// ANIMATION FUNCTIONS

	// spawns a projectile at position x and y
	// with angle a or randomly generated angle
	const spawnProjectile = (x, y, a, canExplode) => {
		let v = getRandomInt(5, 15)
		a = a || (Math.random() * Math.PI * 2)
		let len = 15
		let color = colors[getRandomInt(0, colors.length - 1)]
		projectiles.push(new Projectile(x, y, v, a, len, color, canExplode))
	}

	const spawnExplosion = (x, y) => {
		for (let i = 0; i < 20; ++i) {
			spawnProjectile(x, y, 0, false)
		}
	}

	const resize = () => {
		cw = innerWidth
		ch = innerHeight
		base.x = cw / 2
		base.y = ch / 2
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
			if (e.which === 32) {
				let x = base.x;
				let y = base.y;
				let a = Math.atan2(base.y - mouse.y, mouse.x - base.x)
				let canExplode = true
				spawnProjectile(x, y, a, canExplode)
			}
		})
		window.addEventListener('click', () => {
			let x = base.x;
			let y = base.y;
			let a = Math.atan2(base.y - mouse.y, mouse.x - base.x)
			let canExplode = true
			spawnProjectile(x, y, a, canExplode)
		})
	}

	const animate = () => {
		requestAnimationFrame(animate)
		c.fillStyle = 'rgba(0, 0, 0, 1)'
		c.fillRect(0, 0, cw, ch)
		cannon.update()
		projectiles.map(p => {
			p.update()
			if (p.lifeTime < 0 && p.canExplode) spawnExplosion(p.x, p.y)
		})
		projectiles = projectiles.filter(p => p.lifeTime > 0)
	}

	// VARIABLES

	const canvas = document.getElementById('canvas')
	const c = canvas.getContext('2d')
	const colors = [
	'rgb(242, 193, 102)', 
	'rgb(242, 134, 39)',
	'rgb(217, 63, 7)',
	'rgb(140, 29, 4)'
	]
	const mouse = { x: innerWidth / 2, y: innerHeight / 2 }
	const base = { x: innerWidth / 2, y: innerHeight }
	const cannon = new Cannon(30, colors[getRandomInt(0, colors.length - 1)])
	let projectiles = []
	let cw = innerWidth
	let ch = innerHeight

	// FUNCTION EXECUTION
	
	init()
	
	return { animate }
})()

animation.animate()