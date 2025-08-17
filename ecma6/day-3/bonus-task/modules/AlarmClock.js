import Clock from "./Clock.js";

export default class AlarmClock extends Clock {
  #alarmTime = null;

  constructor(initialTime, alarmTime) {
    super(initialTime);
    this.#alarmTime = alarmTime;
  }

  #checkAlarm(currentTime) {
    if (currentTime === this.#alarmTime) {
      alert("Alarm!");
      this.stop();
    }
  }

  start() {
    super.start((time) => {
      console.log(time);
      this.#checkAlarm(time);
    });
  }

  setAlarm(newAlarmTime) {
    this.#alarmTime = newAlarmTime;
  }
}
