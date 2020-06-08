import { isNonEmptyString, isString } from './type-utils';

export const formatMimeTypes = {
    txt: 'text/plain',
    html: 'text/html',
    csv: 'text/csv',
    css: 'text/css',
    ics: 'text/calendar',
    js: 'text/javascript',
    mjs: 'text/javascript',
    xml: 'text/xml',
    json: 'application/json'
};

export function getMimeTypeForFormat(format = null) {
    return isNonEmptyString(format) && (format in formatMimeTypes)
        ? formatMimeTypes[format]
        : new Error(`Can't find MIME type for unknown format: ${format}`)
}

export function downloadTextFile(stringData, filename, format = 'txt', mimeType = null) {
    const type = mimeType || getMimeTypeForFormat(format);
    const dataBlob = new Blob([stringData], { type });
    const uri = URL.createObjectURL(dataBlob);
    const hasExtension = isString(filename)
        && filename.length > 3
        && filename.substring(filename.length - (format.length + 1)).toLowerCase() === `.${format}`;
    const fullFilename = `${filename}${hasExtension ? '' : `.${format}`}`;

    return downloadUri(uri, fullFilename);
}

export function downloadUri(uri, filename, openExternally) {
    const downloadElement = document.createElement('a');

    downloadElement.setAttribute('href', uri);

    if (openExternally) downloadElement.setAttribute('target', '_blank');

    downloadElement.setAttribute('download', filename);
    downloadElement.style.display = 'none';
    document.body.appendChild(downloadElement);

    downloadElement.click();

    setTimeout(() => {
        URL.revokeObjectURL(uri);
        document.body.removeChild(downloadElement);
    });
}