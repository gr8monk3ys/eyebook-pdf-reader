window.saveDataAcrossSessions = true;

// Constants for determining when to scroll up or down
const TOP_CUTOFF = window.innerWidth / 3;
const BOTTOM_CUTOFF = window.innerWidth / 3;

// Constant for determining how long they need to look in order to scroll
const LOOK_DELAY = 1350;
let lookDirection = null;
let startLookTimer = Number.POSITIVE_INFINITY;

// Function for logging the x and y coordinates of our eyes
webgazer
	.setGazeListener((data, timestamp) => {
		if (data == null) return;

		if (data.y > TOP_CUTOFF && lookDirection !== "TOP") {
			startLookTimer = timestamp;
			lookDirection = "TOP";
		} else if (data.y < BOTTOM_CUTOFF && lookDirection !== "BOTTOM") {
			startLookTimer = timestamp;
			lookDirection = "BOTTOM";
		} else if (data.y >= BOTTOM_CUTOFF && data.y <= TOP_CUTOFF) {
			startLookTimer = Number.POSITIVE_INFINITY;
			lookDirection = null;
		}

		// Looking to see if direcion is found
		if (startLookTimer + LOOK_DELAY < timestamp) {
			if (lookDirection === "TOP") {
				window.scrollBy({ top: 300, behavior: "smooth" });
				startLookTimer = Number.POSITIVE_INFINITY;
				lookDirection = null;
			} else if (lookDirection === "BOTTOM") {
				window.scrollBy({ top: -300, behavior: "smooth" });
				startLookTimer = Number.POSITIVE_INFINITY;
				lookDirection = null;
			}
		}
	})
	.begin();
