
export const WALLET_STORE_KEY = ""

export interface WalletStore {
    isLocked: boolean,
    isInitialized: boolean,
    secret: string,
    numberOfAccounts: number,
    selectedAccount: number
}

export type WalletProvidersRPCs = {
    id: string
    url: string,
    name: string
}[]



