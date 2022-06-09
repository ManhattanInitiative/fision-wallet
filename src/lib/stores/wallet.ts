import { createStore } from "solid-js/store";
import { sendMessage } from "webext-bridge";
import { EMessages } from './messages';
import { Wallet } from 'fuels';
import wallet from '~/lib/stores/wallet';
import { ROOT_PATH } from "~/entries/background/data";


const walletManager = (() => {
    const [stateData, setStateData] = createStore({
        isLocked: true,
        isInitialized: false,
        wallet: undefined,
        selectedAccount: 1,
        numberOfAccounts: 1,
        secret: "",
    })

    async function fetchStore() {
        const data = await sendMessage(EMessages.FETCH_STORE, {})

        console.log(data)

        const { secret, selectedAccount, numberOfAccounts, isInitialized, isLocked, status } = data

        if (status) {
            setStateData({
                isLocked,
                isInitialized,
                selectedAccount,
                numberOfAccounts,
                secret,
            })

            try {
                if (secret.length > 0) {
                    setStateData({
                        wallet: Wallet.fromMnemonic(secret, `${ROOT_PATH}/${stateData.selectedAccount}`)
                    })

                    console.log(stateData)
                }
            } catch (error) { console.error(error) }
        } else {
            setStateData({
                isLocked: true,
                isInitialized: false,
                selectedAccount: 1,
                numberOfAccounts: 1,
                secret: "",
            })
        }

        return status
    }

    async function initializeWallet(secret: string, passphrase: string) {
        const { status } = await sendMessage(EMessages.INITIALIZE_WALLET, {
            secret: secret,
            passphrase: passphrase,
        });

        await fetchInitializedStatus()

        return {
            status
        }
    }

    async function lockWallet() {
        await sendMessage(EMessages.LOCK_WALLET, {})

        setStateData("isLocked", true)
    }

    async function unlockWallet(passphrase: string) {
        const { status, secret, selectedAccount, numberOfAccounts } = await sendMessage(EMessages.UNLOCK_WALLET, { passphrase })

        if (status === true) {
            setStateData("secret", secret)
            setStateData("numberOfAccounts", numberOfAccounts)
            setStateData("selectedAccount", selectedAccount)
            setStateData("isLocked", false)

            if (!stateData.isInitialized)
                setStateData("isInitialized", true)
        } else {
            setStateData("isLocked", false)
            setStateData("secret", "")
        }

        return status
    }

    async function clearWallet() {
        const { status } = await sendMessage(EMessages.CLEAR_WALLET, {})

        if (status === true) {
            setStateData("wallet", undefined)
            setStateData("isLocked", false)
            setStateData("isInitialized", false)
            setStateData("secret", "")
        }

        return { status }
    }

    async function fetchInitializedStatus() {
        const { status } = await sendMessage(EMessages.FETCH_STORAGE_STATE, {})

        setStateData("isInitialized", status)

        return stateData.isInitialized
    }

    return {
        wallet: (): undefined | Wallet => stateData.wallet,
        selectedAccount: () => stateData.selectedAccount,
        isInitialized: () => stateData.isInitialized,
        isLocked: () => stateData.isLocked,
        initializeWallet, lockWallet, unlockWallet, clearWallet,
        fetchInitializedStatus, fetchStore
    }
})()

export default walletManager