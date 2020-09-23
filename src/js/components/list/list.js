function list(templateLoader, args){
    const element_data = args.elements;

    const list = document.createElement('ul');
    list.setAttribute('class', 'kui-list');

    return Promise.all(element_data.map((data) => {
        return listElement(templateLoader, data)
    })).then(elements => {
        elements.forEach(element => list.appendChild(element));
        return list;
    });
}