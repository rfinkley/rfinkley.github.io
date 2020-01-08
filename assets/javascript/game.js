/*jshint esversion: 6*/

// creating game object
let game = {
    words: [
        "destiny",
        "bungie",
        "earth",
        "mars",
        "titan",
        "io",
        "mercury",
        "tower",
        "nessus",
        "moon",
        "tangledshore",
        "dreamingcity",
    ],
    images: [
        "./assets/images/img02.png",
        "./assets/images/img03.png",
        "./assets/images/img04.png",
        "./assets/images/img05.png",
        "./assets/images/img06.png",
        "./assets/images/img07.png",
        "./assets/images/img08.png",
        "./assets/images/img09.png",
        "./assets/images/img10.png",
        "./assets/images/img11.png",
        "./assets/images/img12.png",
        "./assets/images/img13.png",
    ],
    sounds: [
        "./assets/sounds/01.mp3",
        "./assets/sounds/02.mp3",
        "./assets/sounds/03.mp3",
        "./assets/sounds/04.mp3",
        "./assets/sounds/05.mp3",
        "./assets/sounds/06.mp3",
        "./assets/sounds/07.mp3",
        "./assets/sounds/08.mp3",
        "./assets/sounds/09.mp3",
        "./assets/sounds/10.mp3",
        "./assets/sounds/11.mp3",
        "./assets/sounds/12.mp3",
    ],
    wins: 0,
    guesses: 12,
    lettersGuessed: [],
    currentWord: "",
    hiddenWord: "",
    arrCurrentWord: [],
    arrHiddenWord: [],
    audio: "",
};

let rnd;

// FUNCTIONS
// ==============================================================================

// resetGame: A function to reset the game variables and html placeholder elements (ex. p #wins)
function resetGame() {
    //reset game variables
    game.guesses = 12;
    game.wins = 0;
    game.lettersGuessed = [];
    rnd = Math.floor(Math.random() * game.words.length);
    game.currentWord = game.words[rnd];
    game.arrCurrentWord = [];
    game.arrHiddenWord = [];
    wordConvert(game.currentWord);
    //reset game text in the browser
    document.getElementById("title").innerHTML = "Press any key to get started!";
    document.getElementById("guesses").innerText = `Number of guesses remaining: ${game.guesses.toString()}`;
    document.getElementById("wins").innerText = `Number of wins: ${game.wins}`;
    document.getElementById("letters").innerHTML = game.lettersGuessed.toString();
    document.getElementById("currentWord").innerText = game.arrHiddenWord.join(" ");
    document.getElementById("imageHolder").style.visibility = "hidden";
    //logged inital variable values to the console
    console.log("currentWord: " + game.currentWord);
    console.log("wins: " + game.wins);
    console.log("guesses: " + game.guesses);
    console.log("arrCurrentWord: " + game.arrCurrentWord);
    console.log("arrHiddenWord: " + game.arrHiddenWord);
    console.log("################");
}

/* wordConvert: Takes a word (game.currentWord) and breaks each character into a value in arrCurrentWord. It then creates an underscore value in arrHiddenWord for each value in arrCurrentWord. */
function wordConvert(word) {
    // Takes a word and breaks each character into an array value
    game.arrCurrentWord = word.split("");
    // Counts each value in the array 
    for (var i = 0; i < game.arrCurrentWord.length; i++) {
        //creates an underscore for each letter of the arrCurrentWord array inside of the arrHiddenWord array
        game.arrHiddenWord[i] = "_";
    }
}

/* Takes two arrays and checks to see if userInput is found in arr1, if it is, it changes arr2 to include the letter found in arr1 */
function wordReplace(arr1, arr2, userInput) {
    if (arr1.includes(userInput)) {
        //Creates an array with the index values of each occurrence of userInput in arr1
        var indices = [];
        var idx = arr1.indexOf(userInput);
        while (idx != -1) {
            indices.push(idx);
            idx = arr1.indexOf(userInput, idx + 1);
        }
        //Adds the letters found in arr1 to the correct position in arr2
        for (let i = 0; i < indices.length; i++) {
            let pos = indices[i];
            arr2[pos] = userInput;
            document.getElementById("currentWord").innerText = game.arrHiddenWord.join(" ");
            game.hiddenWord = game.arrHiddenWord.join("");
        }
    } else { //if userInput is not found in arr1 decrement guesses remaining
        game.guesses--;
        game.lettersGuessed.push(userInput);
        document.getElementById("letters").innerHTML = game.lettersGuessed.toString();
        document.getElementById("guesses").innerText = `Number of guesses remaining: ${game.guesses.toString()}`;
    }

}

// arrayCompare: A function to compare the arrCurrentWord and arrHiddenWord arrays -- Didn't end up using this function
// function arrayCompare(arr1, arr2) {
//     for (var i = 0; i < arr1.length; i++) {
//         if (arr1[i] != arr2[i]) {
//             return "False";
//         } else {
//             return "True";
//         }
//     }
// }

//Checkes the status of guesses remaining and resets game if user loses. Resets specific variables if user wins.
function gameStatus() {
    if (game.guesses < 1) {
        alert("Game Over");
        resetGame();
    } else if (game.currentWord == game.hiddenWord) {
        game.wins++;
        game.guesses = 12;
        document.getElementById("gameSound").setAttribute("src", game.sounds[rnd]);
        document.getElementById("gameSound").play();
        game.lettersGuessed = [];
        document.getElementById("imageHolder").style.visibility = "visible";
        document.getElementById("imageHolder").setAttribute("src", game.images[rnd]);
        rnd = Math.floor(Math.random() * game.words.length);
        game.currentWord = game.words[rnd];
        game.arrCurrentWord = [];
        game.arrHiddenWord = [];
        wordConvert(game.currentWord);
        document.getElementById("guesses").innerText = `Number of guesses remaining: ${game.guesses.toString()}`;
        document.getElementById("wins").innerText = `Number of wins: ${game.wins}`;
        document.getElementById("letters").innerHTML = game.lettersGuessed.toString();
        document.getElementById("currentWord").innerText = game.arrHiddenWord.join(" ");
    }
}

// MAIN PROCESS
// ==============================================================================
// Captures keyboard input. Depending on the letter pressed it will "call" (execute) different functions.
document.onkeyup = function (event) {
    var letter = event.key;
    wordReplace(game.arrCurrentWord, game.arrHiddenWord, letter);
    gameStatus();
};