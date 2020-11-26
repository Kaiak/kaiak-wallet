export default function TemplateLoader() {
    return {
        load: function(path){
            const xhr = new XMLHttpRequest();

            return new Promise((resolve, reject) => {
                xhr.open('GET', path);
                xhr.send();
                xhr.addEventListener("load", () => {
                    resolve(xhr.responseText);
                });
                xhr.addEventListener("error", event => {
                    console.log(path);
                    console.log(event);
                    reject("error");
                });
                xhr.addEventListener("abort", () => {
                    console.log("ABORTED!!!!");
                    console.log(path);
                    reject("abort");
                });
            });
        },
        parseHTML: function(html){
            return document.createRange().createContextualFragment(html).childNodes[0];
        },
        replaceHTMLTag: function(parent, htmlTag, replaceWith){
            if(Array.isArray(replaceWith)){
                let replaceWithFrag = document.createDocumentFragment(),
                    len = replaceWith.length,
                    i = 0;
                for (; i < len; i++) {
                    replaceWithFrag.appendChild(replaceWith[i]);
                }

                const child = parent.getElementsByTagName(htmlTag)[0];

                let lastChild = replaceWith[replaceWith.length-1];
                parent.replaceChild(lastChild, child);

                if(replaceWith.length > 1){
                    for(let i = replaceWith.length-2; i >= 0; i--){
                        parent.insertBefore(replaceWith[i], lastChild);
                    }
                }
            }else{
                console.log(typeof parent)
                console.log(parent.getElementsByTagName(htmlTag))
                parent.replaceChild(replaceWith, parent.getElementsByTagName(htmlTag)[0]);
            }
        }
    }
}
