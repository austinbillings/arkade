import { isDefined, isNonEmptyString } from './type-utils';

export const prefixes = { sessionPrefix: '', storagePrefix: '' };

export function setSessionPrefix (prefix) {
    prefixes.sessionPrefix = prefix;
}

export function setStoragePrefix (prefix) {
    prefixes.storagePrefix = prefix;
}

export function serializeValue (_value) {
    return JSON.stringify({ _value });
}

export function deserializeValue (data) {
    if (!isNonEmptyString(data))
        throw new TypeError('deserializeValue: (data) is not a non-empty string');

    const raw = JSON.parse(data);
    return raw ? raw._value : null;
}

export function sessionSave (key, value = null) {
    if (!isNonEmptyString(key))
        throw new TypeError('sessionSave: (key) is not a non-empty string');
    if (!process.browser)
        return null;

    return window.sessionStorage.setItem(`${prefixes.sessionPrefix}${key}`, serializeValue(value))
};

export function sessionLoad (key, defaultValue = null) {
    if (!isNonEmptyString(key))
        throw new TypeError('sessionLoad: (key) is not a non-empty string');
    if (!process.browser)
        return null;

    const retrieved = window.sessionStorage.getItem(`${prefixes.sessionPrefix}${key}`);

    return retrieved ? deserializeValue(retrieved) : defaultValue;
}

export function storageSave (key, value = null) {
    if (!isNonEmptyString(key))
        throw new TypeError('storageSave: (key) is not a non-empty string');
    if (!process.browser)
        return null;

    return window.localStorage.setItem(`${prefixes.storagePrefix}${key}`, serializeValue(value))
};

export function storageLoad (key, defaultValue = null) {
    if (!isNonEmptyString(key))
        throw new TypeError('storageLoad: (key) is not a non-empty string');
    if (!process.browser)
        return null;

    const retrieved = window.localStorage.getItem(`${prefixes.storagePrefix}${key}`);

    return retrieved ? deserializeValue(retrieved) : defaultValue;
}
