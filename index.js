#!/usr/bin/env node
'use strict'

/**
@desc accepts a source markdown file, looks for '<!-- @meta' and '-->' tags and considers everything in between to be metadata
@param {string} source - the source to split
@return {Object} The split content
@example
  With source like:
  `
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

  Calling parse(source) would produce and return the following object:
  {
    metadata: {
      title: 'Here is an example of metadata',
      author: 'your name',
      coolFactor: 'high'
    },
    markdown: '# Markdown header\n* a\n* short\n* markdown\n* list'
  }

  Notice that 'markdown' will simply be non-metadata content as a string.
  Metadata entries can be split into multiple '<!-- @meta -->' combinations
  within source. The metadata object takes all metadata entries from source
  and splits them on ':', so entries like `title: some title` will create a
  metadata property named 'title' with value 'some title'.
*/
exports.parse = function parse (source) {

  function cacheIt (delim, metaMap, match, g1) {
    let kvPairs = g1
                  .split(delim)
                  .map((kv) => {return kv.trim()})
                  .filter((kv) => {return (kv)? true: false})

    // not concerned with overwriting existing key-values, that is the
    // consumer's concern
    kvPairs.forEach((kv) => {
      let pair = kv.split(':')
      metaMap[pair[0].trim().toLowerCase()] = pair[1].trim()
    })
    return ''
  } // end cacheIt

  const LB = '<linebreak>'
  const reMetaData = /<!--\s*@meta(.*?)-->/g
  const reLineBreak = /\r?\n|\r/g
  const reLineBreakString = /<linebreak>/g
  let metadata = {}
  let boundCacheIt = cacheIt.bind(null, LB, metadata)
  let modSource1 = source.replace(reLineBreak, LB)
  let modSource2 = modSource1.replace(reMetaData, boundCacheIt)
  let markdown = modSource2
                .replace(reLineBreakString, '\n')
                .trim()

  return {
    metadata: metadata,
    markdown: markdown
  }

} // end parse
