/* FADE OUT */
function fadeOut(el) {
	var opacity = 1; // Initial opacity
	var interval = setInterval(function() {
		if (opacity > 0) {
			opacity -= 0.1;
			el.style.opacity = opacity;
		} else {
			clearInterval(interval); // Stop the interval when opacity reaches 0
			el.classList.add("hidden"); // Hide the element
		}
	}, 50);
}

/* FADE IN */
function fadeIn(el) {
	el.style.opacity = 0;
	el.classList.remove("hidden");
	var opacity = 0; // Initial opacity
	var interval = setInterval(function() {
		if (opacity < 1) {
			opacity += 0.1;
			el.style.opacity = opacity;

		} else {
			clearInterval(interval); // Stop the interval when opacity reaches 0
			el.opacity = 1.0; // Hide the element

		}
	}, 50);
}
