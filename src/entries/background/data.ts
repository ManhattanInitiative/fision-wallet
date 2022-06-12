import { Wallet } from 'fuels';
import { createStore } from 'solid-js/store';
import { onMessage } from 'webext-bridge'
import Browser from 'webextension-polyfill';
import { EMessages } from '~/lib/stores/messages';
import { WalletStore } from '~/lib/stores/types';
import { STORAGE_KEY } from '~/lib/stores/WalletManager';
import CryptoJS from 'crypto-js';
import Test from './api';

export const ROOT_PATH = `m/44'/60'/0'/0`

const dataState: WalletStore = {
    isLocked: true,
    isInitialized: false,
    secret: '',
    numberOfAccounts: 1,
    selectedAccount: 1
}

export interface WalletStorage {
    secret: string
}

onMessage(EMessages.INITIALIZE_WALLET, async ({ data }) => {
    try {
        const { secret, passphrase } = data

        const obj: WalletStorage = {
            secret: secret
        }

        let encryptedData = CryptoJS.AES.encrypt(JSON.stringify(obj), passphrase);

        await Browser.storage.local.set({
            [STORAGE_KEY]: encryptedData.toString()
        })

        return {
            status: true
        }
    } catch (error) {
        console.log("background:", error)

        return {
            status: false
        }
    }
})

onMessage(EMessages.LOCK_WALLET, async ({ data }) => {
    try {
        dataState.isLocked = true;
        dataState.secret = ""

        return { status: true }
    } catch (error) {
        console.log("background:", error)

        return {
            status: false
        }
    }
})

onMessage(EMessages.FETCH_STORE, async ({ data }) => {
    try {
        return { ...dataState, status: true }
    } catch (error) {
        console.log("background:", error)

        return {
            ...dataState,
            status: false
        }
    }
})

const test = new Test()

onMessage(EMessages.UNLOCK_WALLET, async ({ data }) => {
    try {
        const { passphrase } = data

        const rawStorageData = await Browser.storage.local.get(STORAGE_KEY)

        const storageData: WalletStorage = JSON.parse(CryptoJS.AES.decrypt(rawStorageData[STORAGE_KEY], passphrase).toString(CryptoJS.enc.Utf8))

        dataState.isLocked = false
        dataState.secret = storageData.secret

        return {
            secret: dataState.secret,
            numberOfAccounts: dataState.numberOfAccounts,
            selectedAccount: dataState.selectedAccount,
            status: true
        }
    } catch (error) {
        console.log("background:", error)

        return {
            secret: "",
            selectedAccount: 1,
            numberOfAccounts: dataState.numberOfAccounts,
            status: false
        }
    }
})

async function fetchStorageState({ data }) {
    try {
        const status = await Browser.storage?.local?.get(STORAGE_KEY)

        dataState.isInitialized = status[STORAGE_KEY] !== undefined

        return {
            status: dataState.isInitialized
        }
    } catch (error) {
        console.log("background:", error)

        return {
            status: false
        }
    }
}


onMessage(EMessages.CLEAR_WALLET, async ({ data }) => {
    try {
        await Browser.storage.local.clear()

        return await fetchStorageState({ data })
    } catch (error) {
        console.log("background:", error)

        return {
            status: false
        }
    }
})


onMessage(EMessages.FETCH_STORAGE_STATE, fetchStorageState)

// sendMessage("test", {
// test: "hell",
//                 }).then((val) => {
//     console.log("d:", val);
// });