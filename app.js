const scoreMap = new Map();
const imageMap = new Map();

let leftAnimeScore;
let rightAnimeScore;

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
    console.log("CLicked on higher")
    // Check result - if they are equal, then the user wins
    if (leftAnimeScore <= rightAnimeScore) {
        // If we get in here, the user answered correctly
        document.getElementById("rightScore").innerHTML = rightAnimeScore;
        document.getElementById("rightScore").style.opacity = 1;
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
    console.log("CLicked on lower")
    // Check result - if they are equal, then the user wins
    if (leftAnimeScore >= rightAnimeScore) {
        // If we get in here, the user answered correctly
        document.getElementById("rightScore").innerHTML = rightAnimeScore;
        document.getElementById("rightScore").style.opacity = 1;
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
    
    // Get elements with class "leftAnime" and "rightAnime"
    let leftAnimeElements = document.getElementsByClassName("leftAnime");
    let rightAnimeElements = document.getElementsByClassName("rightAnime");
    
    // Iterate over each element and set opacity
    for (let i = 0; i < leftAnimeElements.length; i++) {
        leftAnimeElements[i].style.opacity = 1;
    }
    for (let i = 0; i < rightAnimeElements.length; i++) {
        rightAnimeElements[i].style.opacity = 1;
    }

    // Remove the start screen class
    let div = document.getElementById("start");
    div.parentNode.removeChild(div);

    // Set point paragraph for right anime opacity to 0
    document.getElementById("rightScore").style.opacity = 0;

    // Set opacity for VS paragraph
    div = document.getElementById("versus");
    div.style.opacity = 1;
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
    let anime = getRandomKey(scoreMap);
    let score = scoreMap.get(anime);
    let image = imageMap.get(anime);
    
    // Set the title, image and score to left anime
    document.getElementById("leftTitle").innerHTML = anime;
    document.getElementById("leftScore").innerHTML = score;
    document.getElementById("leftImage").src = "images/" + image;

    score = parseFloat(score);
    leftAnimeScore = score;
    let leftAnimeName = anime;

    // Generate right image    
    // Make new map and remove already picked entry
    let oldAnime = anime;
    let tempMap = scoreMap;
    tempMap.delete(oldAnime);
    anime = getRandomKey(tempMap);
    score = tempMap.get(anime);
    image = imageMap.get(anime);

    // Set title and image, but not score, to right anime
    document.getElementById("rightTitle").innerHTML = anime;
    document.getElementById("rightScore").innerHTML = "???";
    document.getElementById("rightImage").src = "images/" + image;
    document.getElementById("rightDescription2").innerHTML = "than " + leftAnimeName;

    score = parseFloat(score);
    rightAnimeScore = score;

});