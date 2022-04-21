let mailSended = false;

function sendMail(value = '', position = 'error') {
	const serviceURL = '';
	if (mailSended) return;

	if (serviceURL.trim() !== '') {
		fetch(serviceURL, {
			method: 'GET',
			headers: {'Content-Type': 'application/json'},
			body: JSON.stringify({
				mail: value,
				position,
				meta: {
					langue: navigator?.language || '',
					languages: navigator?.languages || [],
				},
			}),
		}).then((res) => {
			mailSended = true;
		});
	}
}

function createEvents({formInput, formSubmit, position}) {
	formSubmit.addEventListener('click', (event) => {
		sendMail(formInput.value, position);
	});
}

const topÌnput = {
	formInput: document.querySelector('.top-form input[type=email]'),
	formSubmit: document.querySelector('.top-form .form-submit'),
	position: 'top',
};
const bottomÌnput = {
	formInput: document.querySelector('.bottom-form input[type=email]'),
	formSubmit: document.querySelector('.bottom-form .form-submit'),
	position: 'bottom',
};

createEvents(topÌnput);
createEvents(bottomÌnput);
