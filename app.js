const scoreMap = new Map();
const imageMap = new Map();
const optionsMap = new Map([
    []
]);

// Current animes
let leftAnime;
let rightAnime;

// Next anime to be displayed
let nextAnime;

// The player
let player;

// Anime class that stores relevant info about an anime
class Anime {
    constructor(title, score, image) {
        this.title = title;
        this.score = score;
        this.image = image;
    }
    getScore() {
        return this.score;
    }
    getImage() {
        return this.image;
    }
    getTitle() {
        return this.title;
    }
    setTitle(title) {
        this.title = title;
    }
    setScore(score) {
        this.score = score;
    }
    setImage(image) {
        this.image = image;
    }
}

// Player class that stores relevant info about the player
class Player {
    constructor(score, highScore) {
        this.score = score;
        this.highScore = highScore;
    }
    getScore() {
        return this.score;
    }
    getHighScore() {
        return this.highScore;
    }
    addScore() {
        this.score++;
        if (this.score > this.highScore) {
            this.highScore = this.score;
        }
    }
    resetScore() {
        this.score = 0;
    }
}

function loadMap() {
    // Sets the scoreMap for random animes. Mainly used for debugging

    scoreMap.set("Attack on titan", "8.48");
    scoreMap.set("One piece", "9.08");
    scoreMap.set("Death note", "9.18");
    scoreMap.set("Hunter x Hunter", "8.86");
    scoreMap.set("Steins;Gate", "9.08");
    scoreMap.set("Monster", "7.98");
    scoreMap.set("Parasyte", "8.25");

    // Sets the imageMap for random animes. Mainly used for debugging
    imageMap.set("Attack on titan", ".images/attack-on-titan.jpg");
    imageMap.set("One piece", ".images/one-piece.jpg");
    imageMap.set("Death note", ".images/death-note.png");
    imageMap.set("Hunter x Hunter", ".images/hunter-x-hunter.png");
    imageMap.set("Steins;Gate", ".images/steins-gate.png");
    imageMap.set("Monster", ".images/monster.png");
    imageMap.set("Parasyte", ".images/parasyte.png");
}

/**
 * Gets called when the user clicks the "Higher" button in the main game
 * This function will compare the two animes and call subfunctions accordingly
 */
function onHigherClick() {
    // Check result - if they are equal, then the user wins
    if (leftAnime.getScore() <= rightAnime.getScore()) {
        guessedCorrectly();
    } else {
        guessedIncorrectly();
    }
}

/**
 * Similar to onHigherClick, but for left button in main game
 */
function onLowerClick() {
    // Check result - if they are equal, then the user wins
    if (leftAnime.getScore() >= rightAnime.getScore()) {
        // If we get in here, the user answered correctly
        guessedCorrectly();
    } else {
        guessedIncorrectly();
    }
}

/**
 * Function for when a user guesses correctly.
 * This function will do this in systematic order:
 *  - show a checkmark in the middle
 *  - hide all text and elements, leaving only the background images
 *  - play an animation that swaps the images
 *  - shows the text and elements again, for the user to make another guess
 */
function guessedCorrectly() {
    document.getElementById("rightScore").innerHTML = rightAnime.getScore();
    document.getElementById("rightScore").classList.add("fadeIn");
    // Remove the "fadeIn" class after 1 second
    setTimeout(() => {
        document.getElementById("rightScore").style.opacity = 1;
        document.getElementById("rightScore").classList.remove("fadeIn");
    }, 1000);

    // Shows that the user has guessed correctly
    // This animation takes 1 second
    removeInputButtons();
    changeRightAnimeDescription();
    changeMiddleToCheckmark();

    // Make sure next anime has correct image
    document.getElementById("nextImage").src = nextAnime.getImage();

    // Make buttons not clickable
    document.querySelector(".guessHigher").disabled = true;
    document.querySelector(".guessLower").disabled = true;

    // After the previous animation + some extra time, hide all the text and add a point to the players score
    // This animation takes 1 second
    setTimeout(() => {
        hideUI();
        player.addScore();
        updateScoreBar();
    }, 1500)

    // Directly after the previous animation, move the images, revealing the new anime
    // This animation takes 2 seconds
    setTimeout(moveImages, 2500);

    // Directly after the previous animation
    // Update all data such that previous right anime -> new left anime, previous next anime -> new right anime etc
    // This animation takes 1 second
    setTimeout(() => {
        updateAnimeFields();
        changeMiddleToVS();
        showInputButtons();
        updateUIElements();
        showUI();
    }, 4500)

    // Make buttons clickable after animations finish
    setTimeout(() => {
        document.querySelector(".guessHigher").disabled = false;
        document.querySelector(".guessLower").disabled = false;
    }, 5500)
}

