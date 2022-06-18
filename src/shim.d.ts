import { ProtocolMap, ProtocolWithReturn } from 'webext-bridge';


export { }

declare global {
    enum ApiMessages {
        //Wallet Messages
        "MANAGE_STATUS" = "MANAGE_STATUS",
        "WALLET_DATA" = "WALLET_DATA",
        "REGISTER_WALLET" = "REGISTER_WALLET",

        //Settings Messages
        "SETTINGS_DATA" = "SETTINGS_DATA",
        "MANAGE_RPC" = "MANAGE_RPC",

        //Wallet Check Messages
        "IS_INITIALIZED" = "IS_INITIALIZED",
        "IS_REGISTERED" = "IS_REGISTERED"
    }

    interface ApiReturnStatus {
        status: number
    }
}

declare module 'webext-bridge' {
    export interface ProtocolMap {
        [ApiMessages.LOCK_WALLET]: ProtocolWithReturn<undefined, ApiReturnStatus>
    }
}

