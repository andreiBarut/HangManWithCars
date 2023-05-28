const words = [
	"Toyota",
	"Honda",
	"Chevrolet",
	"Ford",
	"Mercedes",
	"Jeep",
	"BMW",
	"Porsche",
	"Subaru",
	"Nissan",
	"Cadillac",
	"Volkswagen",
	"Lexus",
	"Audi",
	"Hyundai",
	"Ferrari",
	"Volvo",
	"Jaguar",
	"Bentley",
	"Dodge",
	"Mazda",
	"LandRover",
	"Tesla",
	"Kia",
	"Chrysler",
	"Mitsubishi",
	"Maserati",
	"AstonMartin",
	"Bugatti",
	"Fiat",
	"Suzuki",
];

console.log(words.length);

const imgSources = [
	"img/CAR1.png",
	"img/CAR2.png",
	"img/CAR3.png",
	"img/CAR4.png",
	"img/CAR5.png",
];

let word = words[Math.floor(Math.random() * words.length)].toLowerCase();
console.log(word);
let tries = word.length - 2;
let nrOfWins = 0;
let mistakeCount = 0;
let wrongLetter = "";
let word2Compare = "";
let unknownWord = "";
returnUnknownWord();

let healthBarVisible = document.getElementById("healthbar");
healthBarVisible.innerText = getHealthbar(tries);

let hangManText = document.getElementById("hangman-text");
hangManText.innerText = displayIncompleteWord(word);

let warningText = document.getElementById("warning");
let checkLetterButton = document.getElementById("check-letter");
let resetButton = document.getElementById("reset-button");
toggleVisibility(checkLetterButton);
let currentImg = document.getElementById("hangman-carState");
let highScoreVisible = document.getElementById("highscore-text");
let usersContainer = document.getElementById("users-container");

displayUserHighScores(getHighScores());

function hangMan() {
	let input = document.getElementById("input-letter").value.toLowerCase();
	document.getElementById("input-letter").value = "";
	document.getElementById("input-letter").focus();
	if (word.includes(input) && !word2Compare.includes(input)) {
		word2Compare = correctInput(input, word2Compare);
		console.log(word2Compare);
		revealIndexes(input, word);
		if (word2Compare.length == word.length && tries != 0) {
			highScore();
			win();
			console.log(word2Compare.length);
			console.log(word.length);
		}
	} else if (word2Compare.includes(input)) {
		warningText.innerText = `⚠️ Already used the letter ${input}`;
	}
	if (input == "") {
		warningText.innerText = `⚠️ You have to put in a letter!`;
	} else if (!word.includes(input)) {
		wrongInput(input);
		if (tries == 0) {
			lose();
		}
	}
}

function resetGame() {
	let input = document.getElementById("input-letter");
	console.log(checkLetterButton.innerText);
	word = words[Math.floor(Math.random() * words.length)].toLowerCase();
	console.log(word);
	tries = word.length - 2;
	mistakeCount = 0;
	healthBarVisible.innerText = getHealthbar(tries);
	hangManText.innerText = displayIncompleteWord(word);
	console.log(hangManText.innerText);
	warningText.innerText = "Started a new game.";
	unknownWord = "";
	returnUnknownWord();
	wrongLetter = "";
	word2Compare = "";
	currentImg.setAttribute("src", "img/CAR INIT.png");
	input.value = "";
}

function returnUnknownWord() {
	for (let j = 0; j < word.length; j++) {
		unknownWord += "_";
	}
	unknownWord = unknownWord.split("");
}

function findLetterFreq(str, find) {
	return str.split(find).length - 1;
	//? dodge.split("d") ; ['', 'o', 'ge'].length - 1 (3 - 1);
}

function getHealthbar(tries) {
	let healthBar = "";
	for (let i = 0; i < tries; i++) {
		healthBar += "⚙️";
	}
	return healthBar;
}

function displayIncompleteWord(word) {
	let incompleteWord = "";
	for (let i = 0; i < word.length; i++) {
		incompleteWord += " _ ";
	}
	return incompleteWord;
}

function correctInput(input, word2Compare) {
	let letterFreqOfInput = findLetterFreq(word, input);
	for (let i = 0; i < letterFreqOfInput; i++) {
		word2Compare += input;
	}
	console.log(word2Compare);
	return word2Compare;
}

