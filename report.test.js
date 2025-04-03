const { sortPages } = require("./report.js");
const { test, expect } = require('@jest/globals');

test('sortPages 2 pages', () => {
    const input = {
        'https://google.com/search': 1,
        'http://google.com': 3
    };
    const actual = sortPages(input);
    const expected = [
        ['http://google.com', 3],
        ['https://google.com/search', 1]
    ];
    expect(actual).toEqual(expected);
});

test('sortPages 5 pages', () => {
    const input = {
        'https://google.com/search/new': 4,
        'http://google.com': 3,
        'https://google.com/hello': 2,
        'https://google.com/search': 5,
        'https://google.com/search/old': 1
    };
    const actual = sortPages(input);
    const expected = [
        ['https://google.com/search', 5],
        ['https://google.com/search/new', 4],
        ['http://google.com', 3],
        ['https://google.com/hello', 2],
        ['https://google.com/search/old', 1],
        
    ];
    expect(actual).toEqual(expected);
});