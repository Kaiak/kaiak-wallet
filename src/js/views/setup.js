function setupView(app, config){
    const templateLoader = app.templateLoader;

    app.setHeader('Setup');

    const languageData = [
        {
            primaryText: "English",
            type: "primary",
            data: { key: "english" }
        }
    ];

    const walletData = [
        {
            primaryText: "Main",
            type: "primary",
            data: { key: "main" }
        }
    ];

    const promises = [
        templateLoader.load(TMPL_VIEW_SRC_SETUP_HTML).then(templateLoader.parseHTML),
        separator(templateLoader, {text: "Languages"}),
        list(templateLoader, {elements: languageData}),
        button(templateLoader, {text: "Add language"}),
        separator(templateLoader, {text: "Wallets"}),
        list(templateLoader, {elements: walletData}),
        button(templateLoader, {text: "Add wallet"}),
        button(templateLoader, {text: "Save"})
    ];

    return Promise.all(promises).then((values) => {
        const [view, ...elements] = values;
        elements.forEach(element => view.appendChild(element));

        console.log("Setup loaded");

        return view;
    });
}
