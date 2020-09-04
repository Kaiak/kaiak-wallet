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
        const [view, languageSep, languageList, addLangButton, walletSep, walletList, addWalletButton, saveButton] = values;

        view.appendChild(languageSep);
        view.appendChild(languageList);
        view.appendChild(addLangButton);
        view.appendChild(walletSep);
        view.appendChild(walletList);
        view.appendChild(addWalletButton);
        view.appendChild(saveButton);

        console.log("Setup loaded");

        return view;
    });
}
