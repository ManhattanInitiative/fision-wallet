import { Component, createSignal, Show, Signal } from "solid-js";

export interface MnemonicShowProps {
  phrase: Signal<string>;
}

const placeholder =
  "AAA AAA AAA ZZZ BBB CCC VVV MMM PPP OOO RRR OOO RRR OOO RRROOO RRR";

const MnemonicShow: Component<MnemonicShowProps> = ({ phrase }) => {
  const [viewPhrase, setPhrase] = phrase;

  const [showMnemonic, setShowMnemonic] = createSignal(false);

  return (
    <div class="relative bg-gray-800 py-5 px-2 rounded-lg text-sm">
      <button
        onClick={() => setShowMnemonic((prev) => !prev)}
        class="absolute right-0 bottom-0 p-1 border border-blue-500 rounded-md hover:bg-blue-500"
      >
        Show
      </button>
      <div
        classList={{
          "blur-sm select-none": !showMnemonic(),
        }}
      >
        <Show when={showMnemonic()} fallback={<p>{placeholder}</p>}>
          <div>{viewPhrase()}</div>
        </Show>
      </div>
    </div>
  );
};

export default MnemonicShow;
