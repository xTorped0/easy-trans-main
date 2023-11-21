export function menuHandler() {
	const menu = document.querySelector('.mobile.menu');
	const cross = document.querySelector('.mobile.menu .menu__cross');
	const menubtn = document.querySelector('.mobile.burger');

	menubtn.addEventListener('click', () => {
		menu.classList.add('active');
	});

	cross.addEventListener('click', () => {
		menu.classList.remove('active');
	});
}