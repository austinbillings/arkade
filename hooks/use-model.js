import { useState } from 'react';
import { generateModelFromFields, getFieldsetErrors } from 'arkade/utils/form-utils';

export function useModel (fields, initialData) {
    const [model, setModel] = useState({ ...generateModelFromFields(fields, initialData), ...initialData });
    const errors = getFieldsetErrors(model, fields);

    return [model, errors, setModel];
}
