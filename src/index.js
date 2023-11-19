// import "../node_modules/aos/dist/aos.js";
import { buttonsListener } from "./buttonsListener.js";
import { handleOrders } from "./order.js";


(function() {
	AOS.init({
		duration: 2000,
	});
	//
	buttonsListener();
	handleOrders();
}());