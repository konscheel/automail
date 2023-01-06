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
import React, {useState} from 'react'
import {StyleSheet, View, TextInput} from 'react-native'
import {Picker} from "@react-native-picker/picker"
import {suggestDomains} from "@konscheel/automail/dist"

export default function SuggestionDropdown() {
    const domains = ["gmail.com", "yahoo.com", "hotmail.com", "aol.com", "outlook.com", "comcast.net", "icloud.com"]    
    const [input, setInput] = useState('')
    const [suggestions, setSuggestions] = useState([''])

    const handleInputChange = (text) => {
        setInput(text)
        const newSuggestions = suggestDomains(text, {domains})
        newSuggestions.unshift('')
        setSuggestions(newSuggestions)
    }

    return (
        <View>
            <TextInput
                value={input}
                onChangeText={handleInputChange}
                style={styles.textInput}
            />
            {suggestions.length > 1 &&
                <Picker
                    style={styles.picker}
                    selectedValue={''}
                    onValueChange={(value) => {
                        handleInputChange(input.slice(0, input.indexOf('@') + 1) + value)
                    }}>
                    {suggestions.map((suggestion) => (
                        <Picker.Item key={suggestion} label={suggestion} value={suggestion}/>))}
                </Picker>
            }
        </View>
    )
}

const styles = StyleSheet.create({
    textInput: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
    },
    picker: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
    }
})
```

## License
MIT


[automail]: <https://github.com/konscheel/automail>
[js-levenshtein]: <https://github.com/gustf/js-levenshtein>