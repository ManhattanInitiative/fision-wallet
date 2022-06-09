import { Component, onMount, createSignal } from "solid-js";
import { shortAddress } from "~/lib/helpers/addressHelpers";
import walletManager from "~/lib/stores/wallet";
import QRCode from "qrcode";
import { router } from "~/entries/popup/App";

const ReceiveView: Component = () => {
  const [address, setAddress] = createSignal("");

  let qrCodeCanvas;

  onMount(async () => {
    try {
      const _address = walletManager.wallet()?.address;

      setAddress(_address);

      console.log(qrCodeCanvas);

      QRCode.toCanvas(qrCodeCanvas, `${address()}`, function (error) {
        if (error) console.error(error);
        console.log("success!");
      });
    } catch (err) {
      console.error(err);
    }
  });

  return (
    <>
      <div class="flex items-center justify-between border-y py-2 px-2 shadow-md bg-secondary-2 border-blue-500 w-full">
        <button onClick={() => router.setRoute("/")}>Go Back</button>
        <div class="flex flex-col items-center">
          <div class="text-sm">Account {walletManager.selectedAccount}</div>
          <div class="text-xs text-white text-opacity-50">
            {shortAddress(address())}

            <button
              onClick={() => {
                navigator.clipboard.writeText(`${address()}`);
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

      <input class="w-full" value={address()}></input>

      <button
        class="w-full inline-flex justify-center"
        onClick={() => {
          navigator.clipboard.writeText(`${address()}`);
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-5 w-5"
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
    </>
  );
};

export default ReceiveView;
