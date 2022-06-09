

export interface WalletStore {
    isLocked: boolean,
    isInitialized: boolean,
    secret: string,
    numberOfAccounts: number,
    selectedAccount: number
}