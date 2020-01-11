import React, { useState, useMemo } from 'react';
import { isArray, isFunction, isNonEmptyArray } from 'arkade/utils/type-utils';

import './fieldset.scss';

import { Icon } from 'arkade/common';
import { Field } from '../field/field';
import { getFieldsetErrors } from 'arkade/utils/form-utils';

export const Fieldset = ({ model, fields, onModelChange, disabled = false, className = '', ...rest }) => {
    const handleChange = (updatedModel) => isFunction(onModelChange)
        ? onModelChange(updatedModel, getFieldsetErrors(model, fields))
        : null;

    const renderField = (field, key) => {
        return isArray(field)
            ? <div className="ak-fieldset-subset" key={key}>{field.map(renderField)}</div>
            : (
                <Field
                    key={key}
                    model={model}
                    fieldConfig={field}
                    errors={getFieldsetErrors(model, fields)}
                    onChange={handleChange}
                />
            );
    };

    return (
        <fieldset
            disabled={disabled}
            className={`ak-fieldset ${className || ''}`}
            {...rest}>
            {fields.map(renderField)}
        </fieldset>
    );
}