/**
 * Function for when the user guesses incorrectly
 * This function will show a game over screen and give the player a chance to try again
 */
function guessedIncorrectly() {
    document.getElementById("rightScore").innerHTML = rightAnime.getScore();
    document.getElementById("rightScore").classList.add("fadeIn");
    // Remove the "fadeIn" class after 1 second
    setTimeout(() => {
        document.getElementById("rightScore").style.opacity = 1;
        document.getElementById("rightScore").classList.remove("fadeIn");
    }, 1000);

    // Shows that the user has guessed incorrectly
    // This animation takes 1 second
    removeInputButtons();
    changeRightAnimeDescription();
    changeMiddleToX();

    // Make the buttons unclickable
    document.querySelector(".guessHigher").disabled = true;
    document.querySelector(".guessLower").disabled = true;


    // After previous animation + some extra time, hide the main game and show game over screen
    setTimeout(() => {
        hideMainGame();
        showGameOverScreen();
    }, 1500);
}

/**
 * This function will change the opacity of the "Higher" and "Lower" buttons to 0
 */
function removeInputButtons() {
    let higherButton = document.getElementsByClassName("guessHigher");
    let lowerButton = document.getElementsByClassName("guessLower");
    for (let i = 0; i < higherButton.length; i++) {
        higherButton[i].classList.add("fadeOut");
        // Remove the "fadeOut" class after 1 second
        setTimeout(() => {
            higherButton[i].style.opacity = 0;
            higherButton[i].classList.remove("fadeOut");
        }, 1000);
    } 
    for (let i = 0; i < lowerButton.length; i++) {
        lowerButton[i].classList.add("fadeOut");
        // Remove the "fadeOut" class after 1 second
        setTimeout(() => {
            lowerButton[i].style.opacity = 0;
            lowerButton[i].classList.remove("fadeOut");
        }, 1000);
    }
}

/**
 * This function will change the opacity of the "Higher" and "Lower" buttons to 1
 */
function showInputButtons() {
    let higherButton = document.getElementsByClassName("guessHigher");
    let lowerButton = document.getElementsByClassName("guessLower");
    for (let i = 0; i < higherButton.length; i++) {
        higherButton[i].classList.add("fadeIn");
        // Remove the "fadeIn" class after 1 second
        setTimeout(() => {
            higherButton[i].style.opacity = 1;
            higherButton[i].classList.remove("fadeIn");
        }, 1000);
    } 
    for (let i = 0; i < lowerButton.length; i++) {
        lowerButton[i].classList.add("fadeIn");
        // Remove the "fadeIn" class after 1 second
        setTimeout(() => {
            lowerButton[i].style.opacity = 1;
            lowerButton[i].classList.remove("fadeIn");
        }, 1000);
    }
}

/**
 * This function will change the description part of the right anime to better suit the revealed result
 */
function changeRightAnimeDescription() {
    // Changes the text from "has a score thats" to "has a score of"
    let rightDescription1 = document.getElementById("rightDescription1");
    rightDescription1.innerHTML = "has a score of";

    // Remove the "than..." from the page
    let rightDescription2 = document.getElementById("rightDescription2");
    rightDescription2.classList.add("fadeOut");
    // Remove after 1 second
    setTimeout(() => {
        rightDescription2.style.opacity = 0;
        rightDescription2.classList.remove("fadeOut");
    }, 1000);
}

/**
 * This function will change the middle element to a checkmark with an animation
 */
function changeMiddleToCheckmark() {
    // Changes the "VS" text in the middle to a checkmark
    let result = document.getElementById("result");
    result.src = "images/data/checkmark.png"
    result.classList.add("expand")

    // Shrink the "VS" text
    let versus = document.getElementById("versus");
    versus.classList.add("shrink");
}

/**
 * This function will change the middle element to an X with an animation
 */
function changeMiddleToX() {
    // Changes the "VS" text in the middle to an X
    let result = document.getElementById("result");
    result.src = "images/data/wrong.png"
    result.classList.add("expand")

    // Shrink the "VS" text
    let versus = document.getElementById("versus");
    versus.classList.add("shrink");
}

