# Nano KaiOS

This is an app built with  [Svelte](https://svelte.dev)

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

    $ yarn publish
