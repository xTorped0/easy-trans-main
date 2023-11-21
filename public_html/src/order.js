import { Network } from "../config.js";

export function handleOrders() {
	const dialog = document.querySelector('dialog[name="make-order"]');
	const form = dialog.querySelector('.dialog__content_form');

	form.addEventListener('submit', async (event) => {
		event.preventDefault();

		const formData = new FormData(form);
		const data = Object.fromEntries(formData.entries());

		try {
			await fetch(Network.api + '/orders', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(data),
			});

			dialog.close();
			form.reset();
		} catch (error) {
			console.error(error);
		}
	});
}

const text = `Не втрачай можливість  <span class="yellow"> отримати кешбек </span>, залишай заявку, якщо менеджер не зателефоную протягом 7 хвилин -  <span class="yellow"> 7% знижки  </span> на будь-які послуги. `

export function handleOnScroll () {	
	const dialog = document.querySelector('dialog[name="make-order"]');
	const dialog_text = dialog.querySelector('.dialog__content_text');
	const showDialog = document.querySelector('#showDialog');
	const menu = document.querySelector('.mobile.menu');

	const rect = showDialog.getBoundingClientRect();

	let isShown = false;

	const isActive = () => menu.classList.contains('active');
	
	document.addEventListener('scroll', (e) => {
		if(isShown || isActive) return;

		if (rect.top <= window.scrollY) {
			isShown = true;
			if(dialog.open) return;
			//
			dialog.showModal();
			dialog_text.innerHTML = text; 
		}
	});

	setTimeout(() => {
		if(isShown || isActive) return;

		isShown = true;
		if(dialog.open) return;

		dialog.showModal();
		dialog_text.innerHTML = text;
	}, 15000);
}