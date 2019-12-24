import React from 'react';
import { isFunction } from '../../../../utils/type-utils';

const defaultApplyChange = (modelKey) => (value, model = {}) => ({ ...model, [modelKey]: value });

export const Field = (fieldProps = {}) => {
    const {
        model,
        modelKey,
        label,
        icon,
        type = 'text',
        defaultValue = null,
        props = {},
        optional = false,
        validate,
        applyChange,
        ...rest
    } = fieldProps;

    let { applyChange, props = {} } = fieldProps;

    applyChange = isFunction(applyChange) ? applyChange : defaultApplyChange(modelKey);

    const { className = '', ...inputProps } = props;
    const value = isObject(model) && isDefined(model[modelKey]) ? model[modelKey] : defaultValue;

    return (
        <div className="ak-field" {...rest}>
            <label className="ak-field-label">
                {icon && <Icon className="ak-field-label-icon" fa={icon}/>}
                {label && (
                    <strong className="ak-field-label-text">
                        {label}
                        {' '}
                        {!optional && <span className="ak-field-required-indicator">*</span>}
                    </strong>
                )}
            </label>

            <Input type={type} className={`ak-field-input ${className}`} value={} {...inputProps} />


        </div>
    )
};
