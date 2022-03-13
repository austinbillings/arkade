export function debounce(func, delayMs) {
    let timer;

    return (...args) => {
        clearTimeout(timer);

        timer = setTimeout(() => {
            timer = null;
            func(...args);
        }, delayMs);
    };
}
