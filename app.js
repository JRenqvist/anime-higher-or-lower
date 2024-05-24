const scoreMap = new Map();
const imageMap = new Map();

// Scores
let leftAnimeScore;
let rightAnimeScore;

// Next anime in queue
let nextAnimeImage;
let nextAnimeScore;
let nextAnimeTitle

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
    if (leftAnimeScore <= rightAnimeScore) {
        // If we get in here, the user answered correctly
        document.getElementById("rightScore").innerHTML = rightAnimeScore;
        document.getElementById("rightScore").classList.add("fadeIn");
        document.getElementById("result").style.opacity = 1;

        // Things to do when guessing correctly:
        /*
        Remove higher lower buttons with animation
        Show score maybe with incrementing animation
        Get a new "guessing" show and shift the current right to be left
        */
        removeInputButtons();
        changeRightAnimeDescription();
        changeMiddleToCheckmark();

    } else {
        document.getElementById("rightScore").innerHTML = rightAnimeScore;
        document.getElementById("rightScore").style.opacity = 1;
        removeInputButtons();
        changeRightAnimeDescription();
        changeMiddleToX();
    }
}

function onLowerClick() {
    // Check result - if they are equal, then the user wins
    if (leftAnimeScore >= rightAnimeScore) {
        // If we get in here, the user answered correctly
        document.getElementById("rightScore").innerHTML = rightAnimeScore;
        document.getElementById("rightScore").classList.add("fadeIn");
        removeInputButtons();
        changeRightAnimeDescription();
        changeMiddleToCheckmark();
    } else {
        document.getElementById("rightScore").innerHTML = rightAnimeScore;
        document.getElementById("rightScore").style.opacity = 1;
        removeInputButtons();
        changeRightAnimeDescription();
        changeMiddleToX();
    }
}

function removeInputButtons() {
    console.log("Removing input buttons");
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

    //
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

    // Optionally, remove the start screen element after the animation completes
    setTimeout(() => {
        startScreen.parentNode.removeChild(startScreen);
    }, 500); // Match this duration to the animation duration
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
    let score = scoreMap.get(title);
    let image = imageMap.get(title);
    
    // Set the title, image and score to left anime
    document.getElementById("leftTitle").innerHTML = title;
    document.getElementById("leftScore").innerHTML = score;
    document.getElementById("leftImage").src = "images/" + image;

    score = parseFloat(score);
    leftAnimeScore = score;
    let leftAnimeTitle = title;

    // Generate right image    
    // Make new map and remove already picked entry
    let oldTitle = title;
    let tempMap = scoreMap;
    tempMap.delete(oldTitle);
    title = getRandomKey(tempMap);
    score = tempMap.get(title);
    image = imageMap.get(title);

    // Set title and image, but not score, to right anime
    document.getElementById("rightTitle").innerHTML = title;
    document.getElementById("rightScore").innerHTML = "???";
    document.getElementById("rightImage").src = "images/" + image;
    document.getElementById("rightDescription2").innerHTML = "than " + leftAnimeTitle;

    score = parseFloat(score);
    rightAnimeScore = score;

});