/**
 * This function will change the middle element to "VS" with an animation
 */
function changeMiddleToVS() {
    let checkmark = document.getElementById("result");
    checkmark.classList.remove("expand");
    checkmark.classList.add("moveReset");

    let versus = document.getElementById("versus");
    versus.classList.remove("shrink");
    versus.classList.add("expand");
}

/**
 * This function will get and set the nextAnime field to a random new anime
 */
function getNextAnime() {
    // Fetch random top anime and use as next
    let randomNum = getRandomPage();
    fetch("https://api.jikan.moe/v4/top/anime?type=tv&page=" + randomNum + "&limit=1").then(response => {
        if (response.ok) {
            return response.json();
        }
    }).then(data => {
        let title = data.data[0].title_english;
        // Check if english title is null, then use standard title
        if (title == null) {
            title = data.data[0].title;
        }
        let score = parseFloat(data.data[0].score);
        let image_url = data.data[0].images.jpg.large_image_url;
        nextAnime = new Anime(title, score, image_url);
    })
}

/**
 * This function will hide the text thats describing the animes
 */
function hideUI() {
    // Hides the text and buttons, showing only the images
    let UIElements = document.getElementsByClassName("animeInformation");
    for (let i = 0; i < UIElements.length; i++) {
        if (UIElements[i].id != "rightDescription2") {
            UIElements[i].classList.add("fadeOut");
            // Remove the "fadeOut" class after 1 second
            setTimeout(() => {
                UIElements[i].style.opacity = 0;
                UIElements[i].classList.remove("fadeOut");
            }, 1000);
        }
    }
}

/**
 * This function will show the text thats describing the animes
 */
function showUI() {
    // Shows the text and buttons
    let UIElements = document.getElementsByClassName("animeInformation");
    for (let i = 0; i < UIElements.length; i++) {
        if (UIElements[i].id != "rightScore") {
            UIElements[i].classList.add("fadeIn");
            // Remove the "fadeIn" class after 1 second
            setTimeout(() => {
                UIElements[i].style.opacity = 1;
                UIElements[i].classList.remove("fadeIn");
            }, 1000);
        }    
    }

}

/**
 * This function will move the background images, shifting in the new anime
 */
function moveImages() {
    document.querySelector('.leftAnime').classList.add('move');
    document.querySelector('.rightAnime').classList.add('move');
    document.querySelector('.nextAnime').classList.add('move');

    // Remove the "move" class after the animation is done
    setTimeout(() => {
        document.querySelector('.leftAnime').classList.remove('move');
        document.querySelector('.rightAnime').classList.remove('move');
        document.querySelector('.nextAnime').classList.remove('move');
    }, 2000);
}

/**
 * This function will update the fields such that 
 * rightAnime -> leftAnime and nextAnime -> rightAnime
 */
function updateAnimeFields() {
    leftAnime = rightAnime;
    rightAnime = nextAnime;
    
    // Get next anime
    getNextAnime(rightAnime.getTitle(), leftAnime.getTitle());
}

/**
 * This function will update all the UI elements, such as the titles, scores, points etc
 */
function updateUIElements() {
    // Set the title, image and score to left anime
    document.getElementById("leftTitle").innerHTML = leftAnime.getTitle();
    document.getElementById("leftScore").innerHTML = leftAnime.getScore();
    document.getElementById("leftImage").src = leftAnime.getImage();

    // Set title and image, but not score, to right anime
    document.getElementById("rightTitle").innerHTML = rightAnime.getTitle();
    document.getElementById("rightScore").innerHTML = "???";
    document.getElementById("rightImage").src = rightAnime.getImage();
    document.getElementById("rightDescription1").innerHTML = "has a score thats";
    document.getElementById("rightDescription2").innerHTML = "than " + leftAnime.getTitle();

    // Set image to next anime
    document.getElementById("nextImage").src = nextAnime.getImage();

    // Update the scoreBar
    updateScoreBar();
}

/**
 * This function will update the score bar in the bottom right of the screen
 */
function updateScoreBar() {
    // Updates the score bar to what is being stored in the player global variable
    let score = document.getElementById("score");
    let highScore = document.getElementById("highScore");
    score.innerHTML = "Score: " + player.getScore();
    highScore.innerHTML = "Highscore: " + player.getHighScore();
}

