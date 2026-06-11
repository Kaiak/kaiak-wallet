DEPRECATED! USE ON YOUR OWN RISK!

![Kaiak Logo](/media/kaiak_logo_wide_small.png)

A community driven [Nano](https://nano.org/) Wallet for [KaiOS](https://developer.kaiostech.com/).

This is an app built with [Svelte](https://svelte.dev).

## Want to contribute?

Reach out to @citrullin or @mehl on the [Nano Discord](https://chat.nano.org/), or the **#kaiak** channel on the [Nano Center Discord](http://discord.nanocenter.org/)

We could use help with:

* [Next version of Kaiak](https://github.com/Kaiak/kaiak-wallet/milestone/1)
* [Known issues](https://github.com/Kaiak/kaiak-wallet/issues)
* [Translations](https://github.com/Kaiak/kaiak-wallet#translating)

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

* 🇺🇸 [American English](/public/locales/en-US.properties)
* 🇮🇳 [Hindi](/public/locales/hi.properties) – _Thanks_ [@rahulkarda](https://github.com/rahulkarda)
* 🇨🇴 [Colombian Spanish](/public/locales/es-US.properties) – _Thanks_ Alessandro C
* 🇳🇱 [Dutch](/public/locales/nl.properties)
* 🇮🇷 [Farsi](/public/locales/fa.properties) – _Thanks_ Abolfazl Jafari
* 🇧🇷 [Brazilian Portuguese](/public/locales/pt-BR.properties) – _Thanks_ [@marcosbmf](https://github.com/marcosbmf) and [@guil5566](https://github.com/guil5566)
* 🇷🇺 [Russian](/public/locales/ru-RU.properties) – _Thanks_ [@Rtif173](https://github.com/Rtif173)
* 🇩🇰 [Danish](/public/locales/da-DK.properties) – _Thanks_ [@Lrss](https://github.com/Lrss)

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
