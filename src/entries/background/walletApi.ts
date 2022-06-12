import { ApiEndpoint } from "~/lib/helpers/Api";
import { WalletStore } from '../../lib/stores/types';
import { EMessages } from '../../lib/stores/messages';
import { WalletApiMessagesType } from "~/lib/constants/types";

class WalletApi {

    data: WalletStore = {
        isLocked: false,
        isInitialized: false,
        secret: "",
        numberOfAccounts: 0,
        selectedAccount: 0
    }

    @ApiEndpoint(WalletApiMessagesType.FETCH_WALLET_STATE)
    fetchWalletState(wallet: number) {
        // Fetch the state of the wallet, if is locked, unlocked etc.

        return {
            status: 1
        }
    }

    /* Method used to register a new wallet
    */
    @ApiEndpoint(WalletApiMessagesType.REGISTER_WALLET)
    registerWallet({ }) { }

    /* Method used to unlock/lock the wallet.
    *  Locking the wallet will require the wallet user to re input the passphrase
    */
    modifyWalletStatus() { }


    transferFunds() { }
}


export default WalletApi