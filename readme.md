# bbox-stream

**An [async iterable](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols#the_async_iterator_and_async_iterable_protocols) of coordinates within a bounding box.**

[![npm version](https://img.shields.io/npm/v/bbox-stream.svg)](https://www.npmjs.com/package/bbox-stream)
![ISC-licensed](https://img.shields.io/github/license/derhuerst/bbox-stream.svg)
![minimum Node.js version](https://img.shields.io/node/v/bbox-stream.svg)
[![support me via GitHub Sponsors](https://img.shields.io/badge/support%20me-donate-fa7664.svg)](https://github.com/sponsors/derhuerst)
[![chat with me on Twitter](https://img.shields.io/badge/chat%20with%20me-on%20Twitter-1da1f2.svg)](https://twitter.com/derhuerst)


## Installing

```
npm install bbox-stream
```


## Usage

*Note:* If you're looking for a [`stream.Readable`](https://nodejs.org/docs/latest-v18.x/api/stream.html#readable-streams): This package does not expose it anymore, but [since the Node.js `stream` APIs directly support (sync) iterables and async iterables](https://nodejs.org/docs/latest-v18.x/api/stream.html#streams-compatibility-with-async-generators-and-async-iterators), you likely won't need it.

### async iterable interface

```js
const coordsIterable = require('bbox-stream')

const it = coordsIterable([52.4, 13.4, 52.6, 13.6], .1)
for await (const coords of it) console.log(coords)
```

```js
{ lat: 52.4, lon: 13.4 }
{ lat: 52.5, lon: 13.4 }
{ lat: 52.6, lon: 13.4 }
{ lat: 52.4, lon: 13.5 }
{ lat: 52.5, lon: 13.5 }
{ lat: 52.6, lon: 13.5 }
{ lat: 52.4, lon: 13.6 }
{ lat: 52.5, lon: 13.6 }
{ lat: 52.6, lon: 13.6 }
```

`bbox` must an array with 4 numbers, `minLat`, `minLon`, `maxLat`, `maxLon`. `step` must be a number.

You can pipe the async iterable into a Node.js `stream.Writable` using `stream.pipeline()`:

```js
const {pipeline} = require('stream')

pipeline(
	it,
	someWritableStream,
	(err) => {
		if (err) {
			console.error(err)
			process.exit(1)
		}
	}
)
```

### [`callbag`](https://github.com/callbag/callbag#callbag-) interface

```js
const pipe = require('callbag-pipe')
const coords = require('bbox-stream/callbag')
const forEach = require('callbag-for-each')

pipe(
	coords([52.4, 13.4, 52.6, 13.6], .1),
	forEach(console.log)
)
```


## Contributing

If you **have a question**, **found a bug** or want to **propose a feature**, have a look at [the issues page](https://github.com/derhuerst/bbox-stream/issues).
