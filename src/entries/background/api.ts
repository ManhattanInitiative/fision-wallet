import { ApiEndpoint } from "~/lib/helpers/Api";
import { EMessages } from '../../lib/stores/messages';




class Test {

    @ApiEndpoint("HELLO_WORLD")
    /// @ts-ignore
    hello() {
        console.log("Hello World")
    }
}


export default Test