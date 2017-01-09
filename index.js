'use strict'

const Readable = require('stream').Readable
const inherit = require('util').inherits

const round = (x, s) => {
	const p = 1 / Math.min(s, 1)
	return Math.round(x * p) / p
}

const TileGenerator = function (bbox, step) {
	if (process.env !== 'production') {
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

	Readable.call(this, {objectMode: true})

	this.minLat = round(bbox[0], step)
	this.minLon = round(bbox[1], step)
	this.maxLat = round(bbox[2], step)
	this.maxLon = round(bbox[3], step)

	this.currentLat = this.minLat - step
	this.currentLon = this.minLon
	this.step = step
	return this
}

inherit(TileGenerator, Readable)

TileGenerator.prototype._read = function () {
	this.currentLat = round(this.currentLat + this.step, this.step)

	if (this.currentLat > this.maxLat) {
		this.currentLat = this.minLat
		this.currentLon = round(this.currentLon + this.step, this.step)
	}
	if (this.currentLon > this.maxLon) {
		const self = this
		setImmediate(() => self.emit('end'))
		return null
	}
	return this.push({lat: this.currentLat, lon: this.currentLon})
}

const tileGenerator = (bbox, step) => new TileGenerator(bbox, step)

module.exports = Object.assign(tileGenerator, {TileGenerator})
