export const imageToBase64 = (file) => new Promise((resolve, reject) => {
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.addEventListener('load', () => {
        resolve(reader.result);
    });
    reader.addEventListener('error', (error) => {
        reject(error);
    });
});