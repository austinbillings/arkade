import React from 'react';

import './input.scss';
import { isFunction } from 'arkade/utils/type-utils';

export const Input = ({ type, value, onChange, placeholder, className, options = [], ...rest }) => {
    const handleChange = isFunction(onChange)
        ? (newValue) => onChange(newValue)
        : (newValue) => null;

    switch (type) {
        case 'select':
        case 'dropdown':
            return (
                <select
                    value={value || ''}
                    className={`ak-select ${className}`}
                    onChange={({ target }) => onChange(target.value)}>
                    {options.map(({ name, value }, index) => (
                        <option key={index} value={value}>{name}</option>
                    ))}
                </select>
            );
        case 'longtext':
        case 'textarea':
        case 'paragraph':
            return (
                <textarea
                    type={type || 'text'}
                    className={`ak-input ${className}`}
                    placeholder={placeholder || ''}
                    onChange={({ target }) => onChange(target.value)}
                    value={value}
                    {...rest}
                />
            )
        case 'checkbox':
            return (
                <div className={`ak-checkbox-group`}>
                    <input
                        checked={!!value}
                        value={!!value}
                        type="checkbox"
                        className={`ak-checkbox-input ${className}`}
                        onChange={({ target }) => onChange(target.value)}
                        {...rest}
                    />
                    <p className="ak-checkbox-description" onClick={() => onChange(!value)}>
                        {placeholder}
                    </p>
                </div>
            )
        case 'password':
        case 'email':
        case 'text':
        default:
            return (
                <input
                    value={value}
                    type={type || 'text'}
                    placeholder={placeholder || ''}
                    className={`ak-input ${className}`}
                    onChange={({ target }) => onChange(target.value)}
                    {...rest}
                />
            );
    }
}
