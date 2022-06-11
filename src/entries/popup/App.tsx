import AuthView from "~/lib/views/popup/AuthView";
import wallet from "~/lib/stores/wallet";
import { createSignal, onMount, Show } from "solid-js";
import walletManager from "~/lib/stores/wallet";
import AccountView from "~/lib/views/popup/AccountView";
import ReceiveView from "~/lib/views/popup/ReceiveView";
import SendView from "~/lib/views/popup/SendView";
import { Router, createRouter } from "~/lib/stores/createRouter";

export const router = createRouter(
  {
    "/": AccountView,
    "/receive": ReceiveView,
    "/send": SendView,
  },
  "/"
);

export default function App() {
  onMount(async () => {
    await walletManager.fetchStore();
  });

  return (
    <main class="w-96 h-128 bg-secondary-1 border border-secondary-2 text-white">
      <div class="w-full bg-secondary-2 py-2 px-2 rounded-b-md shadow-sm flex justify-between items-center">
        <h1>Fision</h1>
        <button class=" border border-blue-600 px-2 py-1 rounded-md">
          Network (Not Implemented)
        </button>
      </div>
      <div class="p-1">
        <Show
          when={wallet.isInitialized() && !wallet.isLocked()}
          fallback={AuthView}
        >
          <Router router={router}></Router>
        </Show>
      </div>
    </main>
  );
}
