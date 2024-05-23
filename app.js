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

    // Check result - if they are equal, then the user wins
    if (leftAnimeScore <= rightAnimeScore) {
        // If we get in here, the user answered correctly
        document.getElementById("rightScore").innerHTML = rightAnimeScore;
    } else {
        console.log("Incorrect");
    }
}

function onLowerClick() {

    // Check result - if they are equal, then the user wins
    if (leftAnimeScore >= rightAnimeScore) {
        // If we get in here, the user answered correctly
        document.getElementById("rightScore").innerHTML = rightAnimeScore;
    } else {

    }
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
    document.getElementById("rightScore").innerHTML = "asdf";
    document.getElementById("rightImage").src = "images/" + image;

    score = parseFloat(score);
    rightAnimeScore = score;

});