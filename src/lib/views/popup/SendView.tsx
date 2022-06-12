import { Component, onMount } from "solid-js";

import { router } from "~/entries/popup/App";

export interface SendViewProps {
  hello?: string;
}

const SendView: Component<SendViewProps> = (props) => {
  return (
    <div class="flex flex-col">
      <button onClick={() => router.goToRoute("/")}>Go Back</button>
      Sorry didn't had time to implement!
    </div>
  );
};

export default SendView;
