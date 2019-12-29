import React, { Fragment } from 'react';

import { Icon } from 'arkade/common';
import { isFunction } from 'arkade/utils/type-utils';
import { isReactComponent } from 'arkade/utils/react-utils';

export const FormAction = ({ model, errors, action }) => {
    const { icon, label, isDisabled, type, props = {}, callback, className } = action;

    const disabled = isFunction(isDisabled) ? isDisabled(model, errors) : false;
    const onClick = (evt) => isFunction(callback) ? callback(model, errors, evt) : null;

    const children = (
        <Fragment>
            {icon && <Icon className="ak-form-action-icon" fa={icon} />}
            {label && <span className="ak-form-action-label">{label}</span>}
        </Fragment>
    );

    const { ...elementProps } = props;

    const newClassName = `ak-form-action ${className || ''}`;

    const usableProps = {
        children,
        disabled,
        onClick,
        className: newClassName,
        ...elementProps
    };

    if (isReactComponent(type)) {
        const Element = type;

        return <Element {...usableProps} />
    }

    switch (type) {
        case 'a':
        case 'link':
            return <a {...usableProps} />

        case 'button':
        default:
            return <button {...usableProps} />
    }
};
