function button(templateLoader, args){
    return templateLoader.load(TMPL_COMP_SRC_BUTTON_HTML).then((res) =>
        res.replace("{TEXT}", args.text)
    ).then(templateLoader.parseHTML);
}