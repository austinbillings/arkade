import React, { useState } from 'react';
import { isFunction, isNonEmptyArray } from 'arkade/utils/type-utils';

import './form.scss';
import { FormAction } from '../form-action/form-action';
import { Fieldset } from '../fieldset/fieldset';
import { ValidationMessage } from '../validation-message/validation-message';
import { useModel } from 'arkade/utils/form-utils';

export const Form = ({
    initialData = {},
    onModelUpdate,
    fields = [],
    actions = [],
    children,
    className = '',
    disabled = false,
    showPreventativeErrors = false,
    ...rest
} = {}) => {
    const [ modelState, modelErrors, setModel ] = useModel(fields, initialData);

    const handleModelChange = (newModel, errors = []) => {
        setModel(newModel);

        if (!isNonEmptyArray(errors) && isFunction(onModelUpdate))
            onModelUpdate(newModel);
    };

    const handleSubmit = (evt) => {
        evt.preventDefault();
        evt.persist();
    }

    return (
        <form className={`ak-form ${className}`} onSubmit={handleSubmit}>
            <Fieldset
                model={modelState}
                fields={fields}
                actions={actions}
                className={'ak-form-fieldset'}
                onModelChange={handleModelChange}
            />
            {showPreventativeErrors && modelErrors.map((error, index) => (
                <ValidationMessage kind="error" key={index} children={error.message} />
            ))}
            {children && (
                <legend className="ak-form-legend">
                    {children}
                </legend>
            )}
            {actions.map((action, index) => (
                <FormAction
                    key={index}
                    model={modelState}
                    errors={modelErrors}
                    action={action}
                />
            ))}
        </form>
    );
}
