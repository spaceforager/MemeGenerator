let topTextInput, bottomTextInput, imageInput, generateBtn, canvas, context; //no need to show this as global


const generateMeme = function (img, topText, bottomText) {
    canvas.width = img.width;
    canvas.height = img.height;

    context.clearRect(0, 0, canvas.width, canvas.height);

    context.drawImage(img, 0, 0); // add canvas.width and canvas.height

    let fontSize = canvas.width / 15;
    context.font = fontSize + 'px Impact';
    context.fillStyle = 'white';
    context.strokeStyle = 'black';
    context.lineWidth = fontSize / 15;
    context.textAlign = 'center';


    context.textBaseLine = 'top';
    topText.split('\n').forEach((t, i) => {
        context.fillText(t, canvas.width / 2, (i + 1)* fontSize, canvas.width);
        context.strokeText(t, canvas.width / 2, (i + 1) * fontSize, canvas.width);
    });

    
    context.textBaseLine = 'bottom';
    bottomText.split('\n').reverse().forEach( (b, i) => {
    context.fillText(b, canvas.width / 2, canvas.height - i * fontSize , canvas.width);
    context.strokeText(b, canvas.width / 2, canvas.height - i * fontSize, canvas.width);
});
}

function init() {
    topTextInput = document.querySelector('#top-text');
    bottomTextInput = document.querySelector('#bottom-text');
    imageInput = document.getElementById('image-input');
    generateBtn = document.querySelector('#generate-btn');
    let deleteBtn = document.querySelector('#delete-btn')
    canvas = document.querySelector('#meme-canvas');
    

    context = canvas.getContext('2d');

    canvas.width = canvas.height = 0;

    generateBtn.addEventListener('click', e => {
        e.preventDefault();
        const reader = new FileReader();
        reader.onload = () => {
            const img = new Image;
            img.src = reader.result;
            
            try {
            generateMeme(img, topTextInput.value, bottomTextInput.value);
            } catch (err) {
                console.log("Error whie loading:", e);

            }
            
        };
        reader.readAsDataURL(imageInput.files[0]);
    });

    deleteBtn.addEventListener('click', () => {
        context.clearRect(0, 0, 0, 0);
    })

}

init();


