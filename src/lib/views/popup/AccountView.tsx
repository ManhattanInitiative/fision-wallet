import {
  Component,
  createEffect,
  createResource,
  createSignal,
} from "solid-js";
import { shortAddress } from "~/lib/helpers/addressHelpers";
import walletManager from "~/lib/stores/wallet";
import Browser from "webextension-polyfill";
import wallet from "~/lib/stores/wallet";
import { BigNumber } from "fuels";
import { router } from "~/entries/popup/App";

async function fetchBalance(source, { value, refetching }) {
  // Fetch the data and return a value.
  //`source` tells you the current value of the source signal;
  //`value` tells you the last returned value of the fetcher;
  //`refetching` is true when the fetcher is triggered by calling `refetch()`,
  // or equal to the optional data passed: `refetch(info)`
  console.log(walletManager.wallet());
  const d = await walletManager.wallet()?.getBalances();
  console.log(d);
  return d;
}

const AccountView: Component = () => {
  const [balance, setBalance] = createSignal(BigNumber.from(0));

  createEffect(async () => {
    try {
      const [native] = await walletManager.wallet()?.getCoins();

      if (native !== undefined) {
        setBalance(native.amount);
      }
    } catch (err) {
      console.error(err);
    }
  });

  return (
    <>
      <div class="flex items-center justify-between border-y py-2 px-2 shadow-md bg-secondary-2 border-blue-500 w-full">
        <div>(Not Implemented)</div>
        <div class="flex flex-col items-center">
          <div class="text-sm">Account {walletManager.selectedAccount}</div>
          <div class="text-xs text-white text-opacity-50">
            {shortAddress(walletManager.wallet()?.address)}

            <button
              onClick={() => {
                navigator.clipboard.writeText(
                  `${walletManager.wallet()?.address}`
                );
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-3 w-3"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <div class="flex flex-col">
        <div class="text-sm w-full flex flex-col gap-1 items-center justify-center py-5 font-semibold">
          <div class="text-lg">{balance().toString()}</div>

          <div class="text-xs">ETH</div>
        </div>
        <div class="flex justify-center gap-2 border-y py-2 border-blue-500">
          <button
            onClick={() => {
              router.setRoute("/send");
            }}
            class="px-5 py-1 border border-blue-500 rounded-md hover:bg-blue-500 hover:bg-opacity-50"
          >
            Send
          </button>
          <button
            onClick={() => {
              router.setRoute("/receive");
            }}
            class="px-5 py-1 border border-blue-500 rounded-md hover:bg-blue-500 hover:bg-opacity-50"
          >
            Receive
          </button>
        </div>
      </div>

      <button
        onClick={() => {
          wallet.lockWallet();
        }}
      >
        Lock Wallet
      </button>
      <button
        onClick={() => {
          wallet.clearWallet();
        }}
      >
        Reset Wallet
      </button>
    </>
  );
};

export default AccountView;
