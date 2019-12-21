import React from 'react';

import './fieldset.scss';

export const Fieldset = ({ fields, ...rest }) => (
    <fieldset {...rest}>
        {fields.map((field, key) => (
            <input
                autoFocus={!key}
                type={field.type || 'text'}
                placeholder={field.placeholder || ''}
                key={key}
            />
        ))}
    </fieldset>
);
