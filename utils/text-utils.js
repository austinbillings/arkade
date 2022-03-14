import { isString, isFunction, isNonEmptyString } from './type-utils';

export function reindent (text) {
    if (!isString(text))
        return text;

    const newlineChar = '\n';

    const splitByLines = text.split(newlineChar).filter((line, index) => line.length || index);
    const [ firstLine ] = splitByLines.filter(line => line.length);
    const firstLineIndentation = firstLine.search(/[^ |\t]/);

    return splitByLines.map(line => {
        var nonWhitespaceIndex = line.search(/[^ |\t]/);
        var precedesCutoff = nonWhitespaceIndex < firstLineIndentation

        return precedesCutoff
            ? line.substring(nonWhitespaceIndex)
            : line.substring(firstLineIndentation);
    }).join(newlineChar);
}

export function indent (text, size, char = ' ') {
    const indentation = char.repeat(size);

    return !isNonEmptyString(text)
        ? text
        : text
            .split('\n')
            .map(line => `${indentation}${line}`)
            .join('\n');
}

export function trim (value) {
    return isString(value) ? value.trim() : value;
}

export function splitByFirst (value, splitByChar = '') {
    return !isString(value)
        ? value
        : value.split(splitByChar).reduce(function (acc, part) {
            return acc.length <= 1
            ? acc.concat(part)
            : [ acc[0], acc[1].concat(splitByChar, part) ];
        }, []);
}

export function splitBy (value, splitByChar = '') {
    return !isString(value)
        ? value
        : value
            .split(splitByChar)
            .map(trim)
            .filter(isNonEmptyString);
}

export function prettyPrint (content, singleLine = false) {
    if (isFunction(content))
        return content.toString();

    const json = JSON.stringify(content, null, '  ');

    return singleLine ? splitBy(json, '\n').join('  ') : json;
}

export function lcFirst (text) {
    return text && text.length
        ? text[0].toLowerCase() + text.substring(1)
        : text;
}

export function ucFirst (text) {
    return text && text.length
        ? text[0].toUpperCase() + text.substring(1)
        : text;
}

export function forceCamelCase (value) {
    if (!isString(value))
        return value;

    return splitBy(value, '-')
        .map((str, i) => !i ? lcFirst(str) : ucFirst(str))
        .join('');
}

export function forceSnakeCase (value) {
    return value.split(/([A-Z])/)
        .map(s => s.trim().toLowerCase())
        .map((letter, index) => index % 2 === 1 ? `-${letter}` : letter)
        .join('');
}

export function cleanTagList (tagList) {
    return !angular.isArray(tagList)
        ? []
        : tagList.filter(isString).map(tagName => tagName.toLowerCase());
}

export function stripHtmlTags (html, allowTags = [], keepAttributes = false) {
    const allowedTags = allowTags.filter(isString).map(t => t.toLowerCase());
    const tagPattern = /<(\/?[a-zA-Z-]+) ?(?: [a-zA-Z0-9]+[a-zA-Z0-9-]*(?:="[^"]*")?)*\/?>/g;

    return html.replace(tagPattern, function (match, tagName) {
        const isClosingTag = match.indexOf('</') === 0;
        const isSelfClosingTag = match.substring(match.length - 2) === '/>';
        const checkableTagName = tagName.substring(isClosingTag ? 1 : 0).toLowerCase();

        if (!allowedTags.includes(checkableTagName)) {
            return '';
        } else if (keepAttributes) {
            return match;
        }

        return `<${isClosingTag ? '/' : ''}${checkableTagName}${isSelfClosingTag ? '/' : ''}>`;
    });
}

export function stripFromText (text, removals = []) {
    return removals.reduce((output, removeableWord) => {
        const lc = t => t.toLowerCase();
        const foundIndex = lc(output).indexOf(lc(removeableWord))

        return foundIndex !== -1
            ? foundIndex === 0
                ? output.substring(removeableWord.length)
                : output.substring(0, foundIndex).concat(output.substring(foundIndex + removeableWord.length))
            : output
    }, text)
}
