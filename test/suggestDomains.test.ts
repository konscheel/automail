import {suggestDomains} from "../dist";

const knownDomains = ['web.de', 'gmx.de', 'gmx.net', 'mein.gmx', 'gmx.at', 'gmx.ch', 'gmail.com', 'googlemail.com',
    'outlook.com', 'outlook.de', 't-online.de', 'freenet.de', 'yahoo.com', 'yahoo.fr', 'yahoo.co.uk', 'yahoo.com.br',
    'yahoo.co.in', 'yahoo.es', 'yahoo.it', 'yahoo.de', 'yahoo.in', 'yahoo.ca', 'yahoo.com.au', 'yahoo.co.jp',
    'yahoo.com.ar', 'yahoo.com.mx', 'yahoo.co.id', 'yahoo.com.sg', 'aol.com']

it('should start making suggestions when a character was typed after the @-symbol',  () => {
    let input = 'username@g'
    let suggestions = suggestDomains(input, {domains: knownDomains})
    expect(suggestions).not.toHaveLength(0)
});

it('should not start making suggestions until a character was typed after the @-symbol', () => {
    let input = 'username@'
    let suggestions = suggestDomains(input, {domains: knownDomains})
    expect(suggestions).toHaveLength(0)
});

it('should not crash if there is no @-symbol typed yet', () => {
    let input = 'username'
    let suggestions = suggestDomains(input, {domains: knownDomains})
    expect(suggestions).toHaveLength(0)
});

it('should limit the shown suggestions by 5 as standard',  () => {
    let input = 'username@yahoo'
    let suggestions = suggestDomains(input, {domains: knownDomains})
    expect(suggestions).toHaveLength(5)
});

it('should limit the shown suggestions by the value passed as maxSuggestions',  () => {
    let input = 'username@yahoo'
    let suggestions = suggestDomains(input, {domains: knownDomains, maxSuggestions: 10})
    expect(suggestions).toHaveLength(10)
});

it('should make no suggestions if input is already a valid domain', () => {
    let input = 'username@gmail.com'
    let suggestions = suggestDomains(input, {domains: knownDomains})
    expect(suggestions).toHaveLength(0)
})

it('should order the suggestions descending by frequency (first array entry is viewed as the most frequently used address and so on)', () => {
    let knownDomains = ['gmx.net', 'gmail.com', 'googlemail.com', 'gmx.de', 'gala.com']
    let input = 'username@g'
    let suggestions = suggestDomains(input, {domains: knownDomains})
    expect(suggestions[0]).toBe('gmx.net')
    expect(suggestions[4]).toBe('gala.com')
});

it('should order the suggestions for equal domains with different endings descending by frequency', () => {
    let knownDomains = ['gmx.net', 'gmail.com', 'googlemail.com', 'gmx.de', 'gala.com']
    let input = 'username@gmx'
    let suggestions = suggestDomains(input, {domains: knownDomains})
    expect(suggestions[0]).toBe('gmx.net')
    expect(suggestions[1]).toBe('gmx.de')
});

it('should still make reasonable suggestions if the input has typos ', () => {
    let input = 'username@gnail'
    let suggestions = suggestDomains(input, {domains: knownDomains})
    expect(suggestions).toEqual(['gmail.com'])
});

it('should not crash for invalid parameters', () => {
    let input = ['username@yahoo']
    // @ts-ignore
    expect(suggestDomains(input, {domains: true})).toHaveLength(0)
    // @ts-ignore
    expect(() => suggestDomains(input, {domains: true})).not.toThrow('user input should be of type string.')
});