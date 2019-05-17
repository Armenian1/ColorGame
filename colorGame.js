var numColors = 6;
var colors = generateColors(numColors);

var squares = document.querySelectorAll(".square");
var pickedColor = pickColor();
var colorDisplay = document.getElementById("colorDisplay");
var messageDisplay = document.querySelector("#message");
var h1 = document.querySelector("h1");
var resetButton = document.getElementById("reset");
var easyBtn = document.getElementById("easyBtn");
var hardBtn = document.getElementById("hardBtn");

easyBtn.addEventListener("click", function() {
	easyBtn.classList.add("selected");	// Add selected class to easy button
	hardBtn.classList.remove("selected");
	numColors = 3;
	resetGame();
});

hardBtn.addEventListener("click", function() {
	easyBtn.classList.remove("selected");	// Add selected class to easy button
	hardBtn.classList.add("selected");
	numColors = 6;
	resetGame();
});

resetButton.addEventListener("click", resetGame);

colorDisplay.textContent = pickedColor;

for (var i=0; i<squares.length; i++) {
	// Add initial colors to squares
	squares[i].style.backgroundColor = colors[i];

	// Add click listeners to squares
	squares[i].addEventListener("click", function() {
		// Grab color of clicked square.
		var clickedColor = this.style.backgroundColor;

		// Compare color to pickedColor
		if(clickedColor === pickedColor) {
			messageDisplay.textContent="Correct!";
			resetButton.textContent="Play Again";
			changeColors(pickedColor);
			h1.style.backgroundColor = pickedColor;
		} else {
			this.style.backgroundColor = "#232323";
			messageDisplay.textContent="Try Again"
		}
	})
}

function resetGame() {
	// Reset all square colors to default color. Works cause colors not reassigned yet.
	for (var i=numColors; i<squares.length; i++) {	
		squares[i].style.backgroundColor = "#232323"
	}
	// Remove "Correct" display
	messageDisplay.textContent="";
	// Generate all new colors.
	colors = generateColors(numColors);
	// Pick a new random color from array.
	pickedColor = pickColor();
	// Change colorDisplay to match picked color
	colorDisplay.textContent = pickedColor;
	// Change Play Again to say new colors
	resetButton.textContent = "New Colors";
	// Change colors of squares.
	for (var i=0; i<squares.length; i++) {
		squares[i].style.backgroundColor = colors[i];
	}
	// Change h1 back to default color
	h1.style.backgroundColor = "steelblue";
}

function changeColors(color) {
	// Loop through all squares
	for(var i=0; i<squares.length; i++) {
		// Change each color to match given color.
		squares[i].style.backgroundColor = color;
	}
}

function pickColor() {		// Pick a random defined color
	var random = Math.floor(Math.random() * colors.length);
	return colors[random];
}

function pickRGBValues() {		// Pick 3 random rgb values
	randomRGB = [];
	var random;
	for (var i=0; i<3; i++) {
		random = Math.floor(Math.random() * 255 + 1);
		randomRGB.push(random);
	}
	return randomRGB;
}

function generateColors(numColors) {	// Generate numColors of colors
	var colors = [];
	var color;
	for (var i=0; i<numColors; i++) {
		color = pickRGBValues();
		colors.push("rgb(" + color[0] + ", " + color[1] + ", " + color[2] + ")");
	}
	return colors;
}