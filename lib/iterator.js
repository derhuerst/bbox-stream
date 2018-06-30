'use strict'

const round = (x, s) => {
	const p = 1 / Math.min(s, 1)
	return Math.round(x * p) / p
}

const debug = process.env.NODE_ENV !== 'production'

const iterator = (bbox, step) => {
	if (debug) {
		if (!Array.isArray(bbox)) throw new Error('bbox must be an array')
		if ('number' !== typeof bbox[0]) throw new Error('bbox[0] must be a number')
		if ('number' !== typeof bbox[1]) throw new Error('bbox[1] must be a number')
		if ('number' !== typeof bbox[2]) throw new Error('bbox[2] must be a number')
		if ('number' !== typeof bbox[3]) throw new Error('bbox[3] must be a number')
		if (bbox[2] <= bbox[0]) throw new Error('bbox[2] must be > bbox[0]')
		if (bbox[3] <= bbox[1]) throw new Error('bbox[3] must be > bbox[1]')
		if ('number' !== typeof step) throw new Error('step must be a number')
		if (step <= 0) throw new Error('step must be > 0')
	}

	const minLat = round(bbox[0], step)
	const minLon = round(bbox[1], step)
	const maxLat = round(bbox[2], step)
	const maxLon = round(bbox[3], step)
	let currentLat = minLat - step
	let currentLon = minLon

	const iterate = () => {
		currentLat = round(currentLat + step, step)
		if (currentLat > maxLat) { // overflow
			currentLat = minLat
			currentLon = round(currentLon + step, step)
		}
		if (currentLon > maxLon) return null

		return {lat: currentLat, lon: currentLon}
	}
	return iterate
}

module.exports = iterator
