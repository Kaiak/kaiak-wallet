# Nano KaiOS

A community driven [Nano](https://nano.org/) Wallet for [KaiOS](https://developer.kaiostech.com/).

This is an app built with  [Svelte](https://svelte.dev)

## Want to contribute?

Reach out to @citrullin or @mehl on the [Nano Discord server](https://chat.nano.org/).

## To run

First install [yarn](prerequisite), then.

install dependencies:

    $ yarn install
    
run dev server:

    $ yarn dev
    
Navigate to [localhost:5000](http://localhost:5000).


## To push to device

Ensure that you have `adb` installed, and that `$ adb devices` returns the connected device.

Publish to device with:

    $ yarn push
