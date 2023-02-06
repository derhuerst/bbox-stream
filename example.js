'use strict'

const coords = require('.')

const coordsIt = coords([52.4, 13.4, 52.6, 13.6], .1)

;(async () => {
	for await (const coords of coordsIt) {
		console.log(coords)
	}
})()
.catch((err) => {
	console.error(err)
	process.exit(1)
})
