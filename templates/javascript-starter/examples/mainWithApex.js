import apex from 'apex';

const $ = apex.jQuery;

export function getItemLabel(elementId) {
    return apex.item(elementId).node.textContent;
}
