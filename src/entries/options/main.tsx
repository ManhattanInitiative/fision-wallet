/* @refresh reload */
import { render } from "solid-js/web";

import "~/lib/styles/global.css";

render(
  () => (
    <>
      <h1>Hello World </h1>
    </>
  ),
  document.getElementById("app") as HTMLElement
);
