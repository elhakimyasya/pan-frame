import panzoom from 'panzoom';
import html2canvas from 'html2canvas';
import './styles.css';

elcreativeConfig.options.optionFeatureImageZoom = "1px";

const viewport = document.querySelector('meta[name=viewport]');
viewport.setAttribute('content', 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0');

const uri = window.location.toString();
if (uri.indexOf('?m=1', '?m=1') > 0) {
    const cleanUri = uri.substring(0, uri.indexOf('?m=1'));
    window.history.replaceState({}, document.title, cleanUri);
};

const element = document.querySelector('.image_main img');
const instance = panzoom(element, {
    minZoom: 0.5,
    maxZoom: 3,
    bounds: true,
});

const resizeText = (selector) => {
    const textEl = document.querySelector(selector);

    // Get the maximum height of the parent element
    const maxHeight = textEl.parentNode.clientHeight;

    // Get the height of the text element
    let textHeight = textEl.clientHeight;

    // Calculate the font size based on the ratio of the text element's height to the parent element's height
    const ratio = maxHeight / textHeight;
    const fontSize = Math.min(100, ratio * 100);

    // Set the font size and line-height in percentage units
    textEl.style.fontSize = fontSize + '%';
    textEl.style.lineHeight = 1.3 * fontSize / 100;
};

const inputs = document.querySelectorAll('input[data-target]');
inputs.forEach(input => {
    const target = input.dataset.target;
    const span = document.querySelector(`[data-content="${target}"]`);
    input.addEventListener('keyup', () => {
        span.textContent = input.value;
    });
});

const imageToBase64 = (file) => new Promise((resolve, reject) => {
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
        resolve(reader.result);
    };

    reader.onerror = function (error) {
        reject(error);
    };
});

const inputPhoto = document.querySelector('.input_photo');
inputPhoto.onchange = async () => {
    let photoFile = inputPhoto.files[0];
    functionSnackbar('Mengunggah Foto...', 2000);

    document.querySelector('.image_main img').setAttribute('src', await imageToBase64(photoFile));
};

const selectElements = [
    {
        selectId: 'select_image_ornament',
        imageId: 'image_ornament',
        options: {
            "Logo PAN": "https://i.imgur.com/ROgEyYo.png",
            "Logo PAN - Bendera": "https://i.imgur.com/LDeJGq7.png",
            "Logo PAN - Pasti Ada HaraPAN": "https://i.imgur.com/Huwt70f.png",
            "Logo PAN - Birukan Langit Indonesia": "https://i.imgur.com/wP2VARX.png",

            "Logo PUAN": "https://i.imgur.com/E1XeCJq.png",

            "Logo PAN - Logo PUAN": "https://i.imgur.com/UPPAYZb.png",
            "Logo PAN - Logo DPRD Pringsewu": "https://i.imgur.com/5K6HsSf.png",
            
            "Workshop Rakornas - Pemenangan Pemilu": "https://i.imgur.com/U4yKWDP.png",
            "PAN 12 PAS": "https://i.imgur.com/NtbNvr2.png",
            "Pasti Ada HaraPAN": "https://i.imgur.com/KSQNDjj.png",
            "Birukan Langit Indonesia": "https://i.imgur.com/78RuXx9.png",
        }
    },
    {
        selectId: 'select_image_background',
        imageId: 'image_background',
        options: {
            "Background 1": "https://i.imgur.com/UUB5eWK.png",
            "Background 2": "https://i.imgur.com/49VKmUV.png",
            "Background 3": "https://i.imgur.com/40MpEHl.png",
            "Background 4": "https://i.imgur.com/xZnRcnQ.png",
            "Background 5": "https://i.imgur.com/gPmXTJs.png",
        }
    }
];

selectElements.forEach(selectElement => {
    const select = document.getElementById(selectElement.selectId);
    const image = document.getElementById(selectElement.imageId);

    for (const key in selectElement.options) {
        const option = document.createElement('option');
        option.value = selectElement.options[key];
        option.text = key;
        select.appendChild(option);
    }

    select.addEventListener('change', () => {
        functionSnackbar('Memuat gambar...', 1000);

        const selectedValue = select.value;
        if (selectedValue) {
            image.src = selectedValue;
        } else {
            image.src = 'https://i.imgur.com/LDeJGq7.png';
        }
    });
});

const imageContainer = document.querySelector('.image_container');
const buttonShare = document.querySelector('.btn_share_image');
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
        link.download = 'twibbon_pan.png';
        link.click();

        element.click();
    });
});

const buttonShareAlt = document.querySelector('.btn_share_image_alt');
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
}

resizeText('.content_primary .__wrapper');
resizeText('.content_secondary .__wrapper');

window.addEventListener('load', () => {
    resizeText('.content_primary .__wrapper');
    resizeText('.content_secondary .__wrapper');
});

// window.addEventListener('resize', () => {
//     resizeText('.content_primary .__wrapper');
//     resizeText('.content_secondary .__wrapper');
// });
