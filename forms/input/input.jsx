import React from 'react';

import './input.scss';
import { Icon } from 'arkade/common'
import { isFunction } from 'arkade/utils/type-utils';

export const Input = ({ type = 'text', value = '', onChange, placeholder = '', className = '', options = [], ...rest }) => {
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
                    {options.map(({ name, value, disabled }, index) => (
                        <option key={index} value={value} disabled={disabled}>{name}</option>
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
                    value={value || ''}
                    {...rest}
                />
            )
        case 'checkbox':
        case 'toggle':
            return (
                <div className={`ak-${type}-group`}>
                    <Icon
                        fa={type === 'toggle' ? (value ? 'toggle-on' : 'toggle-off') : (value ? 'check-square-o' : 'square-o')}
                        onClick={() => onChange(!value)}
                        className={`ak-${type}-icon`}
                    />
                    <input
                        checked={!!value}
                        value={!!value}
                        type="checkbox"
                        className={`ak-${type}-input ${className}`}
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
                    value={value || ''}
                    type={type || 'text'}
                    placeholder={placeholder || ''}
                    className={`ak-input ${className}`}
                    onChange={({ target }) => onChange(target.value)}
                    {...rest}
                />
            );
    }
}
