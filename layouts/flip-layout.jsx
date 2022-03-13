import React, { useState, useEffect } from 'react';

export const FlipLayout = ({ breakPoint = 768, rowClasses = '', stackClasses = '', className = '', style = {}, ...rest } = {}) => {
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

    const useStack = process.browser ? windowWidth <= breakPoint : false;

    const styles = {
        display: 'flex',
        flexDirection: useStack ? 'column' : 'row',
        justifyContent: 'flex-start',
        alignItems: 'stretch'
    };

    return (
        <div
            style={{ ...styles, ...style }}
            className={`ak-${useStack ? 'stack' : 'row'} ${useStack ? stackClasses : rowClasses} ${className}`}
            {...rest}
        />
    );
};
