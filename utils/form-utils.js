import { isFunction, isArray, isDefined, isNull } from './type-utils';

export function getFieldErrors (model, field) {
    if (isArray(field)) {
        return field.map(f => getFieldErrors(model, f));
    }

    const currentValue = model[field.modelKey];

    if (!field.optional && (!isDefined(currentValue) || isNull(currentValue) || currentValue === '')) {
        return new Error(`${field.label || field.modelKey} is a required field`);
    }

    try {
        if (isFunction(field.validate)) {
            field.validate(currentValue, model);
        }
    } catch (e) { return e; }

    return null;
}

export function getFieldsetErrors (model, fields) {
    return fields
        .map(f => getFieldErrors(model, f))
        .filter(errorOrNull => errorOrNull !== null);
}

export function getModelKeysUsedByField (field) {
    return isArray(field)
        ? field.map(getModelKeysUsedByField)
        : [field.modelKey];
}

export function getDefaultFieldValue (field) {
    if (isDefined(field.defaultValue))
        return field.defaultValue;

    if (!isDefined(field.type) || ['text', 'html', 'email', 'password', 'secret', 'textarea', 'html'].includes(field.type))
        return '';

    return null;
}

export function generateModelFromFields (fields, initialData = {}) {
    return fields.reduce((output, field, index) => {
        const subModel = isArray(field)
            ? generateModelFromFields(field)
            : {
                [field.modelKey]: isDefined(initialData[field.modelKey])
                    ? initialData[field.modelKey]
                    : getDefaultFieldValue(field)
            };

        return { ...output, ...subModel };
    }, {});
}
