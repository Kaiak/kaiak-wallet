import button from "../../components/button";
import input from "../../components/input";

export default function sendAddressView(app, config){
    const templateLoader = app.templateLoader;

    app.setHeader('Send Nano by address');
    const promises = [
        input(templateLoader, {placeholder: "Insert a nano address", label: "Address", type: "text"}),
        input(templateLoader, {placeholder: "Insert an nano amount", label: "Amount", type: "number"}),
        button(templateLoader, {text: "Send"})
    ];

    return Promise.all(promises).then(values => {
       const view = document.createElement('div');
       values.forEach(element => view.appendChild(element));
       return view;
    });
}
