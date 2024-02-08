/* START CHARGING */
function startCharging(btn) {
	startChargingUI(btn);
	// TODO: actually start charging
}

function startChargingUI(btn) {
    btn.disabled = true;
	btn.classList.add("no_background");
	btn.classList.add("inline");
	btn.classList.remove("glowing");
	fadeOut(btn);

	const chargingSpeedContainer = document.getElementById("charging_speed_container");
	fadeOut(chargingSpeedContainer);

	setTimeout(() => {
		btn.classList.remove("hidden");
		fadeIn(btn);
	}, 700);

	setTimeout(() => {
		const car_icon = document.getElementById("the_car");
		car_icon.classList.remove("hidden");
		fadeIn(car_icon);
	}, 700);
	
	setTimeout(() => {
		const chargin_dots = document.getElementById("charging_dots");
		chargin_dots.classList.remove("hidden");
		fadeIn(chargin_dots);
	}, 700);

	setTimeout(() => {
		const stop_charging = document.getElementById("stop_charging_button");
		stop_charging.classList.remove("hidden");
		fadeIn(stop_charging);
	}, 700);
}


/* STOP CHARGING */
function stopCharging(btn) {
    // TODO: actually stop chargin
    stopChargingUI(btn);
}

function stopChargingUI(btn) {
    fadeOut(btn);

	const startChargingButton = document.getElementById("start_charging_button");
	fadeOut(startChargingButton);

	const car_icon = document.getElementById("the_car");
	fadeOut(car_icon);

	const charging_dots = document.getElementById("charging_dots");
	fadeOut(charging_dots);

	setTimeout(() => {
		startChargingButton.classList.remove("no_background");
		startChargingButton.classList.remove("inline");
		startChargingButton.classList.add("glowing");
		startChargingButton.disabled = false;
		fadeIn(startChargingButton);
		
		const chargingSpeedContainer = document.getElementById("charging_speed_container");
		fadeIn(chargingSpeedContainer);
	}, 700);
}
