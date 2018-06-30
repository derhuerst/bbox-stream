'use strict'

const Readable = require('stream').Readable
const inherit = require('util').inherits

const iterator = require('./lib/iterator')

const TileGenerator = function (bbox, step) {
	Readable.call(this, {objectMode: true})
	this.iterate = iterator(bbox, step)
	return this
}

inherit(TileGenerator, Readable)

TileGenerator.prototype._read = function () {
	const val = this.iterate()
	if (val === null) {
		const self = this
		setImmediate(() => self.emit('end'))
		return null
	}
	return this.push(val)
}

const tileGenerator = (bbox, step) => new TileGenerator(bbox, step)

tileGenerator.TileGenerator = TileGenerator
module.exports = tileGenerator
