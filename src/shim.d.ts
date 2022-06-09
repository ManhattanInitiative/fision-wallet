import { EmptyRoot, Wallet } from 'fuels';
import { ProtocolWithReturn, onMessage } from 'webext-bridge';
import { EMessages } from '~/lib/stores/messages';
import { WalletStore } from './lib/stores/types';


declare module 'webext-bridge' {
    export interface ProtocolMap {
        [EMessages.INITIALIZE_WALLET]: ProtocolWithReturn<{ secret: string, passphrase: string }, { status: boolean }>
        [EMessages.LOCK_WALLET]: ProtocolWithReturn<{}, { status: boolean }>,
        [EMessages.UNLOCK_WALLET]: ProtocolWithReturn<{ passphrase: string }, { secret: string, selectedAccount: number, numberOfAccounts: number, status: boolean }>,
        [EMessages.FETCH_STORAGE_STATE]: ProtocolWithReturn<{}, { status: boolean }>,
        [EMessages.CLEAR_WALLET]: ProtocolWithReturn<{}, { status: boolean }>,
        [EMessages.FETCH_STORE]: ProtocolWithReturn<{}, WalletStore & { status: boolean }>
    }
}

/*
declare module 'webext-bridge' {
    export interface ProtocolMap {
        foo: { title: string }
        // to specify the return type of the message,
        // use the `ProtocolWithReturn` type wrapper
        bar: ProtocolWithReturn<CustomDataType, CustomReturnType>
    }
}
*/