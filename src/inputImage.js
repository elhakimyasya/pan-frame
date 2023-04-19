import { detectImageColor } from './detectImageColor';
import { imageToBase64 } from './imageToBase64';
import { snackbar } from './snackbar';

export const inputImage = (options) => {
    const target = document.querySelector(options.elementTarget);
    const images = document.querySelector(options.elementImage);

    target.addEventListener('change', async () => {
        let photoFile = target.files[0];

        snackbar('Mengunduh Photo...', 3000);

        images.setAttribute('src', await imageToBase64(photoFile));
    });
};
