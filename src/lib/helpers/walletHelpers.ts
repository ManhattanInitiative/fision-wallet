


/**
 * Picks a random mnemonic phrase with length of 15 words
 */
export function pickRandomMnemonicPhrase(wordlist: string[], mnemonicLength = 15) {
    const mnemonicPhrase = []

    for (let x = 0; x < mnemonicLength; x++) {
        let word = wordlist[Math.floor(Math.random() * wordlist.length)]

        while (mnemonicPhrase.indexOf(word) !== -1) {
            word = wordlist[Math.floor(Math.random() * wordlist.length)]
        }

        mnemonicPhrase.push(word)
    }

    return mnemonicPhrase.join(" ")
}