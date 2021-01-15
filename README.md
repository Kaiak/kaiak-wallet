![Kaiak Logo](/media/kaiak_logo_wide_small.png)

A community driven [Nano](https://nano.org/) Wallet for [KaiOS](https://developer.kaiostech.com/).

This is an app built with [Svelte](https://svelte.dev).

## Want to contribute?

Reach out to @citrullin or @mehl on the [Nano Discord server](https://chat.nano.org/).

### Development

#### To run

First install [yarn](prerequisite), then.

Install dependencies:

    $ yarn install
    
Run dev server:

    $ yarn dev
    
Browse to [localhost:5000](http://localhost:5000).


#### To push to device

Ensure that you have `adb` installed, and that `$ adb devices` returns the connected device.

Publish to device with:

    $ yarn push

## Translating

We rely on the community to help us translate texts in the app. For now reach out on Discord and tell us what language 
you can translate to. Later we'll accept pull requests to improve any texts.

Kaiak is currently available in these languages:

* 🇺🇸 English (en_US)
* 🇮🇳 Hindi **hi_IN** – _Thanks_ Rahul Karda
* 🇨🇴 Spanish (Colombia) (es-CO) – _Thanks_ Alessandro C
* 🇳🇱 Dutch (nl-NL)
* 🇮🇷 Farsi (fa) – _Thanks_ Abolfazl Jafari
* 🇧🇷 Brazilian Portuguese (pt-BR) – _Thanks_ [@marcosbmf](https://github.com/marcosbmf)

### Add new language

1. Export language from [Traduora](https://traduora.com) as JSON to `/public/locales`
2. Run `$ yarn locales` to transform new language to .properties file, ensure country name is correct.
3. Add to project, and remember to update `manifest.webapp` with `subtitle` and `description`.

## Media files (Logos etc.)

[High resolution Media files](/media/) are available. 
Images and vector files are licensed under CC BY-NC-SA @ Philipp-Alexander Blum.

*What is allowed?*

We highly encourage the usage of all media material in the press. In For-profit, as well not-for-profit media.
So, if you want to use the logo in an article about the wallet, go for it!
The same goes for community sites, such as forums, discord servers etc. 
We highly encourage the usage of the media material for this purpose.

*What is not allowed?*
Merchandise products etc., such as T-Shirts etc. have to ask for permission in order to use the media material.

For questions about the license and requests for commercial usage, send an email to kaiak_media(you_know)jakiku.com.

## Press

For press inquiries, please use kaiak_press(you_know)jakiku.com.
