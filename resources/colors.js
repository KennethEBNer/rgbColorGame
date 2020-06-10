let numSquares = 6;
let colors = [];
let pickedColor;

const squares = document.querySelectorAll(".square");
const colorDisplaySpan = document.getElementById("colorDisplay");
const messageDisplaySpan = document.querySelector("#message");
const h1 = document.querySelector("h1");
const resetButton = document.getElementById("reset");
const modeButtons = document.querySelectorAll(".mode");

init();

function init(){
    // Assign event listeners to both of the mode buttons
    setupModeButtons();

    // Assign event listeners to all squares
    setupSquares();

    // Generate new random colors, pick a new random pickedColor, 
    // change span to display pickedColor, assing the squares one color each
    // and update page to reflect changes. 
    reset();
};

function setupModeButtons(){
    // Assign event listeners to both of the mode buttons
    for (let i = 0; i < modeButtons.length; i++){
        modeButtons[i].addEventListener("click", function(){
            modeButtons[0].classList.remove("selected");
            modeButtons[1].classList.remove("selected");
            this.classList.add("selected");
            // Figure out how many squares to show
            this.textContent === "Easy" ? numSquares = 3: numSquares = 6;
            // Generate new random colors, pick a new random pickedColor, 
            // change span to display pickedColor, assing the squares one color each
            // and update page to reflect changes. 
            reset();
        })
    }
};

function setupSquares(){
    // Assign event listeners to all the squares
    for(let i = 0; i < squares.length; i++) {
        // Add click listeners to squares
        squares[i].addEventListener("click", function() {
            // Grab color of picked square
            let clickedColor = this.style.backgroundColor;
            // Compare color to pickedColor
            if(clickedColor === pickedColor) {
                // Make changes if picked is correct
                resetButton.textContent = "Play Again?";
                messageDisplaySpan.textContent = "Correct!";
                // Change all squares and the h1 to correct color
                changeColors(clickedColor);
                h1.style.backgroundColor = clickedColor;
            } else {
                // Make changes if picked is wrong
                this.style.backgroundColor = "#232323";
                messageDisplaySpan.textContent = "Try again";
            }
        });
    }
};

function reset(){
    // Generate random new colors
    colors = generateRandomColors(numSquares);
    // Pick a new random color from array
    pickedColor = pickColor();
    // Change span to display pickedColor
    colorDisplaySpan.textContent = pickedColor;
    // Assign the squares one color each
    for(let i = 0; i < squares.length; i++){
        if(colors[i]){
            squares[i].style.display = "block";
            squares[i].style.backgroundColor = colors[i];
        } else {
            squares[i].style.display = "none";   
        }
    }
    // Update page to reflect changes
    h1.style.backgroundColor = "steelblue";
    resetButton.textContent = "New Colors";
    messageDisplaySpan.textContent = "";
};

function generateRandomColors(num){
    // Make an array
    let arr = [];
    // Add num random colors to array
    for(let i = 0; i < num; i++){
        arr.push(randomColor());
    }
    // Return that array
    return arr;
};

function randomColor(){
    // Assign values between 0 and 255 to r, g and b
    let r = Math.floor(Math.random() * 256)
    let g = Math.floor(Math.random() * 256)
    let b = Math.floor(Math.random() * 256)
    // Return the rgb(r, g, b) string with random values for r, g and b
    return `rgb(${r}, ${g}, ${b})`;
};

function pickColor(){
    let random = Math.floor(Math.random() * colors.length);
    return colors[random];
};

function changeColors(colorStr){
    // Loop through all squares
    for(let i = 0; i < squares.length; i++) {
        // Change each color to match given color
        squares[i].style.backgroundColor = colorStr;
    };
};

resetButton.addEventListener("click", function(){
    reset();
});

