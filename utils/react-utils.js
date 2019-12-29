import React from 'react';
import { isFunction } from 'arkade/utils/type-utils';

export function isClassComponent (value) {
    return isFunction(value) && !!value.prototype.isReactComponent;
}

export function isFunctionComponent (value) {
    return isFunction(value) && value.toString().includes('return React.createElement');
}

export function isReactComponent (value) {
    return isFunctionComponent(value) || isClassComponent(value);
}

export function isReactElement (value) {
    return React.isValidElement(value);
}

export function isCompositeReactElement (value) {
    return isReactElement(value) && isFunction(value.type);
}

export function isDomReactElement (value) {
    return isReactElement(value) && isString(value.type);
}
