import './styles.css';
import panzoom from 'panzoom';
import html2canvas from 'html2canvas';
import { resizeText } from './resizeText';
import { imageToBase64 } from './imageToBase64';

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
const instance = panzoom(imagePhotos, {
    containZoom: true,
    autocenter: true,
    minZoom: 0.5,
    maxZoom: 3,
    bounds: true,
});

const imageOrnament = document.querySelector('.image_ornament');
const imageBackground = document.querySelector('.image_background');
const contentPrimary = document.querySelector('.content_primary');
const contentSecondary = document.querySelector('.content_secondary');
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
instance.on('panzoomchange', () => {
    imagePhotos.style.setProperty('transform-origin', '50% 50%');
});

const inputs = document.querySelectorAll('#post_body input[data-target]');
inputs.forEach(input => {
    const target = input.dataset.target;
    const span = document.querySelector(`#post_body span[data-content="${target}"]`);
    input.addEventListener('keyup', () => {
        span.textContent = input.value;

        resizeText('#post_body .content_primary .__wrapper');
        resizeText('#post_body .content_secondary .__wrapper');
    });
});

const inputPhoto = document.querySelector('#post_body .input_photo');
inputPhoto.onchange = async () => {
    let photoFile = inputPhoto.files[0];
    functionSnackbar('Mengunggah Foto...', 2000);

    imagePhotos.setAttribute('src', await imageToBase64(photoFile));
};

// selectElements (index.html)

const dialogTwibbon = document.querySelector('#dialog_twibbon');
selectElements.forEach(selectElement => {
    const select = document.querySelector(selectElement.selectId);
    const image = document.querySelector(selectElement.imageId);

    const button = document.querySelector(selectElement.buttonId);
    let images = '';

    for (const key in selectElement.options) {
        // const option = document.createElement('option');
        // option.value = selectElement.options[key];
        // option.text = key;
        // select.appendChild(option);

        images += `<img class='border cursor-pointer' title='${key}' src='${selectElement.options[key]}' onclick='document.querySelector("${selectElement.imageId}").src="${selectElement.options[key]}"' data-toggle-trigger-off/>`;
    };

    // select.addEventListener('change', () => {
    //     functionSnackbar('Memuat gambar...', 1000);

    //     const selectedValue = select.value;
    //     if (selectedValue) {
    //         image.src = selectedValue;
    //     } else {
    //         image.src = 'https://i.imgur.com/LDeJGq7.png';
    //     }
    // });

    button.addEventListener('click', (event) => {
        event.preventDefault();
        functionSnackbar('Memuat gambar...', 1000);
        dialogTwibbon.querySelector('.dialog_content').innerHTML = `<div class='grid grid-cols-2 gap-2 lg:grid-cols-3'>${images}</div>`
    });

    button.addEventListener('toggleAfter', (event) => {
        if (easyToggleState.isActive(event.target)) {
            document.documentElement.classList.add('overflow-hidden');
        } else {
            document.documentElement.classList.remove('overflow-hidden');
        }
    })
});

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