// ∆
import React from 'react'
import { createPortal } from 'react-dom';

export const Portal = ({ children }) => {
    if (!process.browser) {
        return React.Fragment;
    }

    const rootTarget = document.getElementById('ak-modal-root');

    return createPortal(children, rootTarget);
};
