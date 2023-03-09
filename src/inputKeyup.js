import { resizeText } from "./resizeText";

export const inputKeyup = (options) => {
    const target = document.querySelectorAll(options.elementTarget);
    target.forEach((input) => {
        const target = input.dataset.target;
        const span = document.querySelector(`#post_body span[data-content="${target}"]`);

        input.addEventListener('keyup', () => {
            span.textContent = input.value;

            resizeText('#post_body .content_primary .__wrapper');
            resizeText('#post_body .content_secondary .__wrapper');
        });
    });
}