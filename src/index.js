// import "../node_modules/aos/dist/aos.js";
import { buttonsListener } from "./buttonsListener.js";


(function() {
	AOS.init({
		duration: 2000,
	});
	buttonsListener();
}());