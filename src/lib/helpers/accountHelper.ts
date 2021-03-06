import { Wallet } from "fuels";
import { ROOT_PATH } from "../constants/wallet";

export function getAccountFromMnemonic(secret: string, accountId: number = 1) {
    return Wallet.fromMnemonic(secret, `${ROOT_PATH}/${accountId}`)
}