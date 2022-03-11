import React, { useState, useEffect } from 'react';

export const SwitchLayout = ({ breakPoint = 768, className = '', style = {}, ...rest } = {}) => {
    const [windowWidth, setWindowWidth] = useState(process.browser ? window.innerWidth : 0)

    useEffect(() => {
        const handler = () => {
            setWindowWidth(window.innerWidth)
        }

        if (process.browser) {
            window.addEventListener('resize', handler)
        }

        return () => {
            window.removeEventListener('resize', handler)
        }
    });

    const useColumn = windowWidth <= breakPoint;

    const switchStyles = {
        display: 'flex',
        flexDirection: useColumn ? 'column' : 'row',
        justifyContent: 'flex-start',
        alignItems: 'stretch'
    };

    return (
        <div
            style={{ ...switchStyles, ...style }}
            className={`ak-${useColumn ? 'stack' : 'row'} ${className}`}
            {...rest}
        />
    );
};
