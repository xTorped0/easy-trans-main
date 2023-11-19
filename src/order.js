export function handleOrders() {
	const dialog = document.querySelector('dialog[name="make-order"]');
	const form = dialog.querySelector('.dialog__content_form');

	form.addEventListener('submit', async (event) => {
		event.preventDefault();

		const formData = new FormData(form);
		const data = Object.fromEntries(formData.entries());

		try {
			await fetch('http://localhost:5001/api/orders', {
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