"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.suggestFullEmails = exports.suggestDomains = void 0;
const levenshtein = require('js-levenshtein');
function suggestDomains(userInput, { domains, maxSuggestions }) {
    try {
        const domainInput = validateInput(userInput);
        if (domainInput) {
            maxSuggestions = maxSuggestions ? maxSuggestions : 5;
            const suggestions = [];
            const levenshteinSuggestions = [];
            const regExp = /(\w+)\.?/;
            const [_, userDomain] = regExp.exec(domainInput);
            domains.forEach((domain) => {
                const [_, domainSection] = regExp.exec(domain);
                if (suggestions.length < maxSuggestions && domain.startsWith(userDomain)) {
                    suggestions.push(domain);
                }
                else if (levenshtein(userDomain, domainSection) < 3) {
                    levenshteinSuggestions.push(domain);
                }
            });
            levenshteinSuggestions.forEach((suggestion) => {
                if (suggestions.length < maxSuggestions) {
                    suggestions.push(suggestion);
                }
            });
            return suggestions;
        }
        else
            return [];
    }
    catch (error) {
        console.error(error + "\nUser input: " + userInput + "\nKnown domains: " + domains, "\nMax suggestions: " + maxSuggestions);
        return [];
    }
}
exports.suggestDomains = suggestDomains;
function suggestFullEmails(userInput, { domains, maxSuggestions }) {
    return suggestDomains(userInput, { domains, maxSuggestions }).map(domain => userInput.slice(0, userInput.indexOf('@') + 1) + domain);
}
exports.suggestFullEmails = suggestFullEmails;
function validateInput(userInput) {
    if (typeof userInput !== 'string') {
        throw Error("User input should be of type string.");
    }
    const indexAfterAT = userInput.indexOf('@') + 1;
    if (indexAfterAT > 0) {
        const domainInput = userInput.slice(indexAfterAT);
        return /^(\w+\.\w+\.?\w+|(?=\W).*)$/.test(domainInput) ? false : domainInput;
    }
}
//# sourceMappingURL=index.js.map