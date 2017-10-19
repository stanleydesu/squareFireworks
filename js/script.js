"use strict";

/* CODE STRUCTURE:
 *
 * VARIABLES
 *
 */

const animation = (() => {

	// VARIABLES

	const canvas = document.getElementById('canvas');
	const c = canvas.getContext('2d');
	const mouse = { x: innerWidth / 2, y: innerHeight / 2 };
	const base = { x: innerWidth / 2, y: innerHeight };
	const gravity = 2;
})();