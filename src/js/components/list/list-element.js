function listElement(templateLoader, args){
    function primary(args){
        return templateLoader.load(TMPL_COMP_SRC_LIST_ELEM_HTML).then((res) =>
            res.replace("{PRIMARY_TEXT}", args.primaryText)
        );
    }

    function secondary(args){
        return templateLoader.load(TMPL_COMP_SRC_LIST_ELEM_DESC_HTML).then((res) =>
            res.replace("{PRIMARY_TEXT}", args.primaryText)
                .replace("{SECONDARY_TEXT}", args.secondaryText)
        );
    }

    function img(args){
        return templateLoader.load(TMPL_COMP_SRC_LIST_ELEM_IMG_HTML).then((res) =>
            res.replace("{PRIMARY_TEXT}", args.primaryText).replace("{IMG}", args.img)
        );
    }

    const htmlProm = function(args){
        switch(args.type){
            case "primary":
                return primary(args);
            case "secondary":
                return secondary(args);
            case "img":
                return img(args);
            default:
                return primary(args);
        }
    }(args);

    return htmlProm
        .then((string) => templateLoader.parseHTML(string))
        .then((html) => {
            app.navigation.add(html, args.data);
            return html;
        });
}
