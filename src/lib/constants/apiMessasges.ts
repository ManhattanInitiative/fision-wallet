import { ProtocolWithReturn } from 'webext-bridge';
import { walletApi } from '~/entries/background/data';
import WalletApi from '~/entries/background/walletApi';
import { WalletApiMessagesType } from './types';

/*
* INFO: Use string content for the messages type instead of int so that they will not tangle
*/

type ArgumentTypes<F extends Function> = F extends (...args: infer A) => any ? A : never;

export interface WalletApiMessages {
    [WalletApiMessagesType.FETCH_WALLET_STATE]: ProtocolWithReturn<ArgumentTypes<typeof walletApi.fetchWalletState>, ReturnType<typeof walletApi.fetchWalletState>>
}

export interface ProviderRpcApiMessages {

}



/*
[EMessages.INITIALIZE_WALLET]: ProtocolWithReturn<{ secret: string, passphrase: string }, { status: boolean }>
        [EMessages.LOCK_WALLET]: ProtocolWithReturn<{}, { status: boolean }>,
        [EMessages.UNLOCK_WALLET]: ProtocolWithReturn<{ passphrase: string }, { secret: string, selectedAccount: number, numberOfAccounts: number, status: boolean }>,
        [EMessages.FETCH_STORAGE_STATE]: ProtocolWithReturn<{}, { status: boolean }>,
        [EMessages.CLEAR_WALLET]: ProtocolWithReturn<{}, { status: boolean }>,
        [EMessages.FETCH_STORE]: ProtocolWithReturn<{}, {}>
*/