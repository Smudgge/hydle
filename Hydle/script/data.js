const options = document.getElementById("options");

/**
 * A map of the music avaliable.
 * id: [file_name, title, composer, period]
 */
const music = {
    0: ["Beethoven_Sonata_29", "Beethoven Sonata no.29", "Beethoven", "Romantic"],
    1: ["Beethoven_Symphony_3", "Beethoven Symphony no.3", "Beethoven", "Romantic"]
}

const composers = ["Beethoven"]
const periods = ["Classical", "Romantic"]

// First run
for (let index in periods) {
    addOption(periods[index])
}
for (let index in composers) {
    addOption(composers[index])
}
for (let id in music) {
    addOption(music[id].at(1))
}

function addOption(value) {
    var option = document.createElement('option');
    option.value = value;
    options.appendChild(option);
}

/**
 * Used to get the music source location.
 * @param {Integer} id 
 */
function getSource(id) {
    return "./audio/" + music[id][0] + ".mp3"
}