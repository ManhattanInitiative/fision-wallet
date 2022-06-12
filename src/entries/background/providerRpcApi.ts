import { ApiEndpoint } from "~/lib/helpers/Api";
import { WalletProvidersRPCs } from '../../lib/stores/types';

class ProviderRpcApi {
    data: WalletProvidersRPCs = [
        {
            id: "localhost",
            name: "Localhost",
            url: "http://127.0.0.1:4000"
        }
    ]

    constructor() { }

    @ApiEndpoint("FETCH_RPCS")
    fetchRPCs() {
        return this.data
    }

    addNewRPC() { }

    removeRPC() { }
}

export default ProviderRpcApi