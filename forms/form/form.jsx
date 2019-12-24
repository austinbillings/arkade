import React, { useState } from 'react';
import { isFunction, isNonEmptyArray } from 'utils/type-utils';

import { Fieldset } from '../fieldset/fieldset';

export const Form = ({ model = {}, onModelUpdate, fields = [], actions = [], children, ...rest } = {}) => {
    const [ modelState, setModelState ] = useState({ ...model });
    const [ modelErrors, setModelErrors ] = useState([]);

    const handleModelChange = (newModel, errors = []) => {
        setModelErrors(errors);

        if (!isNonEmptyArray(errors) && isFunction(onModelUpdate))
            onModelUpdate(newModel);
    };

    return (
        <form className="ak-form" onSubmit={(evt) => console.info('attempted to submit')}>
            <Fieldset
                model={model}
                fields={fields}
                actions={actions}
                children={children}
                onModelChange={handleModelChange}
            />
            {preventativeErrors.map(error => <span>{error.messageText}</span>)}
            {actions.map()}
        </form>
    );
}
