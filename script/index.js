var body = document.querySelector('body');

const guess_1 = document.getElementById("guess-1");
const guess_2 = document.getElementById("guess-2");
const guess_3 = document.getElementById("guess-3");
const guess_4 = document.getElementById("guess-4");
const guess_5 = document.getElementById("guess-5");
const guess_6 = document.getElementById("guess-6");

const answer_line = document.getElementById("answer");

const guess_map = {
    1: guess_1,
    2: guess_2,
    3: guess_3,
    4: guess_4,
    5: guess_5,
    6: guess_6
}


const id = document.getElementById("id");
const audio = document.getElementById("audio");
const svg_play = document.getElementById("svg-play");
const svg_pause = document.getElementById("svg-pause");

const next = document.getElementById("button-next");
const past = document.getElementById("button-past");

var isPlaying = false;
var isEnded = false;
var timeAllowed = 2;
var guessNumber = 1;
var currentID;
var currentPlaylistIndex = 0;

// First run
showDaily()

// Listeners
audio.addEventListener('timeupdate', timeUpdate);
body.addEventListener('keyup', checkEnter);

/**
 * Used to run a puzzle.
 * @param {Integer} id The id of the music to use.
 */
function run(id) {
    clear()

    currentID = id

    loadAudio(getSource(id))
    playAudio()

    highlightGuess()
}

function runPlaylist() {
    run(playlist.at(currentPlaylistIndex))
    id.style.display = "none"
    past.style.display = "block"
    next.style.display = "block"
    answer_line.style.display = "none"
}

function runDaily(musicId) {
    playlist = []
    run(musicId)
    id.style.display = "block"
    past.style.display = "none"
    next.style.display = "none"
    console.log("daily")
}

function nextAudio() {
    let size = playlist.length
    let temp = currentPlaylistIndex += 1
    if (temp > size) temp = 0

    currentPlaylistIndex = temp
    currentID = playlist.at(temp)

    runPlaylist()
}

function pastAudio() {
    let temp = currentPlaylistIndex -= 1
    if (temp < 0) temp = playlist.length - 1

    currentPlaylistIndex = temp
    currentID = playlist.at(temp)

    runPlaylist()
}

function clear() {
    isEnded = false;
    timeAllowed = 2;
    guessNumber = 1;

    for (let id in guess_map) {
        try {
            guess_map[id].querySelectorAll("input")[0].value = ""
            guess_map[id].querySelectorAll("h1")[0].innerHTML = id
        } catch {

        }
        guess_map[id].classList.remove("correct")
        guess_map[id].classList.remove("composer")
        guess_map[id].classList.remove("period")
    }
}

function end() {
    timeAllowed = 1000000;
    isEnded = true

    answer_line.style.display = "block"
    answer_line.innerHTML = music[currentID][1]
}

/**
 * Called when a guess is made.
 */
function guess() {
    if (isEnded) {
        if (playlist.length > 0) {
            nextAudio()
        }

        return
    }

    if (guessNumber == 6) end()

    let input = guess_map[guessNumber].querySelectorAll("input")[0]
    let h1 = guess_map[guessNumber].querySelectorAll("h1")[0];

    if (input.value == "") {
        h1.innerHTML = h1.innerHTML + " Pass"
    }

    h1.innerHTML = h1.innerHTML + " " + input.value

    timeAllowed += 2
    loadAudio(getSource(currentID))
    playAudio()

    if (input.value == music[currentID][1]) {
        guess_map[guessNumber].classList.add("correct")

        end()
        loadAudio(getSource(currentID))
        playAudio()

        for (let id in guess_map) {
            guess_map[id].querySelectorAll("input")[0].style.display = "none"
        }
        return
    }

    if (input.value == music[currentID][2]) {
        guess_map[guessNumber].classList.add("composer")
    }

    if (input.value == music[currentID][3]) {
        guess_map[guessNumber].classList.add("period")
    }

    guessNumber ++;
    highlightGuess()
}

/**
 * Used to put the cursur on the guess and add a listener.
 */
function highlightGuess() {
    for (let id in guess_map) {
        guess_map[id].querySelectorAll("input")[0].style.display = "none"
    }
    
    let input = guess_map[guessNumber].querySelectorAll("input")[0];

    input.style.display = "block"
    input.focus();
}

function checkEnter(event) {
    if (event.keyCode === 9 || event.keyCode === 13) {
        guess()
    }
}

/**
 * Called when time updates on the audio.
 * This is used to limit the amount of time you can listen to the piece.
 * @param {Event} event 
 */
function timeUpdate(event) {
    const { duration, currentTime } = event.srcElement;
    if (currentTime >= timeAllowed) {
        pauseAudio()
        loadAudio(getSource(currentID))
    }
}

/**
 * Used to load the audio.
 * @param {String} source 
 */
function loadAudio(source) {
    audio.src = source;
}

/**
 * Used to toggle the audio being played.
 */
function toggleAudio() {
    if (isPlaying) pauseAudio()
    else playAudio()
}
function playAudio() {
    svg_pause.style.display = "block"
    svg_play.style.display = "none"
    audio.play();
    isPlaying = true;
}
function pauseAudio() {
    svg_pause.style.display = "none"
    svg_play.style.display = "block"
    audio.pause();
    isPlaying = false;
}