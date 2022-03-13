import React, from 'react';

const checkBreakpoint = breakPoint => {
    try {
        return window.matchMedia(`only screen and (max-width: ${breakPoint}px)`).matches;
    } catch (err) {
        return false;
    }
}

export const FlipLayout = ({ breakPoint = 768, rowClasses = '', stackClasses = '', className = '', style = {}, ...rest } = {}) => {
    const useStack = checkBreakpoint(breakPoint);
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
