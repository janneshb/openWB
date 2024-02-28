/**
 * Helper Functions for Fancy Interface
 */

/* LOCK / UNLOCK */
function lock() {
	console.log("Locking interface...");
	displaylocked = true;
	$("#locked_body").removeClass("hidden");
	$("#charging_body").addClass("hidden");
	$("#loading_body").addClass("hidden");
	$("#not_charging_body").addClass("hidden");
	$("#the_footer").addClass("hidden");
}

function unlock() {
	console.log("Unlocking interface...");
	displaylocked = false;
	showLoadingUI();

	var charging = checkIfCharging();
	if (charging) {
		showChargingUI();
	} else {
		showNotChargingUI();
	}
}

function showLoadingUI() {
	$("#loading_body").removeClass("hidden");
	$("#locked_body").addClass("hidden");
	$("#charging_body").addClass("hidden");
	$("#not_charging_body").addClass("hidden");
	$("#the_footer").addClass("hidden");
}

function showChargingUI() {
	$("#charging_body").removeClass("hidden");
	$("#locked_body").addClass("hidden");
	$("#not_charging_body").addClass("hidden");
	$("#loading_body").addClass("hidden");
	$("#the_footer").addClass("hidden");

}

function showNotChargingUI() {
	$("#not_charging_body").removeClass("hidden");
	$("#the_footer").removeClass("hidden");
	$("#locked_body").addClass("hidden");
	$("#charging_body").addClass("hidden");
	$("#loading_body").addClass("hidden");
}

/* TRACK FOCUSED ELEMENT */
let focusedInput = null;
let previousFocusedInput = null;

function trackFocusedInput(event) {
	if (event.target.tagName === "INPUT") {
		previousFocusedInput = event.target;
	}
}

function focusInput() {
    focusedInput.focus();
}

/* SHOW PIN INTERFACE */
function showPinInterface() {
    document.getElementById("lock_container").style.visibility='hidden';
    document.getElementById("pin_container").style.visibility='visible';
    focusedInput = document.getElementById("pin_1");
    focusedInput.focus();

    document.getElementById('pin_1').addEventListener("blur", focusInput);
    document.getElementById('pin_2').addEventListener("blur", focusInput);
    document.getElementById('pin_3').addEventListener("blur", focusInput);
    document.getElementById('pin_4').addEventListener("blur", focusInput);
}

/* HANDLE PIN INPUT */
function pinClick(value) {
	if (focusedInput && focusedInput.tagName === 'INPUT') {
        focusedInput.value = value;
		if (focusedInput.id == 'pin_4') unlock();
		updatePinFocus();
    } else {
        console.log("No input element is currently focused. This should not happen in locked mode.");
    }
}

function updatePinFocus() {
	let nextElement = null;
    if (focusedInput.value.length == 1) {
		nextFieldID = focusedInput.getAttribute('next');
		nextElement = document.getElementById(nextFieldID);
    }
	if (focusedInput.value.length == 0) {
		let prevFieldID = focusedInput.getAttribute('prev');
		nextElement = document.getElementById(prevFieldID);
	}

	focusedInput = nextElement;
	focusedInput.focus();
}

function clearPin() {
	console.log("clear PIN");
	if (focusedInput.value.length == 0) {
		updatePinFocus();
	}
	focusedInput.value = "";
	focusedInput.focus();
}


/* CHECK IF CHARGING OR NOT */
function checkIfCharging() {
	console.log("Checking charge state...");
	// TODO return charging state (true/false)
	return true;
}

/* START / STOP CHARGING */
function startCharging() {
	console.log("Start charging...");
	var lp = 1; // charging point 1 by default
	publish("1", "openWB/set/lp/" + lp + "/ChargePointEnabled");
	charging = false;

	if (!displaylocked) {
		showLoadingUI();
		loading = true;
	}
}

function stopCharging() {
	console.log("Stop charging...");
	var lp = 1; // charging point 1 by default
	publish("0", "openWB/set/lp/" + lp + "/ChargePointEnabled");
	charging = false;

	if (!displaylocked) {
		showLoadingUI();
		loading = true;
	}
}

/* SET CHARGE MODE */
function setChargeModeInterface(charge_mode) {
	console.log("set charging mode for interface");
	switch(charge_mode) {
		case "0":
			// mode sofort
			$("#chargeModeRadioBtnMin").prop('checked', false);
			$("#chargeModeRadioBtnSofort").prop('checked', true);
			break;
		default:
			// mode min + pv
			$("#chargeModeRadioBtnMin").prop('checked', true);
			$("#chargeModeRadioBtnSofort").prop('checked', false);
	}
}

function setChargeMode(chargeMode) {
	console.log("set charge mode " + chargeMode);
	publish(chargeMode, "openWB/set/ChargeMode");
}

/* POWER AND kWh SINCE CHARGING */
function setPower(kW_text, unit) {
	console.log("Charging at " + kW_text + " " + unit);
	document.getElementById("powerSpan").textContent = kW_text + " " + unit;
}

function setEnergyCharged(kWh_text, unit) {
	console.log("Charged " + kWh_text + " " + unit);
	document.getElementById("energySpan").textContent = kWh_text + " " + unit;
}
