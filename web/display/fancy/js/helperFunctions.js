/**
 * Helper Functions for Fancy Interface
 */

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
