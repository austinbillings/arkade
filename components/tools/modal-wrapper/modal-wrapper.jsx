// ∆
import React from 'react';

import './modal-wrapper.scss';
import { Portal } from '../portal';

export const ModalWrapper = ({ children, style = {}, className = '', visible }) => (
    <Portal>
        <div className={`modal-wrapper ${className} ${visible ? 'visible' : 'hidden'}`}>
            <div
                style={style}
                children={children}
                className="modal-wrapper-inner"
            />
        </div>
    </Portal>
);
