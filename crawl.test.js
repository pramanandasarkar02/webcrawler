
const {normalizeUrl} = require('./crawl.js')

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