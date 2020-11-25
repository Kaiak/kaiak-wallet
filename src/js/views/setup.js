import list from "../components/list/list";
import separator from "../components/separator";
import button from "../components/button";
import {TMPL_VIEW_SRC_SETUP_HTML} from "../constants/tmp-src";

export default function setupView(app, config){
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
        list(app, templateLoader, {elements: languageData}),
        button(templateLoader, {text: "Add language"}),
        separator(templateLoader, {text: "Wallets"}),
        list(app, templateLoader, {elements: walletData}),
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
