import React, { useState, useEffect } from 'react';
import { isString } from 'arkade/utils/type-utils';
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

export const ValidationMessage = ({ children, kind, className, visible, icon, ...rest }) => {
    const messageClass = className || getClassNameForKind(kind);
    const visibilityClass = `ak-validation-message--${visible ? 'visible' : 'hidden'}`;
    const messageIcon = icon || getIconForKind(kind);
    const [mostRecentMessage, setMostRecentMessage] = useState(children);

    useEffect(() => {
        if (children && mostRecentMessage !== children && (!isString(children) || children.length)) {
            setMostRecentMessage(children);
        }
    }, [children]);

    console.info(children);

    return (
        <output className={`ak-validation-message ${messageClass} ${visibilityClass}`}>
            {messageIcon && <Icon fa={messageIcon} className="ak-validation-message-icon" />}
            {mostRecentMessage && <p className="ak-validation-message-text">{mostRecentMessage}</p>}
        </output>
    )
}
