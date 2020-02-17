import { isFunction } from './type-utils'

export function isMobile () {
    return process.browser
        ? window.matchMedia("only screen and (max-width: 760px)").matches
        : false
}

export function scrollWindowTo (yPosition, duration = 400, onComplete) {
    const currentScrollPosition = window.pageYOffset
    const scrollAmount = yPosition - currentScrollPosition
    const isScrollingUp = scrollAmount < 0

    const state = {
        startTime: null,
        finished: false,
        cancelled: false
    }

    function tick (timestamp) {
        if (!state.startTime) state.startTime = timestamp

        const elapsed = Math.max(timestamp - state.startTime, 1)
        const progress = elapsed / duration
        const nextScrollPosition = (progress * scrollAmount) + currentScrollPosition
        const targetScrollPosition = isScrollingUp
            ? Math.min(yPosition, nextScrollPosition)
            : Math.max(yPosition, nextScrollPosition)

        window.scrollTo(0, nextScrollPosition)

        if (!state.finished && !state.cancelled) {
            state.finished = elapsed >= duration
            window.requestAnimationFrame(tick)
        } else {
            if (isFunction(onComplete)) onComplete(state)
        }
    }

    window.requestAnimationFrame(tick)

    return () => state.cancelled = true
}
