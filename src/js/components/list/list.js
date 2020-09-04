function list(templateLoader, args){
    const element_data = args.elements;

    return templateLoader.load(TMPL_COMP_SRC_LIST_HTML).then((string) => {
        return templateLoader.parseHTML(string);
    }).then(async (tmp) => {
        const elements = await Promise.all(element_data.map(async (data) => {
            return await listElement(templateLoader, data).then((value) => value);
        }));

        templateLoader.replaceHTMLTag(tmp, 'list-elements', elements);
        return tmp;
    });
}