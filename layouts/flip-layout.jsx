import { useEffect, useState } from 'react'

const checkBreakpoint = breakPoint => {
    try {
        return window.matchMedia(`only screen and (max-width: ${breakPoint}px)`).matches;
    } catch (err) {
        return false;
    }
}

export const FlipLayout = ({ breakPoint = 768, rowClasses = '', stackClasses = '', className = '', style = {}, ...rest } = {}) => {
    const [useStack, setUseStack] = useState(checkBreakpoint(breakPoint));

    useEffect(() => {
        if (!process.browser) return;

        setUseStack(checkBreakpoint(breakPoint));
    }, [(!process.browser || window.innerWidth)])

    const styles = {
        display: 'flex',
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
