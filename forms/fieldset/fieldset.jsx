import React, { useState } from 'react';
import { isFunction, isNonEmptyArray } from 'arkade/utils/type-utils';

import './fieldset.scss';

export const Fieldset = ({ model, fields, onModelChange, className = '', ...rest }) => {
    return (
        <fieldset className={`ak-fieldset ${className}`} {...rest}>
            {fields.map((fieldProps, key) => <Field key={key} {...fieldProps} />)}
        </fieldset>
    );
}
