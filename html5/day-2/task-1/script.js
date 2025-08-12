const AudioPlayer = {
  elements: {
    image: document.querySelector(".player img"),
    title: document.querySelector(".player .title"),
    seek: document.getElementById("seek"),
    volume: document.getElementById("volume"),
    buttons: {
      backward: document.querySelector("#fa-backward"),
      play: document.querySelector("#fa-play"),
      stop: document.querySelector("#fa-stop"),
      forward: document.querySelector("#fa-forward"),
      volumeMute: document.querySelector("#fa-volume-mute"),
    },
    audio: document.createElement("audio"),
  },

  playlist: [
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
  ],

  state: {
    currentTrack: 0,
    isPlaying: false,
    isMuted: false,
  },

  init() {
    document.body.appendChild(this.elements.audio);
    this.setupEventListeners();
    this.renderTrack(this.state.currentTrack);
  },

  setupEventListeners() {
    const { buttons, seek, volume, audio } = this.elements;

    buttons.play.addEventListener("click", () => this.togglePlay());
    buttons.stop.addEventListener("click", () => this.stop());
    buttons.forward.addEventListener("click", () => this.nextTrack());
    buttons.backward.addEventListener("click", () => this.previousTrack());
    buttons.volumeMute.addEventListener("click", () => this.toggleMute());
    seek.addEventListener("input", () => this.seek());
    volume.addEventListener("input", () => this.adjustVolume());
    audio.addEventListener("timeupdate", () => this.updateSeek());
    audio.addEventListener("loadedmetadata", () => this.onMetadataLoaded());
    audio.addEventListener("ended", () => this.onTrackEnded());
  },

  renderTrack(index) {
    const { audio, image, title, seek } = this.elements;
    const track = this.playlist[index];

    audio.src = track.path;
    image.src = track.image;
    image.alt = track.title;
    title.textContent = track.title;
    seek.value = 0;
    this.updateVolumeIcon();
  },

  togglePlay() {
    const { audio, buttons } = this.elements;
    this.state.isPlaying = !this.state.isPlaying;

    if (this.state.isPlaying) {
      audio.play().catch((e) => console.error("Playback failed:", e));
      buttons.play.classList.remove("fa-play");
      buttons.play.classList.add("fa-pause");
      buttons.play.dataset.play = "1";
    } else {
      audio.pause();
      buttons.play.classList.remove("fa-pause");
      buttons.play.classList.add("fa-play");
      buttons.play.dataset.play = "0";
    }
  },

  stop() {
    const { audio, buttons } = this.elements;
    this.state.isPlaying = false;
    audio.pause();
    audio.currentTime = 0;
    buttons.play.classList.remove("fa-pause");
    buttons.play.classList.add("fa-play");
    buttons.play.dataset.play = "0";
  },

  nextTrack() {
    this.state.currentTrack =
      (this.state.currentTrack + 1) % this.playlist.length;
    this.renderTrack(this.state.currentTrack);
    if (this.state.isPlaying) {
      this.elements.audio
        .play()
        .catch((e) => console.error("Playback failed:", e));
    }
  },

  previousTrack() {
    this.state.currentTrack =
      (this.state.currentTrack - 1 + this.playlist.length) %
      this.playlist.length;
    this.renderTrack(this.state.currentTrack);
    if (this.state.isPlaying) {
      this.elements.audio
        .play()
        .catch((e) => console.error("Playback failed:", e));
    }
  },

  seek() {
    this.elements.audio.currentTime = this.elements.seek.value;
  },

  adjustVolume() {
    const { audio, volume } = this.elements;
    audio.volume = volume.value;
    this.state.isMuted = volume.value == 0;
    this.updateVolumeIcon();
  },

  toggleMute() {
    const { audio, volume } = this.elements;
    this.state.isMuted = !this.state.isMuted;
    audio.muted = this.state.isMuted;
    volume.value = this.state.isMuted ? 0 : 0.3;
    audio.volume = volume.value;
    this.updateVolumeIcon();
  },

  updateVolumeIcon() {
    const { buttons, volume } = this.elements;
    buttons.volumeMute.classList.toggle("fa-volume-mute", volume.value == 0);
    buttons.volumeMute.classList.toggle("fa-volume-high", volume.value != 0);
  },

  updateSeek() {
    this.elements.seek.value = this.elements.audio.currentTime;
  },

  onMetadataLoaded() {
    const { seek, volume, audio } = this.elements;
    seek.max = audio.duration;
    audio.volume = volume.value;
    this.updateVolumeIcon();
  },

  onTrackEnded() {
    this.nextTrack();
  },
};

window.addEventListener("load", () => AudioPlayer.init());
