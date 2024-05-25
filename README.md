# vite-react-neutralino-template
Boilerplate for a desktop react app with Vite + React + Neutralino

Start with `yarn run init` and then use `yarn start` for development and `yarn build` for production.

Check the branches of this repo for different version combinations.

## Initialize

Before first use, you should run command `yarn run init` which will essentially run `neu update`. This command downloads the Neutralino binaries based on `neutralino.config.json`'s `cli.binaryVersion` property.

Note that you can also install custom versions of the binaries with `neu update <version>`. If you run `neu update --latest`, the latest version will be downloaded regardless of the property and the property will be updated.

## Development

During development, please run command `yarn start`. Let's see what it does:

1. `neu run` is run with some parameters overridden like `window-enable-inspector` to `true` for DevTools.
2. `neu run` also runs the corresponding command in the `neutralino.config.json`'s `cli.frontendLibrary.devCommand` property
	- the value of this property is `yarn vite-dev` which runs the `vite-dev` npm script or basically the `vite` command to start a Vite development server which listens for changes
3. `index.html` is patched (thanks to the `neutralino.config.json`'s `cli.frontendLibrary.patchFile` property) which changes `./__neutralino_globals.js` to `http://localhost:<port>/__neutralino_globals.js` with the correct _Neutralino port_.
	- Once the Neutralino window is closed, this value is reverted. If you terminate it in some other way, you need to manually revert the value when building the final app.
4. Neutralino starts listening for the _Development server's url_ defined in `neutralino.config.json`'s `cli.frontendLibrary.devUrl` property
5. While it waits, the parallel vite server is starting at port 5173, defined in `vite.config.js`. When the server is ready, the Neutralino window opens.
6. Neutralino will open the server's URL
7. It will load the `__neutralino_globals.js` file for global configs like NL_PORT and NL_TOKEN for authentication of the communication between Neutralino's server and the Vite server.
8. Sometimes this communication does not work directly (NL_TOKEN is empty) and that's why we have an if statement in `main.jsx`: `if (import.meta.env.DEV && !window.NL_TOKEN) {` (run only in development mode).
9. After calling `init()` in `main.jsx`, Neutralino tries to open a WebSocket connection using NL_TOKEN and NL_PORT
10. You do your development, freely save files and Neutralino refreshes them.
11. At the end, you click the X on the Neutralino window, which reverts the changes in `index.html` and terminates (operations defined in `main.jsx`; this is a workaround for a bug with `neutralino.config.json`'s `modes.window.exitProcessOnClose` property)

## Building for production

When you are building for production, you run `yarn build` which runs `neu build`

- The `buildCommand` for that is `yarn vite-build` or `NODE_ENV=production vite build`
	- This command tells Vite to build the project in `/dist`
- Neutralino then takes these build files and builds the Neutralino final product in `/dist/neutralinojs`