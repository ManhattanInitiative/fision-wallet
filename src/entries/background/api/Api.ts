import Browser from "webextension-polyfill"
import CryptoJS from 'crypto-js'


export default class Api<T> {
    data: T
    storageKey: string
    encrypted: boolean

    constructor(storageKey: string, encrypted = false, defaultValue?: T) {
        this.storageKey = storageKey
        this.encrypted = encrypted

        if (defaultValue !== undefined) {
            this.data = defaultValue
        }
    }

    async secureLoad(passphrase: string, storageKey = this.storageKey) {
        try {
            const rawStorageData = await Browser.storage?.local.get(storageKey)

            this.data = JSON.parse(CryptoJS.AES.decrypt(rawStorageData[storageKey], passphrase).toString(CryptoJS.enc.Utf8))

            return {
                status: 1
            }
        } catch (err) {
            console.error(err)

            return {
                status: 0
            }
        }
    }

    /* */
    async secureSave(passphrase: string, storageKey = this.storageKey) {
        try {
            await Browser.storage?.local.set({
                [storageKey]: CryptoJS.AES.encrypt(JSON.stringify(this.data), passphrase).toString()
            })

            return {
                status: 1
            }
        } catch (err) {
            console.error(err)

            return {
                status: 0
            }
        }
    }

    /* Save/Load the class state*/
    async load(storageKey = this.storageKey) {
        try {
            if (this.encrypted) {
                throw new Error("This api uses an encryped storage, please use secureLoad to load the state!")
            }

            const rawStorageData = await Browser.storage?.local.get(storageKey)

            this.data = JSON.parse(rawStorageData[storageKey])

            return {
                status: 1
            }
        } catch (err) {
            console.error(err)

            return {
                status: 0
            }
        }
    }

    async save(storageKey = this.storageKey) {
        try {
            if (this.encrypted) {
                throw new Error("This api uses an encryped storage, please use secureSave to save the state!")
            }

            await Browser.storage?.local.set({
                [storageKey]: JSON.stringify(this.data)
            })

            return {
                status: 1
            }
        } catch (err) {
            console.error(err)

            return {
                status: 0
            }
        }
    }
}