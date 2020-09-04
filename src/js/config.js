const config =
    {
        lang: "en-US",
        templates: {
            base: "/src/tmpl",
            views: {
                setup: "setup.html",
                balance: "balance.html",
                menu: "menu.html",
                receive: "receive.html",
                send: {
                    base: "/send",
                    selection: "selection.html",
                    address: "address.html",
                    qr_code: "qr.html"
                },
                settings: "settings.html",
                transaction_history: "account-list.html",
                about: "about.html"
            },
            components: {

            }
        }
    };