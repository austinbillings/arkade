// ∆
import React from 'react'
import { createPortal } from 'react-dom';

export const Portal = ({ children }) => {
    const rootTarget = document.getElementById('modal-root');

    return createPortal(children, rootTarget);
};
