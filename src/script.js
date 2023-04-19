import './styles.css';
import { resizeText } from './resizeText';
import { panZoom } from './panZoom';
import { inputKeyup } from './inputKeyup';
import { inputImage } from './inputImage';
import { imageShare } from './imageShare';
import { snackbar } from './snackbar';
import { detectImageColor } from './detectImageColor';

Defer(() => {
    window.easyToggleState();
});

const isMobile = () => {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
};

elcreativeConfig.options.optionFeatureImageZoom = '1px';

const initTwibbon = (config) => {
    const container = document.querySelector(config.elementContainer);

    const viewport = document.querySelector('meta[name=viewport]');
    viewport.setAttribute('content', 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0');

    const uri = window.location.toString();
    if (uri.indexOf('?m=1', '?m=1') > 0) {
        const cleanUri = uri.substring(0, uri.indexOf('?m=1'));
        window.history.replaceState({}, document.title, cleanUri);
    }

    if (container) {
        snackbar('Mohon Tunggu...', 3000);

        const templates = `
            <div class="image_container">
                <img id="image_ornament" class="image_ornament" src="https://i.imgur.com/SXfRR7P.png" width="500" height="500" />
                <img id="image_background" class="image_background" src="https://i.imgur.com/v8RlLnh.png" width="500" height="500" />
                <div class="image_content">
                    <div class="w-full h-full flex items-center justify-center">
                        <div class="image_main">
                            <img src="https://i.imgur.com/iQJfs2N.png" width="500" height="500" />
                        </div>
                    </div>
                    <div class="content_primary">
                        <div class="__wrapper">
                            <span class="__text_top" data-content="primary-text-top">TWIBBON CAMPAIGN</span>
                            <span class="__text_center" data-content="primary-text-center">PARTAI AMANAT NASIONAL</span>
                            <span class="__text_bottom" data-content="primary-text-bottom"></span>
                        </div>
                    </div>
                    <div class="content_secondary">
                        <div class="__wrapper">
                            <span class="__text_top" data-content="secondary-text-top">Dr. (HC) Zulkifli Hasan, S.E., M.M</span>
                            <span class="__text_bottom" data-content="secondary-text-bottom">Ketua Umum DPP PAN | Menteri Perdagangan RI</span>
                        </div>
                    </div>
                </div>
            </div>
        
            <div class="container_editor mt-6">
                <div class="container_buttons_grid grid grid-cols-2 items-center justify-center text-center gap-2 mb-4 select-none">
                    <div id="button_choose_logo" class="elcreative_ripple button_grid" aria-label="Pilih Logo" data-toggle-class-on-target="active" data-toggle-escape="" data-toggle-outside="" data-toggle-target="#dialog_twibbon">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" aria-hidden="true" fill="currentColor"><path d="M22.7 14.3L21.7 15.3L19.7 13.3L20.7 12.3C20.8 12.2 20.9 12.1 21.1 12.1C21.2 12.1 21.4 12.2 21.5 12.3L22.8 13.6C22.9 13.8 22.9 14.1 22.7 14.3M13 19.9V22H15.1L21.2 15.9L19.2 13.9L13 19.9M11.21 15.83L9.25 13.47L6.5 17H13.12L15.66 14.55L13.96 12.29L11.21 15.83M11 19.9V19.05L11.05 19H5V5H19V11.31L21 9.38V5C21 3.9 20.11 3 19 3H5C3.9 3 3 3.9 3 5V19C3 20.11 3.9 21 5 21H11V19.9Z" /></svg><span>Pilih Logo</span>
                    </div>
                    <div id="button_choose_design" class="elcreative_ripple button_grid" aria-label="Pilih Logo" data-toggle-class-on-target="active" data-toggle-escape="" data-toggle-outside="" data-toggle-target="#dialog_twibbon">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" viewBox="0 0 24 24" width="24" height="24" aria-hidden="true" fill="currentColor"><path d="M19,19H5V5H19M19,3H5A2,2 0 0,0 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5A2,2 0 0,0 19,3M13.96,12.29L11.21,15.83L9.25,13.47L6.5,17H17.5L13.96,12.29Z" /></svg><span>Pilih Desain</span>
                    </div>
                </div>
                
                <div class="elcreative_input">
                    <input id="input_text_top" name="image_input" placeholder=" " type="text" data-target="primary-text-top" />
                    <label for="input_text_top">Teks Atas</label>
                </div>
                <div class="elcreative_input">
                    <input id="input_text_center" name="image_input" placeholder=" " type="text" data-target="primary-text-center" />
                    <label for="input_text_center">Teks Tengah</label>
                </div>
                <div class="elcreative_input mb-4">
                    <input id="input_text_bottom" name="image_input" placeholder=" " type="text" data-target="primary-text-bottom" />
                    <label for="input_text_bottom">Teks Bawah</label>
                </div>
                <div class="elcreative_input mb-4">
                    <input class="input_photo" id="foto" name="name" placeholder=" " type="file" accept="image/*" />
                    <label for="input_photo">Unggah Foto</label>
                </div>
                <div class="elcreative_input">
                    <input id="input_text_top_secondary" name="image_input" placeholder=" " type="text" data-target="secondary-text-top" />
                    <label for="input_text_top_secondary">Nama Lengkap</label>
                </div>
                <div class="elcreative_input mb-4">
                    <input id="input_text_bottom_secondary" name="image_input" placeholder=" " type="text" data-target="secondary-text-bottom" />
                    <label for="input_text_bottom_secondary">Jabatan (Opsional)</label>
                </div>
        
                <div class="mx-auto">
                    <div class="btn_share_image elcreative_button elcreative_ripple raised w-full">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="currentColor"><path d="M2 12H4V17H20V12H22V17C22 18.11 21.11 19 20 19H4C2.9 19 2 18.11 2 17V12M12 15L17.55 9.54L16.13 8.13L13 11.25V2H11V11.25L7.88 8.13L6.46 9.55L12 15Z" /></svg>
                        <span>Simpan Gambar</span>
                    </div>
                    <div class="btn_share_image_alt elcreative_button elcreative_ripple raised w-full">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="currentColor"><path d="M12,1L8,5H11V14H13V5H16M18,23H6C4.89,23 4,22.1 4,21V9A2,2 0 0,1 6,7H9V9H6V21H18V9H15V7H18A2,2 0 0,1 20,9V21A2,2 0 0,1 18,23Z" /></svg>
                        <span>Bagikan Ke..</span>
                    </div>
                </div>
            </div>
            <div aria-hidden="true" class="elcreative_dialog dialog_twibbon" id="dialog_twibbon" role="listbox">
                <div class="dialog_container">
                    <div class="dialog_header">
                        <span>Pilih Gambar</span>
                        <button aria-label="Close" class="elcreative_ripple elcreative_button_icon button_close_dialog ltr:ml-2 rtl:mr-2" data-toggle-trigger-off="" title="Close" type="button">
                            <svg aria-hidden="true" fill="currentColor" height="24" viewBox="0 0 24 24" width="24"><path d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z" /></svg>
                        </button>
                    </div>
                    <div class="dialog_content content_twibbon"></div>
                </div>
            </div>
        `;

        container.innerHTML = templates;

        panZoom({
            elementImage: `${config.elementContainer} .image_main img`,
            elementImageOrnament: `${config.elementContainer} .image_ornament`,
            elementImageBackground: `${config.elementContainer} .image_background`,
            elementContentPrimary: `${config.elementContainer} .content_primary`,
            elementContentSecondary: `${config.elementContainer} .content_secondary`,
        });
        inputKeyup({
            elementTarget: `${config.elementContainer} input[data-target]`,
        });
        inputImage({
            elementImage: `${config.elementContainer} .image_main img`,
            elementTarget: `${config.elementContainer} .input_photo`,
        });
        imageShare({
            elementImageContainer: `${config.elementContainer} .image_container`,
            buttonShare: `${config.elementContainer} .btn_share_image`,
            buttonShareAlt: `${config.elementContainer} .btn_share_image_alt`,
        });

        const initConfig = config.config;
        const dialog = container.querySelector('#dialog_twibbon');
        if (initConfig) {
            initConfig.forEach((element) => {
                const select = document.querySelector(element.selectId);
                const image = document.querySelector(element.imageId);
                const button = document.querySelector(element.buttonId);

                let images = '';
                for (const key in element.options) {
                    // const option = document.createElement('option');
                    // option.value = selectElement.options[key];
                    // option.text = key;
                    // select.appendChild(option);

                    images += `<img class='border cursor-pointer' title='${key}' src='${element.options[key]}' onclick='document.querySelector("${element.imageId}").src="${element.options[key]}"' data-toggle-trigger-off/>`;
                }

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
                }

                if (button) {
                    button.addEventListener('click', (event) => {
                        event.preventDefault();
                        functionSnackbar('Memuat gambar...', 1000);
                        dialog.querySelector('.dialog_content').innerHTML = `<div class='grid grid-cols-2 gap-2 lg:grid-cols-3'>${images}</div>`;
                    });
                    button.addEventListener('toggleAfter', (event) => {
                        if (easyToggleState.isActive(event.target)) {
                            document.documentElement.classList.add('overflow-hidden');
                        } else {
                            document.documentElement.classList.remove('overflow-hidden');
                        }
                    });
                }
            });
        }
    }
};

initTwibbon({
    elementContainer: '#container_twibbon',
    config: selectElements,
});

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
