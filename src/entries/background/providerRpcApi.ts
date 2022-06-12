import { ApiEndpoint, ApiManager } from "~/lib/helpers/Api";
import { WalletProvidersRPCs } from '../../lib/stores/types';

@ApiManager
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


}

export default ProviderRpcApi