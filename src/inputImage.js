import { imageToBase64 } from "./imageToBase64";

export const inputImage = (options) => {
    const target = document.querySelector(options.elementTarget);
    const images = document.querySelector(options.elementImage);

    target.addEventListener('change', async () => {
        let photoFile = target.files[0];
        functionSnackbar('Mengunggah Foto...', 2000);

        images.setAttribute('src', await imageToBase64(photoFile));
    });
}