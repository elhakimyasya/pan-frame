export const resizeText = (selector) => {
    const textEl = document.querySelector(selector);
    const containerEl = textEl.parentNode;

    let maxHeight = containerEl.offsetHeight;

    const observer = new ResizeObserver(() => {
        const newMaxHeight = containerEl.offsetHeight;
        if (maxHeight !== newMaxHeight) {
            maxHeight = newMaxHeight;
            onMaxHeightChange();
        }
    });
    observer.observe(containerEl);

    let textHeight = textEl.offsetHeight;
    const ratio = maxHeight / textHeight;
    const fontSize = Math.min(100, ratio * 100);
    if (maxHeight < textHeight) {
        textEl.style.fontSize = fontSize + '%';
        textEl.style.lineHeight = 1.3 * fontSize / 100;
    }
}