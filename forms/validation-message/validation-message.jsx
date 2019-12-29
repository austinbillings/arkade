import React from 'react';
import { Icon } from 'arkade/common';

import './validation-message.scss';

function getIconForKind (kind) {
    switch (kind) {
        case 'error':
            return 'exclamation-circle';
        case 'warning':
            return 'exclamation-triangle';
        default:
            return 'info-circle'
    }
}

function getClassNameForKind (kind) {
    switch (kind) {
        case 'error':
            return 'text-danger';
        case 'warning':
            return 'text-warning';
        default:
            return 'text-subtle';
    }
}

export const ValidationMessage = ({ children, kind, className, icon, ...rest }) => {
    return (
        <output className={`ak-validation-message ${className || getClassNameForKind(kind)}`}>
            <Icon fa={icon || getIconForKind(kind)} className="ak-validation-message-icon" />
            {children && <p className="ak-validation-message-text">{children}</p>}
        </output>
    )
}
