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
	$("#lock_container").removeClass("hidden");
	$("#pin_container").addClass("hidden");

	if (!charging) {
		disableChargePoint();
	}

	// clear PIN
	for (let i = 0; i < 4; i++) clearPin();
	$("#wrong_pin_msg").addClass("hidden");
}

function unlock() {
	// check PIN sequence
	let pin = "";
	pin += document.getElementById("pin_1").value;
	pin += document.getElementById("pin_2").value;
	pin += document.getElementById("pin_3").value;
	pin += document.getElementById("pin_4").value;
	
	if (pin === document.getElementById("displaypincode").value) {
		// Don't do anything
	} else {
		$("#wrong_pin_msg").removeClass("hidden");
		setTimeout(() => {
			for (let i = 0; i < 4; i++) clearPin();
		}, 300);
		return;
	}

	console.log("Unlocking interface...");
	displaylocked = false;
	showLoadingUI();

	var charging_ = checkIfCharging();
	if (charging_) {
		showChargingUI();
	} else {
		disableChargePoint();
		showNotChargingUI();
	}
}

function showLoadingUI() {
	loading = true;
	$("#loading_body").removeClass("hidden");
	$("#locked_body").addClass("hidden");
	$("#charging_body").addClass("hidden");
	$("#not_charging_body").addClass("hidden");
	$("#the_footer").addClass("hidden");
}

function showChargingUI() {
	loading = false;
	$("#charging_body").removeClass("hidden");
	$("#locked_body").addClass("hidden");
	$("#not_charging_body").addClass("hidden");
	$("#loading_body").addClass("hidden");
	$("#the_footer").addClass("hidden");

}

function showNotChargingUI() {
	loading = false;
	$("#not_charging_body").removeClass("hidden");
	$("#the_footer").removeClass("hidden");
	$("#locked_body").addClass("hidden");
	$("#charging_body").addClass("hidden");
	$("#loading_body").addClass("hidden");
}

/* ENABLE / DISABLE CHARGING */
function enableChargePoint() {
	var lp = 1; // charging point 1 by default
	try {
		publish("1", "openWB/set/lp/" + lp + "/ChargePointEnabled");
	} catch (error) {
		console.log("Could not publish msg, err: " + error);
	}
}

function disableChargePoint() {
	var lp = 1; // charging point 1 by default
	try {
		publish("0", "openWB/set/lp/" + lp + "/ChargePointEnabled");
	} catch (error) {
		console.log("Could not publish msg, err: " + error);
	}
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
	$("#lock_container").addClass("hidden");
	$("#pin_container").removeClass("hidden");

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
	return charging;
}

function checkIfPluggedIn() {
	return plugged_in;
}

/* START / STOP CHARGING */
function startCharging() {
	console.log("Start charging...");
	enableChargePoint();

	if (!displaylocked) {
		showLoadingUI();
	}
}

function stopCharging() {
	console.log("Stop charging...");
	disableChargePoint();

	if (!displaylocked) {
		showLoadingUI();
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

/* SET PLUGGED IN OR NOT */
function setPluggedIn(p) {
	plugged_in = p;
	if (plugged_in) {
		$("#start_charging_button").attr("disabled", false);
		$("#start_charging_button").addClass("glowing");
		$("#start_charging_button").removeClass("grayed_out");
	} else {
		$("#start_charging_button").attr("disabled", true);
		$("#start_charging_button").removeClass("glowing");
		$("#start_charging_button").addClass("grayed_out");
	}
}

/* SET CHARGING OR NOT */
function setCharging(c) {
	charging = c;
	if (charging && !displaylocked) {
		showChargingUI();
	} else if (!charging && !displaylocked) {
		showNotChargingUI();
	}
}
