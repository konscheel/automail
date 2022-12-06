const levenshtein = require('js-levenshtein');

type Options = { //nur für undefined, also null, 0 oder leerer String muss nochmal extra behandelt werden
    domains: Array<string>,
    maxSuggestions?: number,
}

//TODO: try catch block, mit console.error() loggen: __DEV__; userInputs, domains, maxSuggestions mitgeben

//TODO: im Test ausprobieren: Object vs. Destructuring
function domainSuggestion(userInput: string, {domains, maxSuggestions}: Options) {
    const suggestions = []
    try {
        if (typeof userInput !== 'string') {
            throw Error("user input should be of type string.")
        }
    const indexAfterAT = userInput.indexOf('@') + 1
    maxSuggestions = maxSuggestions ? maxSuggestions : 5 //Tests schreiben für Edge cases

        if (indexAfterAT > 0  && userInput.length > indexAfterAT && !validDomain(userInput.slice(indexAfterAT))) { //TODO: besseren Regex bauen
            const [_, userDomain] = /.+@(\w+)\.?/.exec(userInput)
            const levenshteinSuggestions = []

            domains.forEach((domain) => {
                let knownDomainBeforeDot = domain.slice(0, domain.indexOf('.'))
                if (domain.startsWith(userDomain) && suggestions.length < maxSuggestions) {
                    suggestions.push(domain)
                } else if (levenshtein(userDomain, knownDomainBeforeDot) < 3) {
                    levenshteinSuggestions.push(domain)
                }
            })

            if (levenshteinSuggestions.length != 0 && suggestions.length < maxSuggestions) {
                levenshteinSuggestions.forEach((suggestion) => {
                    if (suggestions.length < maxSuggestions) {
                        suggestions.push(suggestion)
                    }
                })
            }
        }
        return suggestions
    }
    catch (error) {
        console.error(error)
        return []
    }
}

function validDomain(domain) {
    return /(\w+)\.\w+\.?\w+/.test(domain);
}

export {domainSuggestion}