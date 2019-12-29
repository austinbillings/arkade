import React, { useMemo, useState, useCallback } from 'react';

import './field.scss';

import { Icon } from 'arkade/common';
import { getFieldErrors } from 'arkade/utils/form-utils';
import { isObject, isFunction, isDefined } from 'arkade/utils/type-utils';

import { Input } from '../input/input';
import { ValidationMessage } from '../validation-message/validation-message';

const defaultApplyChange = (modelKey) => (value, model = {}) => (
    { ...model, [modelKey]: value }
);

export const Field = ({ model, fieldConfig = {}, onChange, className }) => {
    const {
        modelKey,
        label,
        icon,
        props = {},
        type = 'text',
        defaultValue = null,
        optional = false,
        validate,
        applyChange,
        ...otherFieldProps
    } = fieldConfig;

    const { className: inputClassName, ...inputProps } = props;
    const value = isObject(model) && isDefined(model[modelKey]) ? model[modelKey] : defaultValue;
    const initialValue = useMemo(() => value, [true])
    const [ hasBlurred, setBlurred ] = useState(false);

    const validationError = getFieldErrors(model, fieldConfig);
    const hasChanged = value !== initialValue;

    const applyChangeToModel = isFunction(applyChange) ? applyChange : defaultApplyChange(modelKey);

    const handleChange = value => {
        return isFunction(onChange)
            ? onChange(applyChangeToModel(value, model))
            : null;
    }

    const handleBlur = evt => setBlurred(true);;

    return (
        <div className="ak-field" {...otherFieldProps}>
            <label className="ak-field-label">
                {label && (
                    <span className="ak-field-label-text">
                        {label}
                        {' '}
                        {!optional && <span className="ak-field-required-indicator" title="This is a required field">*</span>}
                    </span>
                )}
            </label>


            <div className="ak-field-content">
                {icon && <Icon className="ak-field-icon" fa={icon}/>}
                <Input
                    type={type}
                    value={value}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={`ak-field-input ${inputClassName}`}
                    {...inputProps}
                />
            </div>

            {validationError && hasBlurred && (
                <ValidationMessage kind="error">
                    {validationError.message}
                </ValidationMessage>
            )}
        </div>
    )
};
