import { isDefined, isNonEmptyString } from './type-utils';

export const session = { prefix: '' };

export function setSessionPrefix (prefix) {
    session.prefix = prefix;
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

    return sessionStorage.setItem(`${session.prefix}${key}`, serializeValue(value))
};

export function sessionLoad (key, defaultValue = null) {
    if (!isNonEmptyString(key))
        throw new TypeError('sessionSave: (key) is not a non-empty string');

    const retrieved = sessionStorage.getItem(`${session.prefix}${key}`);

    return retrieved ? deserializeValue(retrieved) : defaultValue;
}
