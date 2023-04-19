export const detectImageColor = (imageURL, target) => {
    // Create a new image object
    const img = new Image();

    // Set the image source to the URL
    img.src = imageURL;

    // When the image is loaded, get its dominant color and set the background color of the target element
    img.onload = function () {
        // Create a canvas element and get its context
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');

        // Set the canvas dimensions to match the image dimensions
        canvas.width = img.width;
        canvas.height = img.height;

        // Draw the image onto the canvas
        context.drawImage(img, 0, 0);

        // Get the pixel data for the entire canvas
        const imageData = context.getImageData(0, 0, canvas.width, canvas.height);

        // Calculate the average brightness of the image
        let brightness = 0;
        for (let i = 0; i < imageData.data.length; i += 4) {
            brightness += (imageData.data[i] + imageData.data[i + 1] + imageData.data[i + 2]) / 3;
        }
        brightness /= imageData.data.length / 4;

        // Determine the new color based on the brightness
        let newColor;
        if (brightness < 128) {
            newColor = '#FFFFFF'; // set color to light if image is dark
        } else {
            newColor = '#000000'; // set color to dark if image is light
        }

        // Set the new color as the background color of the target element
        document.querySelector(target).style.color = newColor;
    };
};
