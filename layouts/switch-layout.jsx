import React, { useState, useEffect } from 'react';

export const SwitchLayout = ({ breakPoint = 768, rowClasses = '', stackClasses = '', className = '', style = {}, ...rest } = {}) => {
    const [windowWidth, setWindowWidth] = useState(process.browser ? window.innerWidth : 0)

    const handler = () => {
        console.log('handler running')
        setWindowWidth(window.innerWidth)
    }

    useEffect(() => {
        console.log('useEffect running')
        handler();

        if (process.browser) {
            window.addEventListener('resize', handler)
        }

        return () => {
            window.removeEventListener('resize', handler)
        }
    });

    const useColumn = process.browser ? windowWidth <= breakPoint : false;

    const switchStyles = {
        display: 'flex',
        flexDirection: useColumn ? 'column' : 'row',
        justifyContent: 'flex-start',
        alignItems: 'stretch'
    };

    return (
        <div
            style={{ ...switchStyles, ...style }}
            className={`ak-${useColumn ? 'stack' : 'row'} ${useColumn ? stackClasses : rowClasses} ${className}`}
            {...rest}
        />
    );
};
