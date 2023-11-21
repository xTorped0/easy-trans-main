// import "../node_modules/aos/dist/aos.js";
import { buttonsListener } from "./buttonsListener.js";
import { carousel } from "./carousel.js";
import { menuHandler } from "./menu.js";
import { handleOnScroll, handleOrders } from "./order.js";


(function() {
	AOS.init({
		duration: 2000,
	});
	//
	buttonsListener();
	handleOrders();
	handleOnScroll();
	menuHandler();

	carousel('instagram-carousel');
	carousel('service-carousel');
	
	carousel();
}());