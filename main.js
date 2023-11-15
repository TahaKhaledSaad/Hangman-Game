// Select Letters Container
let lettersContainer = document.querySelector(".letters");

const letters = "abcdefghijklmnopqrstuvwxyz";

// Separated Letters in Array
const lettersArray = Array.from(letters);

// Generate Letters
lettersArray.forEach((letter) => {
  // [1] Create Span
  let span = document.createElement("span");
  // [2] Create Text Node And Append It Inside Span
  span.append(document.createTextNode(letter));
  // [3] Add Class To Span
  span.className = "letter-box";
  // [4] Append Span Inside Letters Container
  lettersContainer.appendChild(span);
});

// Object Of Words + Categories
const words = {
  programming: ["php", "javascript", "go", "scala", "fortran", "Java", "mysql", "python"],
  Animals: ["Dog", "Cow", "Horse", "Cat", "Donkey", "Lion", "Tiger"],
  people: ["Taha Khaled", "Othman", "Saad", "Ahmed", "Omar", "Ali"],
  countries: ["Syria", "Palestine", "Yemen", "Egypt", "Bahrain", "Qatar"],
};
///*********************************************** */
// TODO Convert Above Object To JSON File And Link By Fetch ..

// data = fetch('./data.json').then(result => result.json());
// console.log(await data)
///*********************************************** */

// Get Random Property
let allKeys = Object.keys(words);

let randomPropNumber = Math.floor(Math.random() * allKeys.length);
let randomPropName = allKeys[randomPropNumber];
let randomPropValue = words[randomPropName];

let randomValueNumber = Math.floor(Math.random() * randomPropValue.length);
let randomValueValue = randomPropValue[randomValueNumber];
// For Testing To Understand The Example
// console.log(
//   "randomPropNumber: ",
//   randomPropNumber,
//   "\nrandomPropName: ",
//   randomPropName,
//   "\nrandomPropValue: ",
//   randomPropValue,
//   "\nrandomValueNumber: ",
//   randomValueNumber,
//   "\nrandomValueValue: ",
//   randomValueValue
// );

// Define Category => Random Prop Name
document.querySelector(".game-info .category span").innerHTML = randomPropName;

// Select Letters Guess Element
let lettersGuessContainer = document.querySelector(".letters-guess");

// Convert Chosen Word To Array
let lettersAndSpace = Array.from(randomValueValue);

// Create Spans Depend On Word
lettersAndSpace.forEach((letter) => {
  // [1] Create Empty Span
  let span = document.createElement("span");
  // [2] If Letter Is Space
  if (letter === " ") {
    // [2.1] Add Class To This Word
    span.className = "with-space";
  }
  // [3] Appen Span To Letters Guess Container
  lettersGuessContainer.appendChild(span);
});

// ===== This Part Very Important =====

let guessSpans = document.querySelectorAll(".letters-guess span");
let theDraw = document.querySelector(".hangman-draw");

// Set Worng Tries
let wrongTries = 0;

console.log(randomValueValue);
// Control And Handle Clicking On Letters
document.addEventListener("click", (e) => {
  // Set The Chose Status
  let theStatus = false;
  if (e.target.className == "letter-box") {
    // [1] Add Clicked Class
    e.target.classList.add("clicked");
    // [2] Get Clicked Letter
    let clickedLetter = e.target.innerHTML.toLowerCase();
    // [3] The Chosen Word
    let chosenWord = Array.from(randomValueValue.toLowerCase());
    // [4] Compare Clicked Letter With Choose Word Letters
    chosenWord.forEach((wordLetter, wordIndex) => {
      if (clickedLetter == wordLetter) {
        // [4.1] Correct Chose
        theStatus = true;
        // [4.2] Loop On Guess Spans
        guessSpans.forEach((span, spanIndex) => {
          if (wordIndex == spanIndex) {
            span.innerHTML = clickedLetter;
          }
        });
      }
    });
    // Outside Loop
    if (theStatus !== true) {
      // [1] Increase Wrong Tries
      wrongTries++;
      // [2] Add Class Wrong On The Draw -hangman-
      theDraw.classList.add(`wrong-${wrongTries}`);
      // [3] Play Fail Sound
      document.getElementById("fail").play();
      // [5] If Number Of Wrongs > 8
      if (wrongTries === 8) {
        // [1]
        endGame();
        // [2]
        lettersContainer.classList.add("finished");
      }
    } else {
      // [4] Play Fail Sound
      document.getElementById("success").play();
    }
    ///*********************************************** */
    let temp = 0;
    guessSpans.forEach((elem, index) => {
      if (elem.innerHTML !== "") temp++;
      if (temp === guessSpans.length) {
        // [1] Create Popup Div
        let div = document.createElement("div");
        // [2] Create Text And Append It
        let divText = document.createTextNode(`Congratulation, You Solved It Successfully.`);
        div.appendChild(divText);
        // [3] Add Class On Div
        div.className = "successPopup";
        // [5] Define Level Of The Player
        let level;
        if (wrongTries <= 3 && wrongTries >= 0) level = "Advanced";
        if (wrongTries <= 5 && wrongTries > 3) level = "Middle";
        if (wrongTries <= 7 && wrongTries > 5) level = "Weak";
        let levelDiv = document.createElement("div");
        levelDiv.appendChild(
          document.createTextNode(`Level: ${level}, Wrong Tries: ${wrongTries}`)
        );
        levelDiv.className = "level-div";
        div.appendChild(levelDiv);
        // [4] Append To Body
        document.body.appendChild(div);
        lettersContainer.classList.add("finished");
      }
    });

    ///*********************************************** */
  }
});

//End Game Function
function endGame() {
  // [1] Create Popup Div
  let div = document.createElement("div");
  // [2] Create Text And Append It
  let divText = document.createTextNode(
    `Game Over, The Word Is ${randomValueValue[0].toUpperCase() + randomValueValue.slice(1)}`
  );
  div.appendChild(divText);
  // [3] Add Class On Div
  div.className = "failPopup";
  // [4] Append To Body
  document.body.appendChild(div);
}

let palyAgain = document.createElement("button");
palyAgain.className = "play-again";
palyAgain.appendChild(document.createTextNode("Play Again"));
document.body.appendChild(palyAgain);
palyAgain.addEventListener("click", () => window.location.reload());


