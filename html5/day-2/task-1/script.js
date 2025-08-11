const image = document.querySelector("img");
const title = document.querySelector(".title");
const backward = document.querySelector("#fa-backward");
const play = document.querySelector("#fa-play");
const stop = document.querySelector("#fa-stop");
const forward = document.querySelector("#fa-forward");
const volumeMute = document.querySelector("#fa-volume-mute");
const seek = document.getElementById("seek");
const volume = document.getElementById("volume");

const data = [
  {
    title: "Alfateha",
    path: "./songs/001.mp3",
    image:
      "https://www.shutterstock.com/image-vector/holy-quran-islamic-book-calligraphy-600nw-281022530.jpg",
  },
  {
    title: "AlIkhlas",
    path: "./songs/112.mp3",
    image:
      "https://www.shutterstock.com/image-vector/holy-quran-islamic-book-calligraphy-600nw-281022530.jpg",
  },
  {
    title: "AnNas",
    path: "./songs/114.mp3",
    image:
      "https://www.shutterstock.com/image-vector/holy-quran-islamic-book-calligraphy-600nw-281022530.jpg",
  },
];

const audio = document.createElement("audio");
document.body.appendChild(audio);

let currentSurah = 0;

function renderSong(index) {
  audio.src = data[index].path;
  image.src = data[index].image;
  title.textContent = data[index].title;

  audio.addEventListener("loadedmetadata", () => {
    seek.max = audio.duration;
    seek.value = 0;
  });
}

play.addEventListener("click", (event) => {
  const status = Number(event.target.dataset.play);
  console.log(status);
  if (status === 0) {
    audio.play();
    event.target.dataset.play = 1;
    play.classList.remove("fa-play");
    play.classList.add("fa-pause");
    return;
  }
  audio.pause();
  event.target.dataset.play = 0;
  play.classList.remove("fa-pause");
  play.classList.add("fa-play");
});

stop.addEventListener("click", () => {
  audio.pause();
  audio.currentTime = 0;
  stop.classList.remove("fa-stop");
  stop.classList.add("fa-pause");
});

forward.addEventListener("click", () => {
  currentSurah = (currentSurah + 1) % data.length;
  renderSong(currentSurah);
  audio.play();
});

backward.addEventListener("click", () => {
  currentSurah = (currentSurah - 1 + data.length) % data.length;
  renderSong(currentSurah);
  audio.play();
});

seek.addEventListener("input", () => {
  audio.currentTime = seek.value;
});

audio.addEventListener("timeupdate", () => {
  seek.value = audio.currentTime;
});

volume.addEventListener("input", () => {
  audio.volume = volume.value;
});

volumeMute.addEventListener("click", () => {
  audio.muted = !audio.muted;
  volumeMute.classList.toggle("muted", audio.muted);
});

window.addEventListener("load", () => {
  renderSong(currentSurah);
});
