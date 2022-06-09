import { defineConfig, loadEnv } from "vite";
import webExtension from "@samrum/vite-plugin-web-extension";
import path from "path";
import { getManifest } from "./src/manifest";

import solidPlugin from 'vite-plugin-solid';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");

  return {
    plugins: [
      solidPlugin(),
      webExtension({
        manifest: getManifest(Number(env.MANIFEST_VERSION)),
      }),
    ],
    build: {
      target: 'esnext',
      polyfillDynamicImport: false,
    },
    resolve: {
      alias: {
        "~": path.resolve(__dirname, "./src"),
      },
    },
  };
});
