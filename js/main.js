// initiate canvas
let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");

this.width = canvas.width;

// create array with random words
function pickWord() {
  let words = [
    "программа",
    "макака",
    "прекрасный",
    "оладушек",
    "зверобой",
    "занавески",
  ];

  // pick random word from array
  return words[Math.floor(Math.random() * words.length)];
}

// create array of "_" based on
// random word picked
function setupAnswerArray(word) {
  let answerArray = [];
  for (let i = 0; i < word.length; i++) {
    answerArray[i] = "_";
  }

  return answerArray;
}

// display status of game
function showPlayerProgress(answerArray) {
  alert(answerArray.join(" "));
}

// letter request
function getGuess() {
  return prompt("Угадайте букву или нажмите 'Отмена' для выхода из игры.");
}

// update status of game
function updateGameState(guess, word, answerArray) {
  let appearances = 0;
  for (let j = 0; j < word.length; j++) {
    if (word[j] === guess.toLowerCase() && answerArray[j] == "_") {
      answerArray[j] = guess.toLowerCase();
      displayCorrectGuesses(guess, j);
      appearances++;
    }
  }

  return appearances;
}

// game over
function showAnswerAndCongratulatePlayer(answerArray) {
  showPlayerProgress(answerArray);

  if ((incorrectGuesses = 5)) {
    // win statement
    alert("Игра окончена. Было загадано слово " + word);
    return false;
  } else {
    // lose statement
    alert("Отлично. Было загадано слово " + word);
  }
}

// draw man based on wrong attempts in
// getGuess()
function drawManSegment(incorrectGuesses) {
  ctx.lineWidth = 4;

  if (incorrectGuesses === 0) {
    ctx.strokeRect(20, 20, 20, 20);
  } else if (incorrectGuesses === 1) {
    ctx.beginPath();
    ctx.moveTo(30, 40);
    ctx.lineTo(30, 80);
    ctx.stroke();
  } else if (incorrectGuesses === 2) {
    ctx.beginPath();
    ctx.moveTo(30, 80);
    ctx.lineTo(10, 110);
    ctx.stroke();
  } else if (incorrectGuesses === 3) {
    ctx.beginPath();
    ctx.moveTo(30, 80);
    ctx.lineTo(50, 110);
    ctx.stroke();
  } else if (incorrectGuesses === 4) {
    ctx.beginPath();
    ctx.moveTo(30, 60);
    ctx.lineTo(10, 50);
    ctx.stroke();
  } else if (incorrectGuesses === 5) {
    ctx.beginPath();
    ctx.moveTo(30, 60);
    ctx.lineTo(50, 50);
    ctx.stroke();
  }
}

// drawing underscores for guesses
function displayUnderscores(howMany) {
  ctx.lineWidth = 4;
  ctx.beginPath();

  for (let i = 0; i < howMany; i++) {
    ctx.moveTo(i * 30 + 10, 160);
    ctx.lineTo(i * 30 + 30, 160);
  }

  ctx.stroke();
}

// drawing correct guesses near man figure
function displayCorrectGuesses(guess, index) {
  ctx.font = "30px Courier";
  ctx.fillText(guess, index * 30 + 10, 150);
}

// drawing wrong guesses near man figure
function displayInCorrectGuesses(guess, index) {
  ctx.lineWidth = 2;
  ctx.font = "25px Courier";
  ctx.fillText(guess, this.width / 2, index * 20 + 40);
  ctx.moveTo(this.width / 2, index * 20 + 35);
  ctx.lineTo(this.width / 2 + 15, index * 20 + 35);
  ctx.stroke();
}

// setting up variables
let word = pickWord();
let answerArray = setupAnswerArray(word);
let remainingLetters = word.length;
let incorrectGuesses = 0;

displayUnderscores(word.length);

// game cycle
while (remainingLetters > 0 && incorrectGuesses <= 5) {
  // display status of game
  showPlayerProgress(answerArray);

  // letter request
  let guess = getGuess();

  if (guess === null) {
    // exit from game cycle
    break;
  } else if (guess.length !== 1) {
    alert("Пожалуйста, введите только одну букву.");
  } else {
    // update status of game
    let correctGuesses = updateGameState(guess, word, answerArray);

    remainingLetters -= correctGuesses;

    if (correctGuesses === 0) {
      drawManSegment(incorrectGuesses);
      displayInCorrectGuesses(guess, incorrectGuesses);
      incorrectGuesses++;
    }
  }
}

// game over
showAnswerAndCongratulatePlayer(answerArray);
