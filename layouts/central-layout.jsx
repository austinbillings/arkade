import React from 'react';

export const CentralLayout = ({ children, className = '', style = {}, ...rest }) => (
    <div
        className={`${className} stack items-center justify-center`}
        style={{ minHeight: '100vh', ...style }}
        {...rest}>
        {children}
    </div>
);
