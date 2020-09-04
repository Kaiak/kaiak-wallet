function receiveView(app, config){
    const templateLoader = app.templateLoader;

    app.navigation.clear();
    app.setHeader("Receive");

    let walletElements = [
        {
            primaryText: "main",
            type: "primary",
            data: { key: "main" }
        },
        {
            primaryText: "savings",
            type: "primary",
            data: { key: "savings" }
        }
    ];

    const promises = [
        templateLoader.load(TMPL_VIEW_SRC_RECEIVE_HTML).then((html) => templateLoader.parseHTML(html)),
        separator(templateLoader, {text: "Select your wallet"}),
        list(templateLoader, {elements: walletElements}),
        button(templateLoader, {text: "Generate address"})
    ];

    return Promise.all(promises).then((values) => {
        templateLoader.replaceHTMLTag(values[0], "wallet-select-seperator", values[1]);
        templateLoader.replaceHTMLTag(values[0], "wallet-list", values[2]);
        templateLoader.replaceHTMLTag(values[0], "generate-address-button", values[3]);

        return values[0];
    }).then(html => {
        app.navigation.init();
        return html;
    });
}