# automail

## _Library for JavaScript-Frameworks to complete email domains_

_automail_ is a library that works with any JavaScript framework and provides functionalities to integrate email
suggestions.

![GitHub package.json version](https://img.shields.io/github/package-json/v/konscheel/automail)
![GitHub](https://img.shields.io/github/license/konscheel/automail)
[![semantic-release: angular](https://img.shields.io/badge/semantic--release-angular-e10079?logo=semantic-release)](https://github.com/semantic-release/semantic-release)

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

It is required to provide an array of domains which are sorted by frequency in descending order.

For example, analysing [GMass' domain statistics][GMass] would lead to following array: 

```
["gmail.com", "yahoo.com", "hotmail.com", "aol.com", "outlook.com", "comcast.net", "icloud.com", "msn.com", "hotmail.co.uk", "sbcglobal.net", "live.com", "yahoo.co.in", "me.com", "att.net", "mail.ru", "bellsouth.net", "rediffmail.com", "cox.net", "yahoo.co.uk", "verizon.net", "ymail.com", "hotmail.it", "kw.com", "yahoo.com.tw", "mac.com", "live.se", "live.nl", "yahoo.com.br", "googlemail.com", "libero.it", "web.de", "allstate.com", "btinternet.com", "online.no", "yahoo.com.au", "live.dk", "earthlink.net", "yahoo.fr", "yahoo.it", "gmx.de", "hotmail.fr", "shawinc.com", "yahoo.de", "moe.edu.sg", "163.com", "naver.com", "bigpond.com", "statefarm.com", "remax.net", "rocketmail.com", "live.no", "yahoo.ca", "bigpond.net.au", "hotmail.se", "gmx.at", "live.co.uk", "mail.com", "yahoo.in", "yandex.ru", "qq.com", "charter.net", "indeedemail.com", "alice.it", "hotmail.de", "bluewin.ch", "optonline.net", "wp.pl", "yahoo.es", "hotmail.no", "pindotmedia.com", "orange.fr", "live.it", "yahoo.co.id", "yahoo.no", "hotmail.es", "morganstanley.com", "wellsfargo.com", "juno.com", "wanadoo.fr", "facebook.com", "edwardjones.com", "yahoo.se", "fema.dhs.gov", "rogers.com", "yahoo.com.hk", "live.com.au", "nic.in", "nab.com.au", "ubs.com", "uol.com.br", "shaw.ca", "t-online.de", "umich.edu", "westpac.com.au", "yahoo.com.mx", "yahoo.com.sg", "farmersagent.com", "anz.com", "yahoo.dk", "dhs.gov"]
```


### General Usage

```
let knownDomains = [//domains]
let input = evaluateUserInput()

let suggestions = domainSuggestion(input, {knownDomains}) //optional max. count of suggestions: {knownDomains, 10}
```

### _React Native_ Example

```
import React, {useCallback, useEffect, useState} from 'react';
import {FlatList, Text, TextInput, TouchableOpacity, View} from "react-native"
import {suggestFullEmails} from '@konscheel/automail'

export function SuggestionsDropdown() {

    const domains = [//domains]
    
    const [input, setInput] = useState('')
    const [suggestions, setSuggestions] = useState([])
    
    const renderItem = useCallback(({item}) => {
        return (
            <Suggestion
                suggestion={item}
                onPress={setInput}/>
        )
    }, [suggestions])

    useEffect(() => {
        setSuggestions(suggestFullEmails(input, {domains}))
    }, [input])

    return (
        <View>
            <TextInput
                onChangeText={setInput}
                value={input}
                placeholder={'E-Mail-Adresse'}/>
            <View>
                <FlatList data={suggestions} renderItem={renderItem}/>
            </View>

        </View>
    )
}

function Suggestion({suggestion, onPress}) {
    return (
        <TouchableOpacity onPress={() => onPress(suggestion)}>
            <Text>{suggestion}</Text>
        </TouchableOpacity>
    )
}
```

## Contribute

_automail_ uses [semantic-release][semantic-release] and [commitlint][commitlint] to manage versioning and publishing
automatically.

For those interested in the motivation behind _automail_: this project is part of a final exam to finish the
apprenticeship as an application developer.

## License

MIT


[automail]: <https://github.com/konscheel/automail>

[js-levenshtein]: <https://github.com/gustf/js-levenshtein>

[semantic-release]: <https://github.com/semantic-release/semantic-release>

[commitlint]: <https://github.com/conventional-changelog/commitlint>

[GMass]: <https://www.gmass.co/domains>