import React, { useState } from 'react';
import { isFunction, isNonEmptyArray } from 'arkade/utils/type-utils';

import { FormAction } from './form-action';
import { Fieldset } from './fieldset';
import { ValidationMessage } from './validation-message';
import { useModel } from 'arkade/hooks';

export const Form = ({
    initialData = {},
    onModelUpdate,
    fields = [],
    actions = [],
    children,
    style = {},
    className = '',
    disabled = false,
    showPreventativeErrors = false,
    ...rest
} = {}) => {
    const [ modelState, modelErrors, setModel ] = useModel(fields, initialData);
    const hasChanged = JSON.stringify(modelState) !== JSON.stringify(initialData);

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
        <form className={`ak-form ${className}`} onSubmit={handleSubmit} style={style}>
            <Fieldset
                model={modelState}
                fields={fields}
                actions={actions}
                className={'ak-form-fieldset'}
                onModelChange={handleModelChange}
            />
            {showPreventativeErrors && hasChanged && modelErrors.map((error, index) => (
                <ValidationMessage kind="error" key={index} visible={true} children={error.message} />
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
