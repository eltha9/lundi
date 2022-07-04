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
	const submit = form.querySelector('.button-custom');
	createEvents({formInput: input, formSubmit: submit});
}

// popup function 
function closeEvent(target ){
    const closeBtn  = target.querySelector("a.button")
    
    closeBtn.addEventListener('click', (e)=>{
        e.preventDefault()
        target.style.display = "none"
    })
    console.log("close event created")
}
function openEvent(target, btnNode){
    btnNode.addEventListener("click", (e)=>{
        e.preventDefault()
        target.style.display = "flex"
    })
    console.log("open event created")
}
const popups = document.querySelectorAll(".popup1,.popup2,.popup3")
const openButtons = document.querySelectorAll(".popup-opener")

for(let i=0; i< popups.length; i++){
    openEvent(popups[i], openButtons[i])
    closeEvent(popups[i])
}

document.addEventListener("keydown", (e)=>{
    if(e.code === "Escape" || e.keyCode === 27){
        popups.forEach(items =>{
            items.style.display = "none"
        })
    }
    console.log(e)
})

