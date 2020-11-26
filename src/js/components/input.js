import {TMPL_COMP_SRC_INPUT_HTML} from "../constants/tmp-src";

export default function input(templateLoader, args){
    return templateLoader.load(TMPL_COMP_SRC_INPUT_HTML).then((res) =>
        res.replace("{PLACEHOLDER}", args.placeholder)
            .replace("{LABEL}", args.label)
            .replace("{TYPE}", args.type)
    ).then(templateLoader.parseHTML);
}
