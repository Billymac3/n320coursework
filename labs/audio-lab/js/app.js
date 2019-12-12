var soundButtons = document.getElementById("soundButtons");

var sounds = [
  { file: "chimes_long.mp3", name: "Chimes Long" },
  { file: "click_clock_loop.mp3", name: "Click Clock Loop" },
  { file: "pop_10.mp3", name: "Pop 10" },
  { file: "puff.mp3", name: "Puff" },
  { file: "rustle_5.mp3", name: "Rustle 5" }
];

var soundElements = [];

// loop through all of the sounds and create audio tags for them
sounds.forEach((soundURL, idx) => {
  // the sound
  var newSound = new Audio("sounds/" + soundURL.file);

  //   store each sound in an array for later reference
  soundElements.push(newSound);

  //   create the button to play the sound
  var newButton = document.createElement("button");
  //   change the text that goes in the buttons from new array
  newButton.innerHTML = soundURL.name;

  //   store the sounds index
  newButton.setAttribute("data-sound-id", idx);

  // add it to the page
  soundButtons.appendChild(newButton);

  //   listen for a click on the button and invoke play sound function
  newButton.addEventListener("click", playSoundInArray);
});

function playSoundInArray(event) {
  // get sound index
  var soundIndex = Number(event.target.getAttribute("data-sound-id"));

  // get sound from array
  var selectedSound = soundElements[soundIndex];

  //   play that selected sound
  selectedSound.play();
}

// get the audio tag here
// var myAudio = document.getElementById("myAudio");

// myAudio.play();

// function playAudio() {
//   myAudio.play();
// }

// function stopMainAudio() {
//   myAudio.pause();
//   myAudio.currentTime = 0;
// }
