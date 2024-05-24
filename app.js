const scoreMap = new Map();
const imageMap = new Map();

// Current animes
let leftAnime;
let rightAnime;

// Next anime to be displayed. Make API call while user is guessing to load in correctly
let nextAnime;

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

function loadMap() {
    scoreMap.set("Attack on titan", "8.48");
    scoreMap.set("One piece", "9.08");
    scoreMap.set("Death note", "9.18");
    scoreMap.set("Hunter x Hunter", "8.86");
    scoreMap.set("Steins;Gate", "9.08");
    scoreMap.set("Monster", "7.98");
    scoreMap.set("Parasyte", "8.25");

    imageMap.set("Attack on titan", "attack-on-titan.jpg");
    imageMap.set("One piece", "one-piece.jpg");
    imageMap.set("Death note", "death-note.png");
    imageMap.set("Hunter x Hunter", "hunter-x-hunter.png");
    imageMap.set("Steins;Gate", "steins-gate.png");
    imageMap.set("Monster", "monster.png");
    imageMap.set("Parasyte", "parasyte.png");
}

function onHigherClick() {
    // Check result - if they are equal, then the user wins
    if (leftAnime.getScore() <= rightAnime.getScore()) {
        // If we get in here, the user answered correctly
        guessedCorrectly();

    } else {
        guessedIncorrectly();
    }
}

function onLowerClick() {
    // Check result - if they are equal, then the user wins
    if (leftAnime.getScore() >= rightAnime.getScore()) {
        // If we get in here, the user answered correctly
        guessedCorrectly();
    } else {
        guessedIncorrectly();
    }
}

function guessedCorrectly() {
    document.getElementById("rightScore").innerHTML = rightAnime.getScore();
    document.getElementById("rightScore").classList.add("fadeIn");

    // Things to do when guessing correctly:
    /*
    Remove higher lower buttons with animation
    Show score maybe with incrementing animation
    Get a new "guessing" show and shift the current right to be left
    */
    removeInputButtons();
    changeRightAnimeDescription();
    changeMiddleToCheckmark();

    setTimeout(hideUI, 1500)

    moveImages();
}

function guessedIncorrectly() {
    document.getElementById("rightScore").innerHTML = rightAnime.getScore();
    document.getElementById("rightScore").classList.add("fadeIn");
    removeInputButtons();
    changeRightAnimeDescription();
    changeMiddleToX();
}

function removeInputButtons() {
    let higherButton = document.getElementsByClassName("guessHigher");
    let lowerButton = document.getElementsByClassName("guessLower");
    for (let i = 0; i < higherButton.length; i++) {
        higherButton[i].parentNode.removeChild(higherButton[i]);
    } 
    for (let i = 0; i < lowerButton.length; i++) {
        lowerButton[i].parentNode.removeChild(lowerButton[i]);
    }
}

function changeRightAnimeDescription() {
    // Changes the text from "has a score thats" to "has a score of"
    let rightDescription1 = document.getElementById("rightDescription1");
    rightDescription1.innerHTML = "has a score of ";

    // Remove the "than..." from the page
    let rightDescription2 = document.getElementById("rightDescription2");
    rightDescription2.parentNode.removeChild(rightDescription2);
}

function changeMiddleToCheckmark() {
    // Changes the "VS" text in the middle to a checkmark
    let result = document.getElementById("result");
    result.src = "images/data/checkmark.png"
    result.classList.add("expand")

    // Shrink the "VS" text
    let versus = document.getElementById("versus");
    versus.classList.add("shrink");
}

function changeMiddleToX() {
    // Changes the "VS" text in the middle to an X
    let result = document.getElementById("result");
    result.src = "images/data/wrong.png"
    result.classList.add("expand")

    // Shrink the "VS" text
    let versus = document.getElementById("versus");
    versus.classList.add("shrink");
}

function getNextAnime(rightAnimeTitle, leftAnimeTitle) {
    // Sets nextAnime field to a random anime thats not either of the input titles
    let tempMap = scoreMap;
    tempMap.delete(rightAnimeTitle);
    tempMap.delete(leftAnimeTitle);
    
    let title = getRandomKey(tempMap);
    nextAnime = new Anime(title, tempMap.get(title), imageMap.get(title));
}

function hideUI() {
    // Hides the text and buttons, showing only the images
    let UIElements = document.getElementsByClassName("animeInformation");
    for (let i = 0; i < UIElements.length; i++) {
        UIElements[i].classList.add("fadeOut")
    }
}

function moveImages() {
    document.querySelector('.leftAnime').classList.add('move');
    document.querySelector('.rightAnime').classList.add('move');
    document.querySelector('.nextAnime').classList.add('move');
}

function onStartClick() {
    // Get the start screen element
    let startScreen = document.getElementById("start");

    // Add the 'lower' animation class to the start screen
    startScreen.classList.add("fadeOut");

    // Get elements with class "leftAnime" and "rightAnime"
    let leftAnimeElements = document.getElementsByClassName("leftAnime");
    let rightAnimeElements = document.getElementsByClassName("rightAnime");
    let middleElements = document.getElementsByClassName("middle");
    
    // Add the 'fadeIn' animation class to the main page elements
    for (let i = 0; i < leftAnimeElements.length; i++) {
        leftAnimeElements[i].classList.add("fadeIn");
    }
    for (let i = 0; i < rightAnimeElements.length; i++) {
        rightAnimeElements[i].classList.add("fadeIn");
    }
    for (let i = 0; i < middleElements.length; i++) {
        middleElements[i].classList.add("fadeIn");
    }

    // Set point paragraph for right anime opacity to 0
    document.getElementById("rightScore").style.opacity = 0;

    // Set opacity for VS paragraph
    let versus = document.getElementById("versus");
    versus.style.opacity = 1;

    // Load in the next anime
    getNextAnime(leftAnime.getTitle(), rightAnime.getTitle());
    console.log(nextAnime.getTitle());

    // Optionally, remove the start screen element after the animation completes
    setTimeout(() => {
        startScreen.parentNode.removeChild(startScreen);
    }, 1000); // Match this duration to the animation duration
}


// returns random key from Set or Map
function getRandomKey(collection) {
    let keys = Array.from(collection.keys());
    return keys[Math.floor(Math.random() * keys.length)];
}

document.addEventListener('DOMContentLoaded', (event) => {
    // Gets called when the page gets loaded
    loadMap();

    // Generate left image
    // Get random entries from maps
    let title = getRandomKey(scoreMap);
    leftAnime = new Anime(title, parseFloat(scoreMap.get(title)), imageMap.get(title));
    
    // Set the title, image and score to left anime
    document.getElementById("leftTitle").innerHTML = leftAnime.getTitle();
    document.getElementById("leftScore").innerHTML = leftAnime.getScore();
    document.getElementById("leftImage").src = "images/" + leftAnime.getImage();

    // Generate right image    
    // Make new map and remove already picked entry
    let tempMap = scoreMap;
    tempMap.delete(leftAnime.getTitle());

    // Create right Anime instance
    title = getRandomKey(tempMap);
    rightAnime = new Anime(title, parseFloat(tempMap.get(title)), imageMap.get(title));

    // Set title and image, but not score, to right anime
    document.getElementById("rightTitle").innerHTML = rightAnime.getTitle();
    document.getElementById("rightScore").innerHTML = "???";
    document.getElementById("rightImage").src = "images/" + rightAnime.getImage();
    document.getElementById("rightDescription2").innerHTML = "than " + leftAnime.getTitle();

});