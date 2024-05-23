const scoreMap = new Map();
const imageMap = new Map();

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
    console.log("Higher");
}

function onLowerClick() {
    console.log("Lower");
}

function onStartClick() {
    console.log("Start");
    
    // Set background things to normal opacity
    
}

// returns random key from Set or Map
function getRandomKey(collection) {
    let keys = Array.from(collection.keys());
    return keys[Math.floor(Math.random() * keys.length)];
}

document.addEventListener('DOMContentLoaded', (event) => {
    // Gets called when the page gets loaded
    loadMap();

    // Get random entries from maps
    let anime = getRandomKey(scoreMap);
    let score = scoreMap.get(anime);
    let image = imageMap.get(anime);
    
    // Set the image and score to right anime
    document.getElementById("leftTitle").innerHTML = anime;
    document.getElementById("leftScore").innerHTML = score;
    document.getElementById("leftImage").src = "images/" + image;

});