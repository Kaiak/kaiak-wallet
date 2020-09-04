function Input(templateLoader, args){
    const src = "";
    return templateLoader(src).then((res) =>
        res.replace("{PLACEHOLDER}", args.placeholder)
            .replace("{LABEL}", args.label)
            .replace("{TYPE}", args.type)
    );
}