export function menuHandler() {
	const menu = document.querySelector('.mobile.menu');
	const cross = document.querySelector('.mobile.menu .menu__cross');
	const menubtn = document.querySelector('.mobile.burger');
	const menuBtns = menu.querySelectorAll('.menu__nav_item');

	menuBtns.forEach((btn) => {
		btn.addEventListener('click', () => {
			menu.classList.remove('active');
			document.body.style.overflowY = 'auto'; // Enable scrolling
		});
	});

	menubtn.addEventListener('click', () => {
		menu.classList.add('active');
		document.body.style.overflowY = 'hidden'; // Disable scrolling
	});

	cross.addEventListener('click', () => {
		menu.classList.remove('active');
		document.body.style.overflowY = 'auto'; // Enable scrolling
	});
}