/* PARAMETERS */
let reset_when_inactive = true;

/* DOC READY */
document.addEventListener("DOMContentLoaded", function() {
	const display_pin_active = document.getElementById('displaypinaktiv').value;
	if (display_pin_active) {
		if (reset_when_inactive) setupInactivityDetection();
		document.addEventListener("focusin", trackFocusedInput);
	} else {

	}
});

function initMinimalInterface() {
	console.log("init min interface");
	showNotChargingInterface();
	
}