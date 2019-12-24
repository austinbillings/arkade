import React from 'react';

export const Input = ({ type, value, onChange, ...rest }) => {
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
                    onChange={({ target }) => onChange(target.value)}
                />
            );
    }
}
