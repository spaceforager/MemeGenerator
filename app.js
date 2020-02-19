let canvas, context; //no need to show this as global

const generateMeme = function(img, topText, bottomText) {
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
		context.fillText(t, canvas.width / 2, (i + 1) * fontSize, canvas.width);
		context.strokeText(t, canvas.width / 2, (i + 1) * fontSize, canvas.width);
	});

	context.textBaseLine = 'bottom';
	bottomText.split('\n').reverse().forEach((b, i) => {
		context.fillText(b, canvas.width / 2, canvas.height - i * fontSize, canvas.width);
		context.strokeText(b, canvas.width / 2, canvas.height - i * fontSize, canvas.width);
	});
};

function init() {
	let topTextInput = document.querySelector('#top-text');
	let bottomTextInput = document.querySelector('#bottom-text');
	let imageInput = document.getElementById('image-input');
	let generateBtn = document.querySelector('#generate-btn');
	let deleteBtn = document.querySelector('#delete-btn');
	canvas = document.querySelector('#meme-canvas');

	const reader = new FileReader();
	reader.onload = () => {
		const img = new Image()
		try {
			// Don't let user upload none but jpeg - btw is this enough?
			if (reader.result.startsWith('data:image/jpeg')) {
				img.src = reader.result;
			} else {
				throw new Error('Wrong mimetype')
			}
			img.onload = () => {
				generateMeme(img, topTextInput.value, bottomTextInput.value);
			}
		} catch(e) {
			context.clearRect(0, 0, canvas.width, canvas.height);
			imageInput.value = '';
			alert('Nice try, how about some jpeg?')
		} finally {
			// for some reason we wanna log each file loading
			console.log(new Date().toString());
		}
		
		// other way how to catch errors is with built-in method ".onerror"
		// img.onerror = () => {
		// 	console.log('doesnt look like img')
		// }

	};
	context = canvas.getContext('2d');

	canvas.width = canvas.height = 0;

	generateBtn.addEventListener('click', (e) => {
		e.preventDefault();
		reader.readAsDataURL(imageInput.files[0]);
	});

	deleteBtn.addEventListener('click', (e) => {
		e.preventDefault()
		context.clearRect(0, 0, canvas.width, canvas.height);
	});
}

init();
