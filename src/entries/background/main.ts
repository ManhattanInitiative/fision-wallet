// import browser from "webextension-polyfill";

// browser.runtime.onInstalled.addListener(() => {
//   console.log("Extension installed");
// });

import WalletApi from "./api/WalletApi";
import SettingsApi from "./api/SettingsApi";
import { WalletStorageCheck } from './api/WalletApi';

const walletStorageCheck = new WalletStorageCheck()
const settingsApi = new SettingsApi()
const walletApi = new WalletApi(settingsApi)

export { walletApi, settingsApi, walletStorageCheck }