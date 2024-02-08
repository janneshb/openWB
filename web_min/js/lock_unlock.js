/* PARAMETERS */
let lock_timeout = 30;

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

/* LOCK THE INTERFACE */
function lock() {
	const loc = window.location.href.split("?")[0];
	window.location.replace(loc);
}

/* UNLOCK THE INTERFACE */
function unlock() {
	let pin = "";
	pin += document.getElementById("pin_1").value;
	pin += document.getElementById("pin_2").value;
	pin += document.getElementById("pin_3").value;
	pin += document.getElementById("pin_4").value;
	
	if (pin === document.getElementById("displaypincode").value) {
		const loc = window.location.href.split("?")[0] + '?logged_in=true';
		window.location.replace(loc);

	} else {
		document.getElementById("wrong_pin_msg").style.visibility = "visible";
		setTimeout(() => {
			for (let i = 0; i < 4; i++) clearPin();
		}, 300);
	}
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
	if (focusedInput.value.length == 0) {
		updatePinFocus();
	}
	focusedInput.value = "";
	focusedInput.focus();
}

/* INACTIVITY TIMER */
let inactivityTimer;

function resetInactivityTimer() {
    clearTimeout(inactivityTimer); // Clear the previous timer
    inactivityTimer = setTimeout(function() {
        // Code to execute after 30 seconds of inactivity
        console.log("User has been inactive for 30 seconds");
		lock();

    }, lock_timeout * 1000); // lock_timeout seconds in milliseconds
}

function setupInactivityDetection() {
    // Reset the inactivity timer on user activity
    document.addEventListener("keypress", resetInactivityTimer);
    document.addEventListener("touchstart", resetInactivityTimer);
    document.addEventListener("click", resetInactivityTimer);
    document.addEventListener("mousemove", resetInactivityTimer);
    
    // Start the inactivity timer immediately
    resetInactivityTimer();
}
