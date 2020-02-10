import React from 'react';

import { Icon } from 'arkade/common';

import './modal-body.scss';

export const ModalBody = ({ title = null, closeable = true, escapable = true, children, onClose, className }) => {
    const showTopArea = title || closeable;
    const fullClassName = (className || '').concat(' modal-body');

    return (
      <div className={fullClassName}>
        {showTopArea && (
          <div className="modal-top">
            {title && <h4 className="header-small">{title}</h4>}
            <span> </span>
            {closeable && (
                <Icon fa="close" onClick={onClose} />
            )}
          </div>
        )}
        {children && (
          <div className="modal-content">
              {children}
          </div>
        )}
      </div>
  );
};
