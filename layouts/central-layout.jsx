import React from 'react';

export const CentralLayout = ({ className = '', style = {}, ...rest } = {}) => {
    const centralStyles = {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    };
    
    return (
        <div
            style={{ ...centralStyles, ...style }}
            className={`ak-central ${className}`}
            {...rest}
        />
    );
};