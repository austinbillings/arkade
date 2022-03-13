import React, { useState, useEffect } from 'react';

export const FlipLayout = ({ breakPoint = 768, rowClasses = '', stackClasses = '', className = '', style = {}, ...rest } = {}) => {
    const useStack = window.matchMedia(`only screen and (max-width: ${breakPoint}px)`).matches;
    const styles = {
        display: 'flex',
        alignItems: 'stretch',
        justifyContent: 'flex-start',
        flexDirection: useStack ? 'column' : 'row',
    };


    return (
        <div
            style={{ ...styles, ...style }}
            className={`ak-${useStack ? 'stack' : 'row'} ${useStack ? stackClasses : rowClasses} ${className}`}
            {...rest}
        />
    );
};
