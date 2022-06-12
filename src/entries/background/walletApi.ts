import { ApiEndpoint } from "~/lib/helpers/Api";
import { EMessages } from '../../lib/stores/messages';
import { WalletStore } from '../../lib/stores/types';


class WalletApi {

    data: WalletStore = {
        isLocked: false,
        isInitialized: false,
        secret: "",
        numberOfAccounts: 0,
        selectedAccount: 0
    }

    @ApiEndpoint("HELLO_WORLD")
    fetchWalletState() {
        // Fetch the state of the wallet, if is locked, unlocked etc.
    }

    registerWallet() { }

    // UNLOCK or LOCK
    modifyWalletStatus() { }
}


export default WalletApi