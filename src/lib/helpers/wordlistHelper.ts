

// 15 WORDS
export function getMnemonicPhrase(wordlist: string[]) {
    const _wordList = []

    for (let x = 0; x < 15; x++) {
        let word = wordlist[Math.floor(Math.random() * wordlist.length)]

        while (_wordList.indexOf(word) !== -1) {
            word = wordlist[Math.floor(Math.random() * wordlist.length)]
        }

        _wordList.push(word)
    }

    return _wordList.join(" ")
}