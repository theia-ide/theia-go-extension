# Theia Go Extension

An extension for the Theia-IDE to support the Go language, using the [Go language server](https://github.com/theia-ide/go-language-server).

## Getting started

Install [nvm](https://github.com/creationix/nvm#install-script).

    curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.5/install.sh | bash

Install npm and node.

    nvm install 8
    nvm use 8

Install yarn.

    npm install -g yarn

## Running the browser example

    yarn rebuild:browser
    cd browser-app
    yarn start

Open http://localhost:3000 in the browser.

## Running the Electron example

    yarn rebuild:electron
    cd electron-app
    yarn start

## Developing with the browser example

Start watching of the hello world extension.

    cd go-extension
    yarn watch

Start watching of the browser example.

    yarn rebuild:browser
    cd browser-app
    yarn watch

Launch `Start Browser Backend` configuration from VS code.

Open http://localhost:3000 in the browser.

## Developing with the Electron example

Start watching of the hello world extension.

    cd go-extension
    yarn watch

Start watching of the electron example.

    yarn rebuild:electron
    cd electron-app
    yarn watch

Launch `Start Electron Backend` configuration from VS code.

## Publishing go-extension

Create a npm user and login to the npm registry, [more on npm publishing](https://docs.npmjs.com/getting-started/publishing-npm-packages).

    npm login

Publish packages with lerna to update versions properly across local packages, [more on publishing with lerna](https://github.com/lerna/lerna#publish).

    npx lerna publish
