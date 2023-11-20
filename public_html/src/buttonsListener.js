export function buttonsListener() {
	const buttons = document.querySelectorAll('button[name="order"]');
	const dialog = document.querySelector('dialog[name="make-order"]');
	const close = document.querySelector('.dialog__close');

	buttons.forEach(button => {
		button.addEventListener('click', () => {
			dialog.showModal();
		});
	});

	close.addEventListener('click', () => {
		dialog.close();
	});
}