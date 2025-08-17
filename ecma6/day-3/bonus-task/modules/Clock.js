export default class Clock {
  hours;
  minutes;
  seconds;
  #intervalId;

  constructor(initialTime) {
    const [h, m, s] = initialTime.split(":").map(Number);
    this.hours = h;
    this.minutes = m;
    this.seconds = s;
  }

  static formatTime(hours, minutes, seconds) {
    const str = (num) => String(num).padStart(2, "0");
    return `${str(hours)}:${str(minutes)}:${str(seconds)}`;
  }

  #tick() {
    this.seconds++;
    if (this.seconds >= 60) {
      this.seconds = 0;
      this.minutes++;
      if (this.minutes >= 60) {
        this.minutes = 0;
        this.hours = (this.hours + 1) % 24;
      }
    }
    // console.log(`${this.hours}, ${this.minutes}, ${this.seconds}`);
  }

  start(onTick) {
    if (this.#intervalId) return;
    this.#intervalId = setInterval(() => {
      this.#tick();
      if (onTick) onTick(this.getTime());
    }, 1000);
  }

  stop() {
    clearInterval(this.#intervalId);
    this.#intervalId = null;
  }

  getTime() {
    return Clock.formatTime(this.hours, this.minutes, this.seconds);
  }
}
