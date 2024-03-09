// Disable right-click context menu
document.addEventListener("contextmenu", (event) => {
  event.preventDefault();
});

// Function to initialize the game
var runGame = (() => {
  // Render start game button and theme selector
  document.querySelector("#p-btm").innerHTML = `
    <button class="btn" id="startGameButton">Start Game</button> 
    <select class="btn sele" id="themeSelect">
      <option value="" disabled selected hidden>Select a Theme</option>
      <option value="Themes/SunshineCitrus.css">Sunshine Citrus</option>
      <option value="Themes/Dusk-Purple.css">Dusk Purple</option>
      <option value="Themes/Material-Blue.css">Material Blue</option>
    </select>
  `;
})();

// Function to set the selected theme
function setTheme(themeName) {
  document.getElementById("theme").setAttribute("href", themeName);
  // Store the selected theme in localStorage
  localStorage.setItem("theme", themeName);
}

// Check if a theme is stored in localStorage
const storedTheme = localStorage.getItem("theme");
if (storedTheme) {
  setTheme(storedTheme);
}

// Event listener for theme selection change
document.getElementById("themeSelect").addEventListener("change", function () {
  const themeName = this.value;
  setTheme(themeName);
});

// Event listener for start game button click
document.querySelector("#startGameButton").addEventListener("click", function () {
  var timer = 60;
  var score = 0;
  var hitRanNum;

  // Function to increase the score
  function increaseScore() {
    score += 10;
    document.querySelector("#inrScore").textContent = score;
  }

  // Function to generate a new random number for hitting
  function newHitNum() {
    hitRanNum = Math.floor(Math.random() * 10);
    document.querySelector("#hitNumber").textContent = hitRanNum;
  }

  // Function to generate bubbles
  function makeBubble() {
    var clutter = "";
    for (var i = 1; i <= 72; i++) {
      var rn = Math.floor(Math.random() * 10);
      clutter += `<div class="bubble">${rn}</div>`;
    }
    document.querySelector("#p-btm").innerHTML = clutter;
  }

  // Function to run the timer
  function runTimer() {
    var timerInt = setInterval(function () {
      if (timer > 0) {
        timer--;
        document.querySelector("#timerCounter").textContent = timer;
      } else {
        clearInterval(timerInt);
        var restartGame = (document.querySelector("#p-btm").innerHTML = `
          <button class="btn" onclick="window.location.reload()">Play Again.</button>
        `);
        document.querySelector("#p-btm").innerHTML = `<h1>Game Over</h1>${restartGame}`;
      }
    }, 1000);
  }

  // Function to play the correct sound
function playCorrectSound() {
  var correctSound = document.getElementById("correctSound");
  correctSound.play();
}

  // Event listener for clicking bubbles
  document.querySelector("#p-btm").addEventListener("click", function (details) {
    var clickedNumber = Number(details.target.textContent);
    if (clickedNumber === hitRanNum) {
      increaseScore();
      makeBubble();
      newHitNum();
      playCorrectSound();
    }
  });

  // Initialize game components
  runTimer();
  makeBubble();
  newHitNum();
});
