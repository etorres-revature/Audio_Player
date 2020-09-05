// Mozilla <audio> embed Audio element
// https://developer.mozilla.org/en-US/docs/Web/HTML/Element/audio

//global variables for DOM elements
const musicContainerEl = document.querySelector("#music-container");
const playBtn = document.querySelector("#play");
const prevBtn = document.querySelector("#previous");
const nextBtn = document.querySelector("#next");
const audioEl = document.querySelector("#audio");
const progressEl = document.querySelector("#progress");
const progressContainerEl = document.querySelector("#progress-container");
const titleEl = document.querySelector("#title");
const coverEl = document.querySelector("#cover");

//song titles
const songs = ["hey", "summer", "ukulele"];

//keep track of songs
let songIndex = 1;

//load song details into DOM element
loadSong(songs[songIndex]);

//play song
function playSong() {
  musicContainerEl.classList.add("play");
  playBtn.querySelector("i.fas").classList.remove("fa-play");
  playBtn.querySelector("i.fas").classList.add("fa-pause");

  audioEl.play();
}

//pause song
function pauseSong() {
    musicContainerEl.classList.remove("play");
    playBtn.querySelector("i.fas").classList.add("fa-play");
    playBtn.querySelector("i.fas").classList.remove("fa-pause");
  
    audioEl.pause();
  }

//update song details
function loadSong(song) {
  titleEl.innerHTML = song;
  audioEl.src = `./assets/music/${song}.mp3`;
  coverEl.src = `./assets/images/${song}.jpg`;
}

//event listeners
playBtn.addEventListener("click", () => {
  const isPlaying = musicContainerEl.classList.contains("play");

  if (isPlaying) {
    pauseSong();
  } else {
    playSong();
  }
});
