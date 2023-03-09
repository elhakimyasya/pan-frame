import './styles.css';
import panzoom from 'panzoom';
import html2canvas from 'html2canvas';
import { resizeText } from './resizeText';
import { panZoom } from './panZoom';
import { inputKeyup } from './inputKeyup';
import { inputImage } from './inputImage';

Defer(() => {
    window.easyToggleState()
});

const isMobile = () => {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
};

elcreativeConfig.options.optionFeatureImageZoom = "1px";

const viewport = document.querySelector('meta[name=viewport]');
viewport.setAttribute('content', 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0');

const uri = window.location.toString();
if (uri.indexOf('?m=1', '?m=1') > 0) {
    const cleanUri = uri.substring(0, uri.indexOf('?m=1'));
    window.history.replaceState({}, document.title, cleanUri);
};

const imagePhotos = document.querySelector('#post_body .image_main img');
panZoom({
    elementImage: '#post_body .image_main img',
    elementImageOrnament: '.image_ornament',
    elementImageBackground: '.image_background',
    elementContentPrimary: '.content_primary',
    elementContentSecondary: '.content_secondary',
});
inputKeyup({
    elementTarget: '#post_body input[data-target]',
});
inputImage({
    elementImage: '#post_body .image_main img',
    elementTarget: '#post_body .input_photo',
});

const init = (config, dialogContainer) => {
    config.forEach((element) => {
        const select = document.querySelector(selectElement.selectId);
        const image = document.querySelector(selectElement.imageId);
        const button = document.querySelector(element.buttonId);
        const dialog = document.querySelector(dialogContainer);

        let images = '';
        for (const key in element.options) {
            // const option = document.createElement('option');
            // option.value = selectElement.options[key];
            // option.text = key;
            // select.appendChild(option);

            images += `<img class='border cursor-pointer' title='${key}' src='${element.options[key]}' onclick='document.querySelector("${element.imageId}").src="${element.options[key]}"' data-toggle-trigger-off/>`;
        };

        if (select) {
            select.addEventListener('change', () => {
                functionSnackbar('Memuat gambar...', 1000);

                const selectedValue = select.value;
                if (selectedValue) {
                    image.src = selectedValue;
                } else {
                    image.src = 'https://i.imgur.com/LDeJGq7.png';
                }
            });
        };

        if (button) {
            button.addEventListener('click', (event) => {
                event.preventDefault();
                functionSnackbar('Memuat gambar...', 1000);
                dialog.querySelector('.dialog_content').innerHTML = `<div class='grid grid-cols-2 gap-2 lg:grid-cols-3'>${images}</div>`
            });
            button.addEventListener('toggleAfter', (event) => {
                if (easyToggleState.isActive(event.target)) {
                    document.documentElement.classList.add('overflow-hidden');
                } else {
                    document.documentElement.classList.remove('overflow-hidden');
                }
            })
        };
    })
};

init(selectElements, '#dialog_twibbon');

const imageContainer = document.querySelector('#post_body .image_container');
const buttonShare = document.querySelector('#post_body .btn_share_image');
buttonShare.addEventListener('click', (event) => {
    event.preventDefault();
    functionSnackbar('Mendownload Foto...', 2000);

    html2canvas(imageContainer, {
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

const buttonShareAlt = document.querySelector('#post_body .btn_share_image_alt');
if (navigator.share) {
    buttonShareAlt.addEventListener('click', (event) => {
        event.preventDefault();

        functionSnackbar('Mohon Tunggu...', 2000);

        html2canvas(imageContainer, {
            useCORS: true,
            scale: 4,
        }).then((canvas) => {
            fetch(canvas.toDataURL('image/png')).then((response) => {
                return response.blob();
            }).then((blob) => {
                const file = new File([blob], 'picture.jpg', {
                    type: 'image/jpeg'
                });
                const text = document.querySelector('#post_body .content_primary .__wrapper').textContent.trim().replace(/\s+/g, " ");

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

resizeText('#post_body .content_primary .__wrapper');
resizeText('#post_body .content_secondary .__wrapper');

window.addEventListener('resize', () => {
    if (!isMobile()) {
        resizeText('#post_body .content_primary .__wrapper');
        resizeText('#post_body .content_secondary .__wrapper');
    }
});

window.addEventListener('orientationchange', () => {
    if (!isMobile()) {
        resizeText('#post_body .content_primary .__wrapper');
        resizeText('#post_body .content_secondary .__wrapper');
    }
});