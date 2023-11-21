const text = `Якщо протягом 7 хвилин менеджер не зателефонує <span class="yellow"> Вам - знижка 7%. </span>`;

export function buttonsListener() {
	const buttons = document.querySelectorAll('button[name="order"]');
	const dialog = document.querySelector('dialog[name="make-order"]');
	const dialog_text = dialog.querySelector('.dialog__content_text');

	buttons.forEach(button => {
		button.addEventListener('click', () => {
			dialog_text.innerHTML = text;
			document.body.style.overflow = 'hidden'; // Disable scrolling
			dialog.showModal();
		});
	});
}