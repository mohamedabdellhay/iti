export default class Clock {
  #IntervalID = null;
  /*
@parameter "HH:MM:SS"
*/
  constructor(initTime) {
    const time = initTime.split(/[-:]/);
    console.log("time", time);

    this.hours = time[0];
    this.minutes = time[1];
    this.seconds = time[2];
    // this.#tick();
    // console.log(this.#tick());
  }
  //   this function tack a object as a parameter
  static formatTime(obj) {
    const str = (n) => String(n).padStart(2, "0");
    return `${str(obj.hours)}:${str(obj.minutes)}:${str(obj.seconds)}`;
  }

  #tick() {
    this.#IntervalID = setInterval(function () {
      if (this.seconds >= 60) {
        if (this.minutes >= 60) {
          if (this.hours >= 12) {
            this.hours = 1;
            this.minutes = 0;
            this.seconds = 0;
            return;
          }
          this.minutes = 0;
          this.seconds = 0;
          this.hours++;
          return;
        }
        this.seconds = 0;
        this.minutes;
      }
      this.seconds;
    }, 1000);
  }
  start() {
    this.#tick();
  }
  stop() {
    clearInterval(this.#IntervalID);
  }
  getTime() {
    return Clock.formatTime(this);
  }
}

// const timeNow = new Clock("10:23:0");

// console.log(Clock.formatTime(new Clock("12:24:1")));
// // new Clock("Sun Aug 17 2025 14:24:12 GMT+0300").#tick();
// console.log(timeNow);

// setTimeout(() => console.log(timeNow), 3000);

class AlarmClock extends Clock {
  #alarmTime;
  constructor(initTime, _alarmTime) {
    super(initTime);
    this.#alarmTime = _alarmTime;
  }
  #checkAlarm() {
    // return this
  }
}
