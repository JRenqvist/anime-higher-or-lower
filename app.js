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
    // Remove the "fadeIn" class after 1 second
    setTimeout(() => {
        document.getElementById("rightScore").style.opacity = 1;
        document.getElementById("rightScore").classList.remove("fadeIn");
    }, 1000);

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
    setTimeout(moveImages, 2500);
    setTimeout(() => {
        updateAnimeFields();
        changeMiddleToVS();
        showInputButtons();
        updateUIElements();
        showUI();
    }, 4500)
}

function guessedIncorrectly() {
    document.getElementById("rightScore").innerHTML = rightAnime.getScore();
    document.getElementById("rightScore").classList.add("fadeIn");
    // Remove the "fadeIn" class after 1 second
    setTimeout(() => {
        document.getElementById("rightScore").style.opacity = 1;
        document.getElementById("rightScore").classList.remove("fadeIn");
    }, 1000);

    removeInputButtons();
    changeRightAnimeDescription();
    changeMiddleToX();
}

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

function changeRightAnimeDescription() {
    // Changes the text from "has a score thats" to "has a score of"
    let rightDescription1 = document.getElementById("rightDescription1");
    rightDescription1.innerHTML = "has a score of ";

    // Remove the "than..." from the page
    let rightDescription2 = document.getElementById("rightDescription2");
    rightDescription2.classList.add("fadeOut");
    // Remove after 1 second
    setTimeout(() => {
        rightDescription2.style.opacity = 0;
        rightDescription2.classList.remove("fadeOut");
    }, 1000);
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

function changeMiddleToVS() {
    let checkmark = document.getElementById("result");
    checkmark.classList.remove("expand");
    checkmark.classList.add("moveReset");

    let versus = document.getElementById("versus");
    versus.classList.remove("shrink");
    versus.classList.add("expand");
}

function getNextAnime(rightAnimeTitle, leftAnimeTitle) {
    // Sets nextAnime field to a random anime thats not either of the input titles
    let tempMap = scoreMap;
    tempMap.delete(rightAnimeTitle);
    tempMap.delete(leftAnimeTitle);
    
    let title = getRandomKey(tempMap);
    nextAnime = new Anime(title, parseFloat(tempMap.get(title)), imageMap.get(title));
}

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

function updateAnimeFields() {
    leftAnime = rightAnime;
    rightAnime = nextAnime;
    
    // Get next anime
    getNextAnime(rightAnime.getTitle(), leftAnime.getTitle());
}

function updateUIElements() {
    // Set the title, image and score to left anime
    document.getElementById("leftTitle").innerHTML = leftAnime.getTitle();
    document.getElementById("leftScore").innerHTML = leftAnime.getScore();
    document.getElementById("leftImage").src = "images/" + leftAnime.getImage();

    // Set title and image, but not score, to right anime
    document.getElementById("rightTitle").innerHTML = rightAnime.getTitle();
    document.getElementById("rightScore").innerHTML = "???";
    document.getElementById("rightImage").src = "images/" + rightAnime.getImage();
    document.getElementById("rightDescription1").innerHTML = "has a score thats";
    document.getElementById("rightDescription2").innerHTML = "than " + leftAnime.getTitle();

    // Set image to next anime
    document.getElementById("nextImage").src = "images/" + nextAnime.getImage();
}

function onStartClick() {
    // Get the start screen element
    let startScreen = document.getElementById("start");

    // Add the 'fadeOut' animation class to the start screen
    startScreen.classList.add("fadeOut");
    // Remove the start screen after 1 second
    setTimeout(() => {
        startScreen.style.opacity = 0;
        startScreen.classList.remove("fadeOut");
    }, 1000);

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

    // Set point paragraph for right anime opacity to 0
    document.getElementById("rightScore").style.opacity = 0;

    // Set opacity for VS paragraph
    let versus = document.getElementById("versus");
    versus.style.opacity = 1;

    
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
    
    // Generate right image    
    // Make new map and remove already picked entry
    let tempMap = scoreMap;
    tempMap.delete(leftAnime.getTitle());

    // Create right Anime instance
    title = getRandomKey(tempMap);
    rightAnime = new Anime(title, parseFloat(tempMap.get(title)), imageMap.get(title));

    // Load in the next anime
    getNextAnime(leftAnime.getTitle(), rightAnime.getTitle());

    updateUIElements();
});