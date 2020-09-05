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
    //adding play to music container class
  musicContainerEl.classList.add("play");
  //changing play button to pause button
  playBtn.querySelector("i.fas").classList.remove("fa-play");
  playBtn.querySelector("i.fas").classList.add("fa-pause");

  //playing the song
  audioEl.play();
}

//pause song
function pauseSong() {
    //removing play from music container class list
  musicContainerEl.classList.remove("play");
  //changing pause button to play
  playBtn.querySelector("i.fas").classList.add("fa-play");
  playBtn.querySelector("i.fas").classList.remove("fa-pause");

  //pausing the song
  audioEl.pause();
}

//previous song
function prevSong() {
    //decrementing song index
  songIndex--;
  //if logic for when song index is zero to go to end of array
  if (songIndex < 0) {
    songIndex = songs.length - 1;
  }
//loading song by array with song index variable
  loadSong(songs[songIndex]);

  //playing song
  playSong();
}

//next song
function nextSong() {
    //increment song index
  songIndex++;
  //if logic for when song index is at end of array go back to beginning of array
  if (songIndex > songs.length - 1) {
    songIndex = 0;
  }
//loading song by array with song index variable
  loadSong(songs[songIndex]);

  //playing song
  playSong();
}

//update progress bar
function updateProgress(e) {
    //making variables for duration and time from the click event
  const { duration, currentTime } = e.srcElement;
  // console.log(duration, currentTime);
  //setting variable for profess percent
  const progressPercent = (currentTime / duration) * 100;
  // console.log (progrssPercent);
  //using progress percent to make width
  progressEl.style.width = `${progressPercent}%`;
}

//set progress bar
function setProgress(e) {
    //getting total width of progress bar
  const width = this.clientWidth;
  //console.log(width);
  //creating a variable to hold the place on progress bar that was clicked from click event
  const clickX = e.offsetX;
  // console.log(clickX);
  //variable for total duration of song
  const duration = audio.duration;
  //setting the spot where progress bar should go based on click location from click event divided by total width of progress bar multiplied by the duration of the song
  audioEl.currentTime = (clickX / width) * duration;
}

//update song details
function loadSong(song) {
    //setting title element to name of song
  titleEl.innerHTML = song;
  //setting source of audio file
  audioEl.src = `./assets/music/${song}.mp3`;
//setting source of cover image
  coverEl.src = `./assets/images/${song}.jpg`;
}

//event listeners
playBtn.addEventListener("click", () => {
    //variable to find if music container has the play class
  const isPlaying = musicContainerEl.classList.contains("play");
//if logic for what to do if music container has play class
  if (isPlaying) {
      //if music container has play class then pause the song when cliked
    pauseSong();
  } else {
      //else if music container doesn't have play class then play the song
    playSong();
  }
});

//change song
//previous song in songs array
prevBtn.addEventListener("click", prevSong);
//next song in songs array
nextBtn.addEventListener("click", nextSong);

//time/song update
audioEl.addEventListener("timeupdate", updateProgress);

//click on progress bar
progressContainerEl.addEventListener("click", setProgress);

//song end
audioEl.addEventListener("ended", nextSong);
