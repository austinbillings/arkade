import { KeyCodes } from './key-codes';

const ID_PREFIX = 'AK_EVT_';

const _ = { listenerStore: [] }

export const add = (event, callback) => {
    let signature = [ event, callback ];
    let listenerCount = _.listenerStore.push(signature);

    window.addEventListener(event, callback);

    return ID_PREFIX + (--listenerCount);
}

export const remove = (id) => {
    const offset = ID_PREFIX.length;
    let index = parseInt(id.substring(offset));
    let [ event, callback ] = _.listenerStore[index];

    window.removeEventListener(event, callback);

    delete _.listenerStore[index];
}

export const onKeyCode = (keyCodeOrSet, callback, evtType = 'keydown') => {
    let handler = (e) => {
        let acceptable = Array.isArray(keyCodeOrSet) ? keyCodeOrSet : [ keyCodeOrSet ];
        if (acceptable.includes(e.keyCode)) callback(e);
    }

    return add(evtType, handler);
}

export const onKey = (key, callback, evtType = 'keydown') => {
    if (!key in KeyCodes) return;

    return onKeyCode(KeyCodes[key], callback, evtType);
}