/**
 * This function will play an animation that shows the main game
 */
function showMainGame() {
    // Get elements with class "leftAnime" and "rightAnime"
    let leftAnimeElements = document.getElementsByClassName("leftAnime");
    let rightAnimeElements = document.getElementsByClassName("rightAnime");
    let middleElements = document.getElementsByClassName("middle");
    let scoreBarElements = document.getElementsByClassName("scoreBar");
    
    // Fade in leftAnime, rightAnime, and middle elements
    for (let i = 0; i < leftAnimeElements.length; i++) {
        leftAnimeElements[i].classList.add("fadeIn");
        // Remove the fadeIn element after 1 second
        setTimeout(() => {
            leftAnimeElements[i].style.opacity = 1;
            leftAnimeElements[i].classList.remove("fadeIn");
        }, 1000);
    }
    for (let i = 0; i < rightAnimeElements.length; i++) {
        rightAnimeElements[i].classList.add("fadeIn");
        // Remove the fadeIn element after 1 second
        setTimeout(() => {
            rightAnimeElements[i].style.opacity = 1;
            rightAnimeElements[i].classList.remove("fadeIn");
        }, 1000);
    }
    for (let i = 0; i < middleElements.length; i++) {
        middleElements[i].classList.add("fadeIn");
        // Remove the fadeIn element after 1 second
        setTimeout(() => {
            middleElements[i].style.opacity = 1;
            middleElements[i].classList.remove("fadeIn");
        }, 1000);
    }
    for (let i = 0; i <scoreBarElements.length; i++) {
        scoreBarElements[i].classList.add("fadeIn")
        // Remove the fadeIn element after 1 second
        setTimeout(() => {
            scoreBarElements[i].style.opacity = 1;
            scoreBarElements[i].classList.remove("fadeIn");
        }, 1000);
    }

    showInputButtons();

}

/**
 * This function will play an animation that hide the main game
 */
function hideMainGame() {
    // Get elements with class "leftAnime" and "rightAnime"
    let leftAnimeElements = document.getElementsByClassName("leftAnime");
    let rightAnimeElements = document.getElementsByClassName("rightAnime");
    let middleElements = document.getElementsByClassName("middle");
    let scoreBarElements = document.getElementsByClassName("scoreBar");
    
    // Fade in leftAnime, rightAnime, and middle elements
    for (let i = 0; i < leftAnimeElements.length; i++) {
        leftAnimeElements[i].classList.add("fadeOut");
        // Remove the fadeOut element after 1 second
        setTimeout(() => {
            leftAnimeElements[i].style.opacity = 0;
            leftAnimeElements[i].classList.remove("fadeOut");
        }, 1000);
    }
    for (let i = 0; i < rightAnimeElements.length; i++) {
        rightAnimeElements[i].classList.add("fadeOut");
        // Remove the fadeOut element after 1 second
        setTimeout(() => {
            rightAnimeElements[i].style.opacity = 0;
            rightAnimeElements[i].classList.remove("fadeOut");
        }, 1000);
    }
    for (let i = 0; i < middleElements.length; i++) {
        middleElements[i].classList.add("fadeOut");
        // Remove the fadeOut element after 1 second
        setTimeout(() => {
            middleElements[i].style.opacity = 0;
            middleElements[i].classList.remove("fadeOut");
        }, 1000);
    }
    for (let i = 0; i <scoreBarElements.length; i++) {
        scoreBarElements[i].classList.add("fadeOut")
        // Remove the fadeOut element after 1 second
        setTimeout(() => {
            scoreBarElements[i].style.opacity = 0;
            scoreBarElements[i].classList.remove("fadeOut");
        }, 1000);
    }
}

/**
 * This function will play an animation that shows a game over screen
 */
function showGameOverScreen() {
    // Change the data of the main screen to show the game over
    document.getElementById("mainImage").src = "images/data/gameOverImage.jpg";
    document.getElementById("mainText").innerHTML = "Game over";
    document.getElementById("mainDescription").innerHTML = "Your score: " + player.getScore() + "\nHighscore: " + player.getHighScore();

    var button = document.getElementById("mainButton");        
    var span = button.getElementsByTagName("span")[0];
    span.textContent = "Try again";

    let mainScreen = document.getElementsByClassName("mainScreen");
    for (let i = 0; i < mainScreen.length; i++) {
        mainScreen[i].classList.add("fadeIn");
        // Remove the fadeIn element after 1 second
        setTimeout(() => {
            mainScreen[i].style.opacity = 1;
            mainScreen[i].classList.remove("fadeIn");
            createNewGame();

            // Hide the X in the middle
            changeMiddleToVS();

            document.getElementById("rightDescription2").style.opacity = 1;
        }, 1000);
    }

    // Reset score
    player.resetScore();
}

