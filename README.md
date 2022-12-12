# automail

## _Library für JavaScript-Frameworks zur Domain-Vervollständigung_
***

_automail_ ist eine Library zur Einbindung von E-Mail-Domain-Vorschlägen für beliebige JavaScript-Frameworks.

## Features

- Mittels eines Arrays wird festgelegt, welche Domain-Endungen bekannt sind
- Um geeignete Vorschläge zur Vervollständigung kümmert sich die Library
- bei gleichen Top-Level-Domains mit unterschiedlichen Endungen werden diese ebenfalls berücksichtigt

## Tech

Ein Vorteil von _automail_ ist seine geringe Abhängigkeit von anderen Dependencies:

- [js-levenshtein] - zur Berücksichtigung von eventuellen Tippfehlern des Nutzers bei seiner E-Mail-Eingabe

_automail_ selbst ist quelloffen mit einem [öffentlichen Repository][automail] auf GitHub.

## Installation

Dependency installieren (via _npm_):

```sh
npm install --save-dev automail
```
## Usage

### generelle Verwendung

Es wird vorausgesetzt, dass das Array nach Häufigkeit und absteigend sortiert vorliegt.

```
let bekannteDomains = [//Domains]
let input = eineImplementierungUmInputAuszulesen()

let suggestions = domainSuggestion(input, {bekannteDomains}) //optional auch die max. Anzahl an Vorschlägen: {bekannteDomains, 10}
```

### am Beispiel von _React Native_

```
sehr gutes Beispiel
```

### am Beispiel von _xy_

```
noch ein sehr gutes Beispiel
```

## License

MIT

[automail]: <https://github.com/konscheel/automail>
[js-levenshtein]: <https://github.com/gustf/js-levenshtein>