import React from 'react';

export const StackLayout = ({ className = '', style = {}, ...rest } = {}) => {
    const stackStyles = {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'stretch'
    };
    
    return (
        <div
            style={{ ...stackStyles, ...style }}
            className={`ak-layout ak-layout-stack ${className}`}
            {...rest}
        />
    );
};