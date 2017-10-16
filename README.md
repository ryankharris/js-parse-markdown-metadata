# js-parse-markdown-metadata
CommonJS module to parse metadata comments out of markdown and return object with 'metadata' and 'markdown' properties.

## Example
Given markdown source:

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

Require with:  

    const mdMeta = require('js-parse-markdown-metadata')

Calling  

    let parsedContent = mdMeta.parse(source)


...would produce and return the following object:

    {
      metadata: {
        title: 'Here is an example of metadata',
        author: 'your name',
        coolFactor: 'high'
      },
      markdown: '# Markdown header\n* a\n* short\n* markdown\n* list'
    }

Notice that 'markdown' will simply be non-metadata content as a string.
Metadata entries can be split into multiple `<!-- @meta -->` combinations
within source, where `<!-- @meta` is the opening tag and `-->` is the closing tag. The metadata object takes all metadata entries from source
and splits them on ':', so entries like `title: some title` will create a
metadata property named 'title' with value 'some title'.

## Running unit-tests
`npm t -s`  
`npm run jasmine test/unit/*`  
`npm run jasmine test/unit/<file-name>`
