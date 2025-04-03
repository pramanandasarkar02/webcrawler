
const {normalizeUrl, getUrlsFromHTML} = require('./crawl.js')

const {test, expect} = require('@jest/globals')



test('normalizeUrl strip protocol', () => {
    const input = 'https://google.com/search'
    const actual = normalizeUrl(input)
    const expected = 'google.com/search'
    expect(actual).toEqual(expected)
})

test('normalizeUrl strip tailing slash', () => {
    const input = 'https://google.com/search/'
    const actual = normalizeUrl(input)
    const expected = 'google.com/search'
    expect(actual).toEqual(expected)
})

test('normalizeUrl capitals', () => {
    const input = 'https://GOOGLE.com/search/'
    const actual = normalizeUrl(input)
    const expected = 'google.com/search'
    expect(actual).toEqual(expected)
})


test('normalizeUrl strip http', () => {
    const input = 'http://google.com/search/'
    const actual = normalizeUrl(input)
    const expected = 'google.com/search'
    expect(actual).toEqual(expected)
})



test('getUrlsFromHTML absolute', () => {
    const inputHTMLBody = `
    <html>
    <body>
    <a href="https://google.com/">Google</a>
    </body>
    </html>
    `
   
    const inputBaseURL = 'https://google.com'
    const actual = getUrlsFromHTML(inputHTMLBody, inputBaseURL)
    const expected = ['https://google.com/']
    expect(actual).toEqual(expected)
})

test('getUrlsFromHTML relative', () => {
    const inputHTMLBody = `
    <html>
    <body>
    <a href="/search/">Google</a>
    </body>
    </html>
    `
   
    const inputBaseURL = 'https://google.com'
    const actual = getUrlsFromHTML(inputHTMLBody, inputBaseURL)
    const expected = ['https://google.com/search/']
    expect(actual).toEqual(expected)
})

test('getUrlsFromHTML both', () => {
    const inputHTMLBody = `
    <html>
    <body>
    <a href="/search/">Google</a>
    <a href="https://google.com/">Google</a>
    </body>
    </html>
    `
   
    const inputBaseURL = 'https://google.com'
    const actual = getUrlsFromHTML(inputHTMLBody, inputBaseURL)
    const expected = ['https://google.com/search/', 'https://google.com/']
    expect(actual).toEqual(expected)
})


test('getUrlsFromHTML invalid', () => {
    const inputHTMLBody = `
    <html>
    <body>
    <a href="invalid">Google</a>
    
    </body>
    </html>
    `
   
    const inputBaseURL = 'https://google.com'
    const actual = getUrlsFromHTML(inputHTMLBody, inputBaseURL)
    const expected = []
    expect(actual).toEqual(expected)
})