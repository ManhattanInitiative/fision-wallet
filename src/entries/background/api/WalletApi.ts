import { STORAGE_KEYS } from '~/lib/constants/storage';
import { ApiEndpoint } from '~/lib/helpers/apiHelpers';
import Api from './Api';
import type SettingsApi from './SettingsApi';

export interface WalletData {
    status: "LOCKED" | "UNLOCKED"
}

export class WalletStorageCheck extends Api<{}> {
    constructor() {
        super("", false)
    }

    /*
    * An wallet can be initialized if the settings are set but the wallet secret isn't set
    */
    @ApiEndpoint("IS_INITIALIZED")
    async isInitialized() {
        try {
            const settingsStorageState = await this.hasStorage(STORAGE_KEYS.SETTINGS)

            if (settingsStorageState.status === 0) {
                return {
                    status: 0
                }
            }

            return {
                status: settingsStorageState.status
            }
        } catch (err) {
            return {
                status: 0
            }
        }
    }

    /*
    * An wallet can be registered if the settings are set and the wallet secret are set too
    */
    @ApiEndpoint("IS_REGISTERED")
    async isRegistered() {
        try {
            const settingsStorageState = await this.hasStorage(STORAGE_KEYS.SETTINGS)
            const walletStorageState = await this.hasStorage(STORAGE_KEYS.WALLET)

            if (settingsStorageState.status || walletStorageState.status === 0) {
                return {
                    status: 0
                }
            }

            return {
                status: 1
            }
        } catch (err) {
            return {
                status: 0
            }
        }
    }
}

export default class WalletApi extends Api<WalletData> {
    settingsApi: SettingsApi

    constructor(settingsApi: SettingsApi) {
        super(STORAGE_KEYS.WALLET, true, {
            status: "LOCKED"
        })

        this.settingsApi = settingsApi
    }

    async fetchWalletData() { }

    async modifyWalletStatus({ action, passphrase }: { action: "LOCK" | "UNLOCK", passphrase: string }) { }

    async initializeWallet({ secret, passphrase }: { secret: string, passphrase: string }) { }
}