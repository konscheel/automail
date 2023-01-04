import {suggestDomains} from "../dist";

const knownDomains = ["gmail.com", "yahoo.com", "hotmail.com", "aol.com", "outlook.com", "comcast.net", "icloud.com",
    "msn.com", "hotmail.co.uk", "sbcglobal.net", "live.com", "yahoo.co.in", "me.com", "att.net", "mail.ru",
    "bellsouth.net", "rediffmail.com", "cox.net", "yahoo.co.uk", "verizon.net", "ymail.com", "hotmail.it", "kw.com",
    "yahoo.com.tw", "mac.com", "live.se", "live.nl", "yahoo.com.br", "googlemail.com", "libero.it", "web.de",
    "allstate.com", "btinternet.com", "online.no", "yahoo.com.au", "live.dk", "earthlink.net", "yahoo.fr", "yahoo.it",
    "gmx.de", "hotmail.fr", "shawinc.com", "yahoo.de", "moe.edu.sg", "163.com", "naver.com", "bigpond.com",
    "statefarm.com", "remax.net", "rocketmail.com", "live.no", "yahoo.ca", "bigpond.net.au", "hotmail.se", "gmx.at",
    "live.co.uk", "mail.com", "yahoo.in", "yandex.ru", "qq.com", "charter.net", "indeedemail.com", "alice.it",
    "hotmail.de", "bluewin.ch", "optonline.net", "wp.pl", "yahoo.es", "hotmail.no", "pindotmedia.com", "orange.fr",
    "live.it", "yahoo.co.id", "yahoo.no", "hotmail.es", "morganstanley.com", "wellsfargo.com", "juno.com", "wanadoo.fr",
    "facebook.com", "edwardjones.com", "yahoo.se", "fema.dhs.gov", "rogers.com", "yahoo.com.hk", "live.com.au",
    "nic.in", "nab.com.au", "ubs.com", "uol.com.br", "shaw.ca", "t-online.de", "umich.edu", "westpac.com.au",
    "yahoo.com.mx", "yahoo.com.sg", "farmersagent.com", "anz.com", "yahoo.dk", "dhs.gov"]

it('should start making suggestions when a character was typed after the @-symbol', () => {
    let input = 'username@g'
    let suggestions = suggestDomains(input, {domains: knownDomains})
    expect(suggestions).not.toHaveLength(0)
});

it('should start making suggestions when a number was typed after the @-symbol', () => {
    let input = 'username@1'
    let suggestions = suggestDomains(input, {domains: knownDomains})
    expect(suggestions).not.toHaveLength(0)
});

it('should not start making suggestions until a character was typed after the @-symbol', () => {
    let input = 'username@'
    let suggestions = suggestDomains(input, {domains: knownDomains})
    expect(suggestions).toHaveLength(0)
});

it('should not start making suggestions if the input can not result in a valid email address', () => {
    let input = 'username@@'
    expect(() => suggestDomains(input, {domains: knownDomains})).not.toThrow(TypeError)
});

it('should not crash if there is no @-symbol typed yet', () => {
    let input = 'username'
    let suggestions = suggestDomains(input, {domains: knownDomains})
    expect(suggestions).toHaveLength(0)
});

it('should limit the shown suggestions by 5 as standard', () => {
    let input = 'username@yahoo'
    let suggestions = suggestDomains(input, {domains: knownDomains})
    expect(suggestions).toHaveLength(5)
});

it('should limit the shown suggestions by the value passed as maxSuggestions', () => {
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
    expect(suggestions).toEqual(expect.arrayContaining(['gmail.com']))
});

it('should not crash for invalid parameters', () => {
    let input = ['username@yahoo']
    // @ts-ignore
    expect(suggestDomains(input, {domains: true})).toHaveLength(0)
    // @ts-ignore
    expect(() => suggestDomains(input, {domains: true})).not.toThrow('user input should be of type string.')
});