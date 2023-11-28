import { Network } from "../config.js";

export function handleOrders() {
	const dialog = document.querySelector('dialog[name="make-order"]');
	const form = dialog.querySelector('.dialog__content_form');
	const close = dialog.querySelector('.dialog__close');
	//
	const acceptDialog = document.querySelector('dialog[name="accept-order"]');
	const closeAcceptDialog = acceptDialog.querySelector('.dialog__close');
	const buttonAcceptDialog = acceptDialog.querySelector('.dialog__content_button');

	form.addEventListener('submit', async (event) => {
		event.preventDefault();

		const formData = new FormData(form);
		const data = Object.fromEntries(formData.entries());

		try {
			const response = await fetch(Network.api + '/orders', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(data),
			});

			if (!response.ok) {
				throw new Error(`HTTPS error! status: ${response.status}`);
			}

			dialog.close();
			form.reset();

			acceptDialog.showModal();
		} catch (error) {
			console.error(error);

			const errorText = dialog.querySelector('.dialog__content_error');
			errorText.innerHTML = 'Помилка, спробуйте пізніше або зателефонуйте нам';
		}
	});
		
	close.addEventListener('click', () => {
		dialog.close();
	});

	closeAcceptDialog.addEventListener('click', () => {
		acceptDialog.close();
	});

	buttonAcceptDialog.addEventListener('click', () => {
		acceptDialog.close();
	});

	dialog.addEventListener('close', () => {
    document.body.style.overflow = ''; // Enable scrolling
  });
}

const text = `Не втрачай можливість  <span class="yellow"> отримати кешбек </span>, залишай заявку, якщо менеджер не зателефоную протягом 7 хвилин -  <span class="yellow"> 7% знижки  </span> на будь-які послуги. `

export function handleOnScroll () {	
	const dialog = document.querySelector('dialog[name="make-order"]');
	const acceptDialog = document.querySelector('dialog[name="accept-order"]');
	const showDialog = document.querySelector('#showDialog');
	const menu = document.querySelector('.mobile.menu');

	const rect = showDialog.getBoundingClientRect();

	let isShown = false;

	const isActive = () => menu.classList.contains('active') || dialog.hasAttribute('open') || acceptDialog.hasAttribute('open');
	
	document.addEventListener('scroll', (e) => {
		if(isShown || isActive()) return;

		if (rect.top <= window.scrollY) {
			isShown = true;
			if(dialog.open) return;
			//
			onOpenDialog();
		}
	}, { passive: true });

	setTimeout(() => {
		if(isShown || isActive()) return;
		isShown = true;
		if(dialog.open) return;

		onOpenDialog();
	}, 15000);
}

export function onOpenDialog() {
	const dialog = document.querySelector('dialog[name="make-order"]');
	const dialog_text = dialog.querySelector('.dialog__content_text');
	const errorText = dialog.querySelector('.dialog__content_error');

	dialog.showModal();
	document.body.style.overflow = 'hidden'; // Disable scrolling
	dialog_text.innerHTML = text;
	errorText.innerHTML = '';
	// Set focus to the dialog itself
	dialog.focus();
}