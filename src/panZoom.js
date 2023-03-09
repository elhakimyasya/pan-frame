import createPanZoom from "panzoom";

export const panZoom = (options) => {
    const images = document.querySelector(options.elementImage);
    const imageOrnament = document.querySelector(options.elementImageOrnament);
    const imageBackground = document.querySelector(options.elementImageBackground);
    const contentPrimary = document.querySelector(options.elementContentPrimary);
    const contentSecondary = document.querySelector(options.elementContentSecondary);

    const instance = createPanZoom(images, {
        containZoom: true,
        autocenter: true,
        minZoom: 0.5,
        maxZoom: 3,
        bounds: true,
    });

    instance.on('panstart', () => {
        imageOrnament.style.opacity = '.7';
        imageBackground.style.opacity = '.7';
        contentPrimary.style.opacity = '.7';
        contentSecondary.style.opacity = '.7';
    });
    instance.on('panend', () => {
        imageOrnament.style.opacity = '1';
        imageBackground.style.opacity = '1';
        contentPrimary.style.opacity = '1';
        contentSecondary.style.opacity = '1';
    });
}