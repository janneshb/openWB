/* LOADING ... */
function enableLoadingUI() {
	var btn = document.getElementById("loading_charging_button");
	fadeIn(btn);
}

function disableLoadingUI() {
	var btn = document.getElementById("loading_charging_button");
	fadeOut(btn);
}

/* CLEAR INTERFACE */
function clearInterface() {
	const startChargingBtn = document.getElementById("start_charging_button");
	fadeOut(startChargingBtn);

	const chargingSpeedContainer = document.getElementById("charging_speed_container");
	fadeOut(chargingSpeedContainer);

	const footer = document.getElementsByTagName("footer")[0];
	fadeOut(footer);

	const theCar = document.getElementById("the_car");
	fadeOut(theCar);

	const theBolt = document.getElementById("the_bolt");
	fadeOut(theBolt);

	const chargingDots = document.getElementById("charging_dots");
	fadeOut(chargingDots);

	const stopChargingBtn = document.getElementById("stop_charging_button");
	fadeOut(stopChargingBtn);
}

/* START CHARGING */
function startCharging() {
	console.log("start charging...");
	clearInterface();
	setTimeout(() => {
		enableLoadingUI();
	}, 700);

	var lp = 1; // charging point 1 by default
	publish("1", "openWB/set/lp/" + lp + "/ChargePointEnabled");
	
	setTimeout(() => {
		disableLoadingUI();
	}, 700);

	setTimeout(() => {
		showChargingInterface();
	}, 700);
}

function showChargingInterface() {
	setTimeout(() => {
		const bolt_icon = document.getElementById("the_bolt");
		fadeIn(bolt_icon);
	}, 700);

	setTimeout(() => {
		const car_icon = document.getElementById("the_car");
		fadeIn(car_icon);
	}, 700);
	
	setTimeout(() => {
		const charging_dots = document.getElementById("charging_dots");
		fadeIn(charging_dots);
	}, 700);

	setTimeout(() => {
		const stop_charging = document.getElementById("stop_charging_button");
		fadeIn(stop_charging);
	}, 700);
}


/* STOP CHARGING */
function stopCharging() {
	console.log("stop charging...");
	clearInterface();
	setTimeout(() => {
		enableLoadingUI();
	}, 700);

	var lp = 1; // charging point 1 by default
	publish("0", "openWB/set/lp/" + lp + "/ChargePointEnabled");
	
	setTimeout(() => {
		disableLoadingUI();
	}, 700);

	setTimeout(() => {
		showNotChargingInterface();
	}, 1400);
}

function showNotChargingInterface() {
	const startChargingBtn = document.getElementById("start_charging_button");
	fadeIn(startChargingBtn);
	
	const chargingSpeedContainer = document.getElementById("charging_speed_container");
	fadeIn(chargingSpeedContainer);

	const footer = document.getElementsByTagName("footer")[0];
	fadeIn(footer);
}

function setChargeMode(chargeMode) {
	console.log("set charge mode " + chargeMode);
	publish(chargeMode, "openWB/set/ChargeMode");
}