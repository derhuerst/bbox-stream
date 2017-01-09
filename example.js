'use strict'

const coords = require('.')

coords([52.4, 13.4, 52.6, 13.6], .1)
.on('data', console.log)
