import html2canvas from "html2canvas";
import { snackbar } from "./snackbar";

export const imageShare = (options) => {
    const elementImageContainer = document.querySelector(options.elementImageContainer);
    const buttonShare = document.querySelector(options.buttonShare);
    const buttonShareAlt = document.querySelector(options.buttonShareAlt);

    buttonShare.addEventListener('click', (event) => {
        event.preventDefault();
        snackbar('Mengunduh Photo...', 3000)

        html2canvas(elementImageContainer, {
            useCORS: true,
            scale: 4,
        }).then((canvas) => {
            const link = document.createElement('a');
            link.style.margin = "0 !important"
            link.href = canvas.toDataURL('image/jpeg');
            link.download = 'Twibbon_PAN.png';
            link.click();

            element.click();
        });
    });

    if (navigator.share) {
        buttonShareAlt.addEventListener('click', (event) => {
            event.preventDefault();

            snackbar('Mohon Tunggu...', 3000)

            html2canvas(elementImageContainer, {
                useCORS: true,
                scale: 4,
            }).then((canvas) => {
                fetch(canvas.toDataURL('image/png')).then((response) => {
                    return response.blob();
                }).then((blob) => {
                    const file = new File([blob], 'picture.jpg', {
                        type: 'image/jpeg'
                    });
                    const text = document.querySelector('.content_primary .__wrapper').textContent.trim().replace(/\s+/g, " ");

                    const filesArray = [file];
                    const shareData = {
                        text: `${text}\n\nBuat Twibbon PAN Disini: `,
                        files: filesArray,
                        title: text,
                        url: window.location.href,
                    };

                    if (navigator.canShare && navigator.canShare(shareData)) {
                        navigator.share(shareData);
                    }
                });
            });
        });
    } else {
        buttonShareAlt.style.display = 'none';
    };
};