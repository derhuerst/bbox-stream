'use strict'

const iterator = require('./lib/iterator')

const createBboxAsyncIterator = (bbox, step) => {
	const next = iterator(bbox, step)
	return {
		next: async () => {
			const val = next()
			return val === null
				? {done: true, value: val}
				: {done: false, value: val}
		},
	}
}

const createBboxAsyncIterable = (bbox, step) => {
	return {
		[Symbol.asyncIterator]: () => createBboxAsyncIterator(bbox, step),
	}
}

module.exports = createBboxAsyncIterable
