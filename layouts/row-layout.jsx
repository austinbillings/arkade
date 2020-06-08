import React from 'react';

export const RowLayout = ({ className = '', style = {}, ...rest } = {}) => {
    const rowStyles = {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'flex-start',
        alignItems: 'stretch'
    };
    
    return (
        <div
            style={{ ...rowStyles, ...style }}
            className={`ak-layout ak-layout-row ${className}`}
            {...rest}
        />
    );
};