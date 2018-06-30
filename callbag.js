'use strict'

const iterator = require('./lib/iterator')

const START = 0
const DATA = 1
const STOP = 2

const tileGenerator = (bbox, step) => {
	const source = (type, sink) => {
		if (type !== START) return;
		const iterate = iterator(bbox, step)

		const talkback = (type, data) => {
			if (type !== DATA) return;
			const val = iterate()
			if (val === null) sink(STOP)
			else sink(DATA, val)
		}
		sink(START, talkback)
	}
	return source
}

module.exports = tileGenerator
