# bbox-stream

**A stream of coordinates within a bounding box.**

```js
const coords = require('bbox-stream')
coords([52.4, 13.4, 52.6, 13.6], .1).pipe(…)
```

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

`coords(bbox, step)`

`bbox` must an array with 4 numbers, `minLat`, `minLon`, `maxLat`, `maxLon`. `step` must be a number.

Returns a [readable stream](http://nodejs.org/api/stream.html#stream_class_stream_readable) [in object mode](https://nodejs.org/api/stream.html#stream_object_mode).

### Example

```js
const coords = require('bbox-stream')
coords([52.4, 13.4, 52.6, 13.6], .1)
.on('data', console.log)
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
