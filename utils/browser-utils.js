import { isFunction } from './type-utils'

export function isMobile () {
    return process.browser
        ? window.matchMedia("only screen and (max-width: 760px)").matches
        : false
}

export function hasClass (element, className) {
    return element && element.classList.contains(className);
}

export function addClass (element, className) {
    return element && element.classList.add(className);
}

export function removeClass(element, className) {
    return element && element.classList.remove(className);
}

export function scrollSnap (offset) {
    const scrollingClassName = 'ak-scrollsnap-scrolling';
    const body = document.getElementsByTagName('body')[0];
    const isScrolling = hasClass(body, scrollingClassName);

    if (isScrolling) return;

    addClass(body, scrollingClassName);

    if (isMobile()) {
        scrollWindowTo(offset);
    } else {
        window.scrollTo({ top: offset, left: 0, behavior: 'smooth' });
    }

    setTimeout(() => { removeClass(body, scrollingClassName) }, 100);
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
