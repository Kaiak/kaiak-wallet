function separator(templateLoader, args){
    return templateLoader.load(TMPL_COMP_SRC_SEPARATOR_HTML).then((res) =>
        res.replace("{TEXT}", args.text)
    ).then(templateLoader.parseHTML);
}