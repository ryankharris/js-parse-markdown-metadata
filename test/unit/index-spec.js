'use strict'

const mdMeta = require('../../index')

describe('js-parse-markdown-metadata', function () {

  it('should parse markdown with 4 metadata headers', function () {
    let source = `
<!-- @meta
title: mock title
autHOr: mock author
-->

<!--@meta
More: more metadata
-->
<!-- @meta coolness: high -->

# Here is a headline
__woot__
`

    let parsedContent = mdMeta.parse(source)
    expect(parsedContent.metadata).toEqual({
      title: 'mock title',
      author: 'mock author',
      more: 'more metadata',
      coolness: 'high'
    })
    expect(parsedContent.markdown.length).toBe(29)
  }) // end it

}) // end describe
