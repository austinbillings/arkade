import React, { useRef, useEffect } from 'react'
import { isFunction } from '../utils/type-utils'

export const ScrollWatcher = ({ onDominate, onEnterStart, onEnter, onLeave, onLeaveStart, onCenter, children, ...rest }) => {
    const wrapperEl = useRef(null)
    const instanceCache = {
        isShown: null,
        isFullyShown: null,
        dominatesViewport: null,
        crossesCenterLine: null
    }

    function handleScroll () {
        const windowHeight = window.innerHeight
        const centerLine = windowHeight / 2
        const { top, bottom, height } = wrapperEl.current.getBoundingClientRect()

        const goesAboveViewport = top < 0
        const fullyAboveViewport = bottom < 0
        const goesBelowViewport = bottom > windowHeight
        const fullyBelowViewport = top > windowHeight
        const extendsThroughViewport = goesAboveViewport && goesBelowViewport
        const isShown = !fullyBelowViewport && !fullyAboveViewport
        const isFullyShown = isShown && ((height <= windowHeight) || extendsThroughViewport)
        const crossesCenterLine = top < centerLine && bottom > centerLine
        const dominatesViewport = isShown && crossesCenterLine && (height > centerLine)

        const isEntering = isShown && !instanceCache.isShown
        const isFullyEntering = isFullyShown && !instanceCache.isFullyShown
        const isNewlyDominating = dominatesViewport && !instanceCache.dominatesViewport
        const isLeaving = !isFullyShown && instanceCache.isFullyShown
        const isFullyLeaving = !isShown && instanceCache.isShown
        const isCrossingCenter = crossesCenterLine && !instanceCache.crossesCenterLine

        if (isEntering && isFunction(onEnterStart))
            onEnterStart(wrapperEl.current)
        if (isFullyEntering && isFunction(onEnter))
            onEnter(wrapperEl.current)
        if (isNewlyDominating && isFunction(onDominate))
            onDominate(wrapperEl.current)
        if (isLeaving && isFunction(onLeaveStart))
            onLeaveStart(wrapperEl.current)
        if (isFullyLeaving && isFunction(onLeave))
            onLeave(wrapperEl.current)
        if (isCrossingCenter && isFunction(onCenter))
            onCenter(wrapperEl.current)

        instanceCache.isShown = isShown
        instanceCache.isFullyShown = isFullyShown
        instanceCache.dominatesViewport = dominatesViewport
        instanceCache.crossesCenterLine = crossesCenterLine
    }

    useEffect(() => {
        handleScroll()
        window.addEventListener('scroll', handleScroll)
        window.addEventListener('resize', handleScroll)

        return () => {
            window.removeEventListener('scroll', handleScroll)
            window.removeEventListener('resize', handleScroll)
        }
    }, [true])

    return (
        <div ref={wrapperEl} {...rest}>
            {children}
        </div>
    )
}
