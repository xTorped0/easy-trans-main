export function carousel(carousel){
	const items = document.querySelectorAll(`.gallery.${carousel} .gallery__element`);
	const indicators = document.querySelectorAll(`.gallery.${carousel} .items .item`);
	const buttons = document.querySelectorAll(`.gallery.${carousel} .controllers button`)

	let currentIndex = 0;
	
	const getIndex = (number) => {
		let length = items.length;

		if(number < 0) return length - 1;
		if(number >= length) return 0;

		else return number;
	}
	
	function upgradeCarousel() {
		items.forEach((item) => {
			item.removeAttribute('current');
		});
		indicators.forEach((item) => {
			item.classList.remove("current");
		});

		const currentIndicator = indicators[currentIndex];
		const currentItem = items[currentIndex];

		currentIndicator.classList.add("current");
		currentItem.setAttribute("current", '')
	}

	buttons.forEach((btn, ind) => {
		btn.onclick = () => {
			currentIndex = getIndex(ind === 0 ? currentIndex - 1 : currentIndex + 1);

			upgradeCarousel();
		}
	});

	let touchStartX = null;

	items.forEach(item => {
		item.addEventListener('touchstart', (event) => {
			touchStartX = event.changedTouches[0].clientX;
		}, { passive: true });

		item.addEventListener('touchend', (event) => {
			const touchEndX = event.changedTouches[0].clientX;
			const diffX = touchStartX - touchEndX;

			if (Math.abs(diffX) > 100) { // threshold value
				currentIndex = getIndex(diffX > 0 ? currentIndex + 1 : currentIndex - 1);
				upgradeCarousel();
			}

			touchStartX = null;
		}, { passive: true });
	});
}