export const createElement = (tag, options) => {
    let element = document.createElement(tag);
    for (let attributes in options) {
        if (attributes == 'class') {
            element.classList.add.apply(element.classList, options[attributes]);
        } else if (attributes == 'content') {
            element.innerHTML = options[attributes];
        } else {
            element[attributes] = options[attributes];
        }
    }

    return element;
};