function wrongInput(input) {
	if (wrongLetter.includes(input)) {
		warningText.innerText = `⚠️ Already used the letter ${input} and it was wrong 🚫`;
		return;
	}
	wrongLetter += input;
	tries--;
	healthBarVisible.innerText = getHealthbar(tries);
	warningText.innerText = `Wrong letter. You have ${tries} tries left.`;
	if (mistakeCount < imgSources.length) {
		currentImg.setAttribute(`src`, `${imgSources[mistakeCount]}`);
		mistakeCount++;
	}
}

function win() {
	currentImg.setAttribute("src", "img/CAR WIN.png");
	warningText.innerText = `🎆🎇🥳🙌 Congratulations! You've won! Your word was '${word}'`;
	highScoreVisible.innerText = `Your highscore is ${nrOfWins}.`;
	getHighScores();
	if (localStorage.getItem(getUserName()) < nrOfWins) {
		localStorage.setItem(getUserName(), nrOfWins);
		document.getElementById("users-container").innerText = "";
		displayUserHighScores(getHighScores());
	}
}

function lose() {
	currentImg.setAttribute("src", "img/CAR LOSE.png");
	warningText.innerText = `Game over ☠️. The word was '${word}'. Try again!`;
	if (localStorage.getItem(getUserName()) < nrOfWins) {
		localStorage.setItem(getUserName(), nrOfWins);
	}
	highScoreVisible.innerText = `Your highscore was ${nrOfWins}. Reseting to 0.`;
	nrOfWins = 0;
	document.getElementById("users-container").innerText = "";
	displayUserHighScores(getHighScores());
}

function revealIndexes(input, word) {
	//mitsubishi
	let indexes = [];
	for (let index = 0; index < word.length; index++) {
		if (word[index] === input) {
			indexes.push(index);
		}
	}
	// console.log(indexes);
	for (let k of indexes) {
		console.log(unknownWord);
		unknownWord[k] = input;
		//_ i _ _ _ _ i _ _ i
	}
	// console.log(unknownWord);
	let incompleteWord = unknownWord.toString().replaceAll(",", " ");
	hangManText.innerText = incompleteWord;
}

function toggleVisibility(element) {
	if (element.style.visibility == "hidden") {
		element.style.visibility = "visible";
	} else {
		element.style.visibility = "hidden";
	}
}

function highScore() {
	nrOfWins++;
	highScoreVisible.innerText = `Your highscore is ${nrOfWins}`;
}

function getUserName() {
	let playerName = document.getElementById("user-input").value;
	toggleVisibility(checkLetterButton);
	toggleVisibility(resetButton);
	console.log(playerName);
	let userName = document.getElementById("user-input");
	let nameText = document.getElementById("name-text");
	let userNameButton = document.getElementById("store-username");
	toggleVisibility(userName);
	toggleVisibility(userNameButton);
	if (document.getElementById("user-input").value.length == 0) {
		nameText.innerText = `You cannot leave the field empty! Please insert a player name`;
		toggleVisibility(userName);
		toggleVisibility(userNameButton);
	} else {
		nameText.innerText = `Current player : ${userName.value}`;
		toggleVisibility(resetButton);
	}
	return playerName;
}

function getHighScores() {
	let highScoreMap = new Map();
	for (const [name, value] of Object.entries(localStorage)) {
		highScoreMap.set(name, value);
	}
	return highScoreMap;
}

function displayUserHighScores(getHighScores) {
	getHighScores.forEach((value, name) => {
		let userDiv = document.createElement("div");
		userDiv.innerText = `${name} --- ${value}`;
		//! replace key with name and see how it should appear. I did, why is forEach so weird?
		usersContainer.appendChild(userDiv);
	});
}

//! some anomaly with winning and losing, for instance, when losing and winning, sometimes the buttons disappear! DONE
//! username and password implementation
//! unknownword methods can be put into a function
//! show images with each car and some info about it so that people can learn something while playing
//! introduce much more car brands.
//! change layout a little bit
//! put leaderboard as a card left or right, get rid of scroll
//! remove outer border
//! make comments in html, js and style
//! turn css into scss
