/* @refresh reload */
import { render } from "solid-js/web";
import renderContent from "../renderContent";

import "~/lib/styles/global.css";

renderContent(import.meta.PLUGIN_WEB_EXT_CHUNK_CSS_PATHS, (appRoot) => {
  render(() => <></>, appRoot);
});
