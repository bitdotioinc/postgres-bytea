'use strict'

import Transform from 'stream'

class ByteaEncoder extends Transform {
  constructor () {
    super()
    this.push('\\\\x')
  }

  _transform (chunk, encoding, callback) {
    this.push(chunk.toString('hex'))
    callback()
  }
}

module.exports = ByteaEncoder