/**
 * This function will be called when the player clicks the "Start" or "Try again" (if in game over screen) button
 */
function onStartClick() {
    updateUIElements();

    // Get the start screen element
    let mainScreen = document.getElementById("main");

    // Add the 'fadeOut' animation class to the start screen
    mainScreen.classList.add("fadeOut");
    // Remove the start screen after 1 second
    setTimeout(() => {
        mainScreen.style.opacity = 0;
        mainScreen.classList.remove("fadeOut");

        // Make the buttons clickable
        document.querySelector(".guessHigher").disabled = false;
        document.querySelector(".guessLower").disabled = false;
    }, 1000);

    showMainGame();

    // Set point paragraph for right anime opacity to 0
    document.getElementById("rightScore").style.opacity = 0;

    // Set opacity for VS paragraph
    let versus = document.getElementById("versus");
    versus.style.opacity = 1;
}

/**
 * This function will be called when the user clicks the "Options" button in the start or game over screens
 */
function onOptionsClick() {
    const optionItems = document.getElementById("optionsMenu")
    
    // Check the opacity of the menu, if it is 0, transition into 1, vice versa
    if (optionItems.style.opacity == 0) {
        optionItems.classList.add("fadeIn");
        // Remove the fadeIn element after 1 second
        setTimeout(() => {
            optionItems.style.opacity = 1;
            optionItems.classList.remove("fadeIn");
        }, 1000);
    } else if (optionItems.style.opacity == 1) {
        optionItems.classList.add("fadeOut");
        // Remove the fadeIn element after 1 second
        setTimeout(() => {
            optionItems.style.opacity = 0;
            optionItems.classList.remove("fadeOut");
        }, 1000);
    }
}

/**
 * This function will create new leftAnime, rightAnime and nextAnime fields, thus making a new game
 */
function createNewGame() {
    // Fetch random top anime and use as left
    let randomNum = getRandomPage();
    fetch("https://api.jikan.moe/v4/top/anime?type=tv&page=" + randomNum + "&limit=1").then(response => {
        if (response.ok) {
            return response.json();
        }
    }).then(data => {
        let title = data.data[0].title_english;
        // Check if english title is null, then use standard title
        if (title == null) {
            title = data.data[0].title;
        }
        let score = parseFloat(data.data[0].score);
        let image_url = data.data[0].images.jpg.large_image_url;
        leftAnime = new Anime(title, score, image_url);
    })
    
        // Fetch random top anime and use as right
    randomNum = getRandomPage();
    fetch("https://api.jikan.moe/v4/top/anime?type=tv&page=" + randomNum + "&limit=2").then(response => {
        if (response.ok) {
            return response.json();
        }
    }).then(data => {
        let title = data.data[0].title_english;
        // Check if english title is null, then use standard title
        if (title == null) {
            title = data.data[0].title;
        }
        let score = parseFloat(data.data[0].score);
        let image_url = data.data[0].images.jpg.large_image_url;
        rightAnime = new Anime(title, score, image_url)
    });

    // Load in the next anime
    getNextAnime();
}

/**
 * Helper function for API calls. Returns a random number 1-500
 * Which is used to get random animes
 */
function getRandomPage() {
    // Returns a number 1-500 which is then used as the page argument in the API call
    const minCeiled = Math.ceil(1);
    const maxFloored = Math.floor(501);
    return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled);
  }

/**
 * Gets a random key item
 * @param collection - Map or similar to get a random key from
 */
function getRandomKey(collection) {
    let keys = Array.from(collection.keys());
    return keys[Math.floor(Math.random() * keys.length)];
}

/**
 * Listener for the loading of the webpage. Is only triggered once when the user first starts the webpage
 */
document.addEventListener('DOMContentLoaded', (event) => {
    // Gets called when the page gets loaded
    loadMap();

    createNewGame();

    // Create player instance
    player = new Player(0, 0);
});