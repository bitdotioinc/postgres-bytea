'use strict'

import test from 'tape-promise/tape'
import Readable from 'stream'
import streamToPromise from 'stream-to-promise'
import Encoder from './encoder.js'

test('encoder', (t) => {
  t.test('empty input gives empty result', async (t) => {
    const result = await streamToPromise(Readable.from([]).pipe(new Encoder()))
    t.equal(result.toString(), '\\\\x')
  })

  t.test('input cuts at chunk boundary multiple ways', async (t) => {
    const input = [0x12, 0x34, 0x56]

    for (let i = 1; i < input.length; i++) {
      const result = await streamToPromise(Readable.from([input.slice(0, i), input.slice(i)].map(Buffer.from)).pipe(new Encoder()))
      t.equal(result.toString(), '\\\\x123456')
    }
    t.end()
  })
})
