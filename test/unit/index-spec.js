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

  it('should not choke if a `:` is missing in metadata', function () {
    let source = `<!--@meta somekey -->`
    let parsedContent = mdMeta.parse(source)
    expect(parsedContent.metadata).toEqual({
      somekey: ''
    })
  })

  it('should make all metadata keys lowercase, but leave values unchanged', function () {
    let source = `<!--@meta
Key1: Value1
Key2: VALUE2
KEY3: value3
-->`
    let parsedContent = mdMeta.parse(source)
    expect(parsedContent.metadata).toEqual({
      key1: 'Value1',
      key2: 'VALUE2',
      key3: 'value3'
    })
  })

  it('should find one key-value pair', function () {
    // This behavior is expected based on the simple splitting
    // design of metadata, each key-value pair should be on
    // a line of it's own in the markdown source
    let source = `<!--@meta Key1: Value1 Key2: VALUE2 -->`
    let parsedContent = mdMeta.parse(source)
    expect(parsedContent.metadata).toEqual({
      key1: 'Value1 Key2: VALUE2'
    })
  })

  it('should handle an empty key', function () {
    let source = `<!--@meta :value -->`
    let parsedContent = mdMeta.parse(source)
    expect(parsedContent.metadata).toEqual({})
  })

  it('should handle an empty key amidst valid keys', function () {
    let source = `<!--@meta
key1: value1
:value2
key3: value3
-->`
    let parsedContent = mdMeta.parse(source)
    expect(parsedContent.metadata).toEqual({
      key1: 'value1',
      key3: 'value3'
    })
  })

  it('should handle an empty value', function () {
    let source = `<!--@meta key: -->`
    let parsedContent = mdMeta.parse(source)
    expect(parsedContent.metadata).toEqual({
      key: ''
    })
  })

  it('should handle an empty value amidst valid key-values', function () {
    let source = `<!-- @meta
key1: value1
key2:
key3: value3
-->`
    let parsedContent = mdMeta.parse(source)
    expect(parsedContent.metadata).toEqual({
      key1: 'value1',
      key2: '',
      key3: 'value3'
    })
  })

  it('should work for my README examples', function () {
    let source = `

<!-- @meta
title: Here is an example of metadata
author: your name
-->

<!-- @meta coolFactor: high -->

# Markdown header
* a
* short
* markdown
* list
`
    let parsedContent = mdMeta.parse(source)
    expect(parsedContent.metadata).toEqual({
      title: 'Here is an example of metadata',
      author: 'your name',
      coolfactor: 'high'
    })

    source = `<!-- @meta title: some title -->`
    parsedContent = mdMeta.parse(source)
    expect(parsedContent.metadata).toEqual({
      title: 'some title'
    })

    source = `<!-- @meta title: some title: and more -->`
    parsedContent = mdMeta.parse(source)
    expect(parsedContent.metadata).toEqual({
      title: 'some title: and more'
    })
  })

  it('should throw an error if the source argument is not type string', function () {
    let source = 1
    let boundParse = mdMeta.parse.bind(null, source)
    expect(boundParse).toThrow('Error: source argument must be type string')
  })

}) // end describe
