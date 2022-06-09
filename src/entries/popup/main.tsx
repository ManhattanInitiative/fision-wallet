/* @refresh reload */
import { render } from "solid-js/web";
import "~/lib/styles/global.css";
import { Router } from "solid-app-router";
import App from "./App";

render(
  () => (
    <Router>
      <App />
    </Router>
  ),
  document.getElementById("app") as HTMLElement
);
