import Browser from "webextension-polyfill"
import { STORAGE_KEYS } from "~/lib/constants/storage"
import { ApiEndpoint } from "~/lib/helpers/apiHelpers"
import Api from './Api';
import type { WalletStorageCheck } from './WalletApi';

export interface SettingsData {
    rpcUrls: { id: string, label: string, url: string }[]
}

export default class SettingsApi extends Api<SettingsData> {
    walletStorageCheck: WalletStorageCheck

    constructor(walletStorageCheck: WalletStorageCheck) {
        super(STORAGE_KEYS.SETTINGS, false, {
            rpcUrls: [{
                id: "localhost",
                label: "Localhost",
                url: "http://127.0.0.1:4000"
            }]
        })

        this.walletStorageCheck = walletStorageCheck
    }

    @ApiEndpoint(ApiMessages.SETTINGS_DATA)
    async fetchSettings({ }) {
        try {
            return this.data
        } catch (err) { }
    }

    @ApiEndpoint(ApiMessages.MANAGE_RPC)
    async manageRpc({ label, url }: { label: string, url: string }) {

    }


}