# bbox-stream

**A stream of coordinates within a bounding box.**

```js
const coords = require('bbox-stream')
coords([52.4, 13.4, 52.6, 13.6], .1).pipe(…)
```

[![npm version](https://img.shields.io/npm/v/bbox-stream.svg)](https://www.npmjs.com/package/bbox-stream)
[![build status](https://img.shields.io/travis/derhuerst/bbox-stream.svg)](https://travis-ci.org/derhuerst/bbox-stream)
[![dependency status](https://img.shields.io/david/derhuerst/bbox-stream.svg)](https://david-dm.org/derhuerst/bbox-stream#info=dependencies)
[![dev dependency status](https://img.shields.io/david/dev/derhuerst/bbox-stream.svg)](https://david-dm.org/derhuerst/bbox-stream#info=devDependencies)
![ISC-licensed](https://img.shields.io/github/license/derhuerst/bbox-stream.svg)
[![chat on gitter](https://badges.gitter.im/derhuerst.svg)](https://gitter.im/derhuerst)


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


## Contributing

If you **have a question**, **found a bug** or want to **propose a feature**, have a look at [the issues page](https://github.com/derhuerst/bbox-stream/issues).
