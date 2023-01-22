// Sections.
const puzzle = document.getElementById("puzzle");
const practice = document.getElementById("practice");
const help = document.getElementById("help");

// Buttons.
const button_daily = document.getElementById("button-daily");
const button_practice = document.getElementById("button-practice");
const button_help = document.getElementById("button-help")

/**
 * Used to hide all sections.
 */
function hideSections() {
    puzzle.style.display = "none"
    practice.style.display = "none"
    help.style.display = "none"

    button_daily.classList.remove("underline-5")
    button_practice.classList.remove("underline-5")
    button_help.classList.remove("underline-5")

    button_daily.classList.remove("bg-2")
    button_practice.classList.remove("bg-2")
    button_help.classList.remove("bg-2")
}

function showDaily() {
    hideSections()
    puzzle.style.display = "block"
    button_daily.classList.add("underline-5")
    button_daily.classList.add("bg-2")

    let date = new Date();
    let monthNumber = date.getDate();

    id.style.display = "block"
    id.innerHTML = "#" + (monthNumber + 1)
    runDaily(monthNumber + 1)
}

/**
 * Used to show the puzzle section.
 * This will also hide other sections.
 */
function showPuzzle() {
    hideSections()
    button_practice.classList.add("underline-5")
    button_practice.classList.add("bg-2")
    puzzle.style.display = "block"
}

/**
 * Used to show the practice section.
 * This will also hide other sections.
 */
function showPractice() {
    hideSections()
    practice.style.display = "block"
    button_practice.classList.add("underline-5")
    button_practice.classList.add("bg-2")
}

/**
 * Used to show the help section.
 * This will also hide other sections.
 */
function showHelp() {
    hideSections()
    help.style.display = "block"
    button_help.classList.add("underline-5")
    button_help.classList.add("bg-2")
}