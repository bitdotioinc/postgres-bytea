'use strict'

import test from 'tape-promise/tape'

import Readable from 'stream'
import streamToPromise from 'stream-to-promise'
import Decoder from './decoder.js'

test('decoder', (t) => {
  t.test('input cuts at chunk boundary', async (t) => {
    const input = [...Buffer.from('\\\\x616263').values()]

    for (let i = 1; i < input.length; i++) {
      const result = await streamToPromise(Readable.from([input.slice(0, i), input.slice(i)].map(Buffer.from)).pipe(new Decoder()))
      t.equal(result.toString(), 'abc', `i=${i}`)
    }
  })

  t.test('fails if not prefixed with \\\\x', async (t) => {
    const dest = new Decoder()
    const promise = streamToPromise(dest)

    dest.write(Buffer.from('616263'))

    await t.rejects(promise, /prefix/)
  })

  t.end()
})
