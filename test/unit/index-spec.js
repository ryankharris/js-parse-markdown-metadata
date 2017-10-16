'use strict'

const mdMeta = require('../../index')

describe('js-parse-markdown-metadata', function () {

  it('should not require spaces between open-tag and meta-annotation', function () {
    let source = `
<!--@metakey: value-->
`
    let parsedContent = mdMeta.parse(source)
    expect(parsedContent.metadata).toEqual({
      key: 'value'
    })
  })

  it('should allow arbitrary space between open-tag and meta-annotation', function () {
    let source = `
<!--         @meta
key: value-->
`
    let parsedContent = mdMeta.parse(source)
    expect(parsedContent.metadata).toEqual({
      key: 'value'
    })
  })

  it('should not allow linebreak between open-tag and meta-annotation', function () {
    let source = `
<!--
@meta
key: value-->
`
    let parsedContent = mdMeta.parse(source)
    expect(parsedContent.metadata).toEqual({
    })
  })

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
