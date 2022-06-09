# fision wallet extension for fuel.network hackaton 2022

This wallet was made for the fuel.network hackaton. The intention was that the wallet would manage multiple accounts, send/receive native assets, inject a provider into a web page for dapps to work and to support multiple networks.

At this moment just some basics features are implemented:

- Generate wallet with a new mnemonic phrase
- Import wallet from mnemonic phrase (not sure if it works 100%)
- Lock/Unlock Wallet
- Set password for the wallet
- See #1 wallet address
- See native balance (not sure exactly if it works, sorry)

A lot more had to be implemented but the time wasn't enough :(

The wallet data is stored inside `entities/background/main.ts`.
The stores from popup directory exists just for reactivity purposes.
The wallet is recreated from mnemonic phrase inside the popup because the serialization doesn't works correctly.
Technically every information from the wallet is public to the user or any software that exists on the user machine. You can lock the wallet and the stores will be cleared.

## Project Setup

```sh
npm install
```

## Commands

### Build

#### Development, HMR

Hot Module Reloading is used to load changes inline without requiring extension rebuilds and extension/page reloads

```sh
npm run dev
```

#### Development, Watch

Rebuilds extension on file changes. Requires a reload of the extension (and page reload if using content scripts)

```sh
npm run watch
```

#### Production

Minifies and optimizes extension build

```sh
npm run build
```

### Load extension in browser

Loads the contents of the dist directory into the specified browser

```sh
npm run serve:chrome
```

```sh
npm run serve:firefox
```
