import list from "../components/list/list";
import separator from "../components/separator";
import {TMPL_VIEW_SRC_BALANCE_HTML} from "../constants/tmp-src";

export default function balanceView(app, config){
    const templateLoader = app.templateLoader;

    app.navigation.clear();
    app.setHeader("Balance");

    const accounts = [
        {
            name: "Main",
            key: "main",
            balance: 10.12,
            last_update: "10/03/2020 10:23"
        },
        {
            name: "Savings",
            key: "savings",
            balance: 30.23,
            last_update: "10/03/2020 10:23"
        }
    ];

    return templateLoader.load(TMPL_VIEW_SRC_BALANCE_HTML).then(templateLoader.parseHTML).then(view => {
        let promises = accounts.map(account => {
            let data = {
                primaryText: account.balance,
                secondaryText: account.last_update,
                type: "secondary",
                data: { key: account.key }
            };

            let promise = [
                separator(templateLoader, {text: account.name}),
                list(app, templateLoader, {elements: [data]})
            ];

            return Promise.all(promise).then(values => {
                let separator = values[0];
                let li = values[1];
                view.appendChild(separator);
                view.appendChild(li);

                return view;
            });
        });

        return Promise.all(promises);
    })
}
