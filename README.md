# automail

## _Library for JavaScript-Frameworks to complete email domains_
_automail_ is a library that works with any JavaScript framework and provides functionalities to integrate email suggestions.


## Features
- An array determines which domain endings are known
- The library generates suitable suggestions
- Possible occurrences of typos is considered by [Levenshtein distance][js-levenshtein]

_automail_ is open source with a [public repository][automail] on GitHub.


## Installation
Install dependency (via _npm_):
```sh
npm install --save-dev automail
```


## Usage

### Requirements
It is required to provide an array of domains that are sorted by frequency in descending order. 


### General Usage
```
let knownDomains = [//domains]
let input = implementFunctionToEvaluateUserInput()

let suggestions = domainSuggestion(input, {knownDomains}) //optional max. count of suggestions: {knownDomains, 10}
```


### _React Native_ Example
```
sehr gutes Beispiel
```

### _XY_ Example
```
noch ein sehr gutes Beispiel
```

## License
MIT


[automail]: <https://github.com/konscheel/automail>
[js-levenshtein]: <https://github.com/gustf/js-levenshtein>