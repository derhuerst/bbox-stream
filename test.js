'use strict'

const {strictEqual, deepStrictEqual} = require('assert')
const pipe = require('callbag-pipe')
const toIterable = require('callbag-to-iterable')

const coords = require('.')
const pullable = require('./callbag')
const bbox = [52.5, 13.1, 52.7, 13.2]

;(async () => {
	{
		const it = coords(bbox, .1)
		const data = []
		for await (const c of it) data.push(c)

		deepStrictEqual(data, [
			{lat: 52.5, lon: 13.1},
			{lat: 52.6, lon: 13.1},
			{lat: 52.7, lon: 13.1},
			{lat: 52.5, lon: 13.2},
			{lat: 52.6, lon: 13.2},
			{lat: 52.7, lon: 13.2}
		])
	}
	console.info('.1 passed')

	{
		const it = coords(bbox, .01)
		const data = []
		for await (const c of it) data.push(c)

		deepStrictEqual(data[1], {lat: 52.51, lon: 13.1})
		deepStrictEqual(data[data.length - 2], {lat: 52.69, lon: 13.2})
		strictEqual(data.length, (20 + 1) * (10 + 1))
	}
	console.info('.01 passed')

	{
		const values = pipe(pullable(bbox, .1), toIterable)
		deepStrictEqual(Array.from(values), [
			{lat: 52.5, lon: 13.1},
			{lat: 52.6, lon: 13.1},
			{lat: 52.7, lon: 13.1},
			{lat: 52.5, lon: 13.2},
			{lat: 52.6, lon: 13.2},
			{lat: 52.7, lon: 13.2}
		])
	}
	console.info('callbag passed')
})()
.catch((err) => {
	console.error(err)
	process.exit(1)
})
