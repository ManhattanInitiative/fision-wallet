import Browser from "webextension-polyfill"
import { STORAGE_KEYS } from "~/lib/constants/storage"
import { ApiEndpoint } from "~/lib/helpers/apiHelpers"
import Api from './Api';

export interface SettingsData {
    rpcUrls: { id: string, label: string, url: string }[]
}

export default class SettingsApi extends Api<SettingsData> {
    constructor() {
        super(STORAGE_KEYS.SETTINGS, false, {
            rpcUrls: [{
                id: "localhost",
                label: "Localhost",
                url: "http://127.0.0.1:4000"
            }]
        })
    }

    @ApiEndpoint("FETCH_SETTINGS")
    async fetchSettings({ }) {
        try {

            return this.data
        } catch (err) { }
    }

    @ApiEndpoint("ADD_RPC")
    addNewRpc({ label, url }: { label: string, url: string }) {

    }


}