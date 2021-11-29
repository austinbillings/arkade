import {
        isArray,
        isNumber,
        isFunction,
        isString,
        isDefined,
        isNonEmptyArray
    } from './type-utils';

import { equals, getDeep } from './object-utils';

export function sortBy (list, accessor) {
    if (!isArray(list)) {
        return new TypeError(`sortBy: list is not an array. (Got ${typeof list})`);
    }

    const getSortableValue = (item, index) => (
        isFunction(accessor)
            ? accessor(item, index)
            : isNumber(accessor)
                ? item[accessor]
                : isString(accessor)
                    ? getDeep(item, accessor)
                    : item
    );

    return list.sort((a, b) => {
        const aVal = getSortableValue(a);
        const bVal = getSortableValue(b);

        return aVal === bVal ? 0 : aVal < bVal ? -1 : 1;
    });
}

export function firstOf (array) {
    return isNonEmptyArray(array)
        ? array[0]
        : null
}

export function lastOf (array) {
    return isNonEmptyArray(array)
        ? array[array.length - 1]
        : null
}

export function shuffle (array) {
    if (!isNonEmptyArray(array))
        return array;

    let output = []
    let supply = [...array]

    while (output.length < array.length) {
        output = output.concat(...supply.splice(Math.floor(Math.random() * (array.length)), 1));
        supply = [...supply.filter(isDefined)]
    }

    return output;
}


export function unique (array) {
    if (!isArray(array)) throw new TypeError(`unique: ${array} is not an array.`);

    return array.reduce((output, item) => {
        const target = output.find(i => equals(i, item));

        return target ? output : [ ...output, item ]
    }, []);
}

export function sortObjectArrayValues (obj, sortAccessor) {
    if (!isObject(obj)) {
        throw new TypeError(`sortObjectArrayValues: expected obj to be an object (Got ${typeof obj})`);
    }

    return Object.keys(obj)
        .reduce((output, key) => ({
            ...output,
            [key]: isArray(obj[key])
                ? sortBy(obj[key], sortAccessor)
                : obj[key]
        }), {});
}
