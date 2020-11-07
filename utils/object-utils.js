import { splitBy } from './text-utils';
import {
    isObject,
    isArray,
    isPrimitive,
    isNumber,
    isRegex,
    isFunction,
    isString,
    isDefined,
    isNonEmptyString,
    isNonEmptyArray
} from './type-utils';

export function getDeep (object, path, pathSeparator = '.') {
    if (!isObject(object))
        throw new TypeError(`${object} is not an <Object>`);
    if (!isNonEmptyString(path))
        throw new TypeError(`${path} is not a non-empty <String>`);
    if (!isNonEmptyString(pathSeparator))
        throw new TypeError(`${pathSeparator} is not a non-empty <String>`);

    let lookupPath = splitBy(path, pathSeparator);
    let outputValue = Object.assign({}, object);

    while (lookupPath.length) {
        let currentPathSegment = lookupPath.shift();

        if (isObject(outputValue) || isArray(outputValue)) {
            let nextValue = outputValue[currentPathSegment];

            if (!isDefined(nextValue))
            return undefined;

            outputValue = nextValue;
        }
    }

    return outputValue;
}

export function setDeep (object, path, replacement, pathSeparator = '.') {
    if (!isObject(object))
        throw new TypeError(`${object} is not an <Object>`);
    if (!isNonEmptyString(path))
        throw new TypeError(`${path} is not a non-empty <String>`);
    if (!isNonEmptyString(pathSeparator))
        throw new TypeError(`${pathSeparator} is not a non-empty <String>`);
    if (!isDefined(getDeep(object, path, pathSeparator)))
        return object;

    const safePath = path.replace(/[^a-zA-Z0-9.-\s]+/g, '');
    const propTrail = safePath.split(pathSeparator).reduce((out, prop) => {
        return `${out}[${isNumber(prop) ? prop : `'${prop}'`}]`;
    }, '');

    try {
        eval('if (typeof object' + propTrail + ' !== \'undefined\') { object' + propTrail + ' = replacement; }');
    } catch (e) {}

    return object;
}

export function anonymizeObject(data, fields, preserveFields) {
    var replacement = clone(data);

    fields.forEach(path => {
        var existing = getDeep(replacement, path);

        if (isString(existing) || isNumber(existing))
        replacement = setDeep(replacement, path, '*'.repeat(existing.toString().length));
    });

    if (isArray(preserveFields)) {
        preserveFields.forEach(field => {
            var preservable = getDeep(data, field);

            replacement = setDeep(replacement, field);
        });
    }

    return replacement;
}

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

export function sortObjectKeys (obj) {
    if (!isObject(obj)) {
        throw new TypeError(`sortObjectKeys: expected obj to be an object (Got ${typeof obj})`);
    }

    return Object.keys(obj)
        .sort()
        .reduce((output, key) => ({ ...output, [key]: obj[key] }), {});
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

export function memoize (func, resolver = null) {
    const resultCache = new Map();

    return (...args) => {
        const key = resolver ? resolver(args) : args[0];

        return !isDefined(key)
            ? func(...args)
            : resultCache.has(key)
                ? resultCache.get(key)
                : resultCache
                    .set(key, func(...args))
                    .get(key);
    };
}

export function pick (obj = {}, keys = []) {
    if (!isNonEmptyString(keys) && !isNonEmptyArray(keys))
    return new TypeError(`(keys) isn't a non-empty string/array (got ${typeof keys}).`);


    return (isString(keys) ? [keys] : keys).reduce((output, key) => key in obj
    ? { ...output, [key]: obj[key] }
    : output,
    {});
};

export function getKeys (object) {
    if (!isObject(object))
    throw new TypeError(`${object} is not an <Object>`);

    return Object.keys(object);
}

export function clone (object) {
    if (isRegex(object))
        return new RegExp(object);
    if (isArray(object))
        return object.map(i => clone(i));
    if (isPrimitive(object) || isFunction(object))
        return object;
    if (isObject(object))
        return getKeys(object).reduce((output, key) => ({ ...output, [key]: clone(object[key]) }), {});
    else
        return object;
}

export function mergeDeep (...objects) {
    return objects.reduce((output, item) => {
        getKeys(item).forEach(key => {
            if (!isDefined(item[key]))
            return;

            output[key] = isObject(output[key]) && isObject(item[key])
                ? mergeDeep(output[key], item[key])
                : item[key];
        });

        return output;
    }, {});
}

export function equals (a, b) {
    if (typeof a !== typeof b) return false;
    if (isPrimitive(a)) return a === b;
    if (isRegex(a)) return isRegex(b) ? a.toString() === b.toString() : false;

    return JSON.stringify(a) === JSON.stringify(b);
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

    const output = []
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
