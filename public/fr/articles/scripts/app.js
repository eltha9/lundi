let mailSended = false;

function sendMail(value = '', callBack) {
	const serviceURL = 'https://ld-prd.lundi.ovh/mailling';
	if (mailSended) return;

	if (serviceURL.trim() !== '') {
		fetch(serviceURL, {
			method: 'POST',
			headers: {'Content-Type': 'application/json'},
			body: JSON.stringify({
				mail: value,
				meta: {
					langue: navigator?.language || '',
					languages: navigator?.languages || [],
				},
			}),
		}).then((res) => {
			callBack();
		});
	}
}

function createEvents({formInput, formSubmit}) {
	console.log('event listening');
	formSubmit.addEventListener('click', (event) => {
		event.preventDefault();
		sendMail(formInput.value, () => {
			mailSended = true;
			formInput.value = '';
		});
	});
}

const forms = document.querySelectorAll('form');

for (const form of forms) {
	const input = form.querySelector('input[type=email]');
	const submit = form.querySelector('.form-submit');
	createEvents({formInput: input, formSubmit: submit});
}
