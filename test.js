'use strict'

const assert = require('assert')
const sink = require('stream-sink')
const isStream = require('is-stream')
const pipe = require('callbag-pipe')
const toIterable = require('callbag-to-iterable')

const coords = require('.')
const pullable = require('./callbag')
const bbox = [52.5, 13.1, 52.7, 13.2]



assert(isStream(coords(bbox, .1)))
console.info('isStream passed')

coords(bbox, .1)
.on('error', assert.ifError)
.pipe(sink('object'))
.then((data) => {
	assert.deepStrictEqual(data, [
		{lat: 52.5, lon: 13.1},
		{lat: 52.6, lon: 13.1},
		{lat: 52.7, lon: 13.1},
		{lat: 52.5, lon: 13.2},
		{lat: 52.6, lon: 13.2},
		{lat: 52.7, lon: 13.2}
	])
	console.info('.1 passed')
})
.catch(assert.ifError)

coords(bbox, .01)
.on('error', assert.ifError)
.pipe(sink('object'))
.then((data) => {
	assert.deepStrictEqual(data[1], {lat: 52.51, lon: 13.1})
	assert.deepStrictEqual(data[data.length - 2], {lat: 52.69, lon: 13.2})
	assert.strictEqual(data.length, (20 + 1) * (10 + 1))
	console.info('.01 passed')
})
.catch(assert.ifError)



const values = pipe(pullable(bbox, .1), toIterable)
assert.deepStrictEqual(Array.from(values), [
	{lat: 52.5, lon: 13.1},
	{lat: 52.6, lon: 13.1},
	{lat: 52.7, lon: 13.1},
	{lat: 52.5, lon: 13.2},
	{lat: 52.6, lon: 13.2},
	{lat: 52.7, lon: 13.2}
])
console.info('callbag passed')
