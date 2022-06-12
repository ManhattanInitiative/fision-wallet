import { ApiEndpoint, ApiManager } from "~/lib/helpers/Api";
import { EMessages } from '../../lib/stores/messages';
import { WalletStore } from '../../lib/stores/types';


@ApiManager
class WalletApi {

    data: WalletStore = {
        isLocked: false,
        isInitialized: false,
        secret: "",
        numberOfAccounts: 0,
        selectedAccount: 0
    }

    @ApiEndpoint("HELLO_WORLD")
    hello() {
        console.log("Hello World")
    }
}


export default WalletApi