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
        coolfactor: 'high'
      },
      markdown: '# Markdown header\n* a\n* short\n* markdown\n* list'
    }

Notice that 'markdown' will be non-metadata content as a string.  
Metadata entries can be split into multiple `<!-- @meta -->` combinations
within source, where `<!-- @meta` is the opening tag and `-->` is the closing tag.  
The metadata object takes all metadata entries from source
and splits them on an initial ':', so entries like:

    <!-- @meta title: some title -->

will produce:

    {title: 'some title'}

An entry like:

    <!-- @meta title: some title: and more -->

will produce:

    {title: 'some title: and more'}

All key-names are made lowercase, i.e.

    <!-- @meta coolFactor: high -->

produces:

    {coolfactor: 'high'}


## Running unit-tests
`npm t -s`  
`npm run jasmine test/unit/*`  
`npm run jasmine test/unit/<file-name>`
