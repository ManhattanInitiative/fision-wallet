import { Component } from "solid-js";

import { router } from "~/entries/popup/App";

const SendView: Component = () => {
  return (
    <div class="flex flex-col">
      <button onClick={() => router.setRoute("/")}>Go Back</button>
      Sorry didn't had time to implement!
    </div>
  );
};

export default SendView;
