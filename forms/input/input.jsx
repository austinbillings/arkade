import React from 'react';

import './input.scss';
import { isFunction } from 'arkade/utils/type-utils';

export const Input = ({ type, value, onChange, className, ...rest }) => {
    const handleChange = isFunction(onChange)
        ? (newValue) => onChange(newValue)
        : (newValue) => null;

    switch (type) {
        case 'password':
        case 'email':
        case 'text':
        default:
            return (
                <input
                    value={value}
                    type={type || 'text'}
                    className={`ak-input ${className}`}
                    onChange={({ target }) => onChange(target.value)}
                    {...rest}
                />
            );
    }
}
