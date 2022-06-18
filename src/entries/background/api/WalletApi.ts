import { STORAGE_KEYS } from '~/lib/constants/storage';
import Api from './Api';
import type SettingsApi from './SettingsApi';

export interface WalletData {
    status: "LOCKED" | "UNLOCKED"
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