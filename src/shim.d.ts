import { WalletApiMessages, ProviderRpcApiMessages } from './lib/constants/apiMessasges';

declare module 'webext-bridge' {
    export interface ProtocolMap extends WalletApiMessages, ProviderRpcApiMessages { }
}

