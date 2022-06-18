// import browser from "webextension-polyfill";

// browser.runtime.onInstalled.addListener(() => {
//   console.log("Extension installed");
// });

import WalletApi from "./api/WalletApi";
import SettingsApi from "./api/SettingsApi";

const settingsApi = new SettingsApi()
const walletApi = new WalletApi(settingsApi)

export { walletApi, settingsApi }