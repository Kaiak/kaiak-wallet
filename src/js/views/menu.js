function menuView(app, config){
    const templateLoader = app.templateLoader;

    app.navigation.clear();
    app.setHeader('Menu');

    let menu = [
        {
            primaryText: "Receive",
            type: "primary",
            data: { key: "receive" }
        },
        {
            primaryText: "Send",
            type: "primary",
            data: { key: "send" }
        },
        {
            primaryText: "Balance",
            type: "primary",
            data: { key: "balance" }
        },
        {
            primaryText: "Transaction history",
            type: "primary",
            data: { key: "transaction_history" }
        },
        {
            primaryText: "About",
            type: "primary",
            data: { key: "about" }
        }
    ];

    const promises = [
        templateLoader.load(TMPL_VIEW_SRC_MENU_HTML).then(templateLoader.parseHTML),
        list(templateLoader, {elements: menu})
    ];

    return Promise.all(promises).then((values) => {
        const view = values[0];
        const list = values[1];

        templateLoader.replaceHTMLTag(view, "menu-list", list);
        return view;
    }).then(html => {
        app.navigation.init();
        return html;
    });
}