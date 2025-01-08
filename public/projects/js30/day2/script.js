'use strict';

class Clock {
  constructor() {
    this._secondsHandNode = document.querySelector('.second-hand');
    this._minutesHandNode = document.querySelector('.min-hand');
    this._hoursHandNode = document.querySelector('.hour-hand');

    this._time = null;
    this._seconds = null;
    this._minutes = null;
    this._hours = null;

    this._startAngle = 90;
  }

  start() {
    this._updateClock();
    this._createTimer();
  }

  _setTime() {
    this._time = new Date();
    this._seconds = this._time.getSeconds();
    this._minutes = this._time.getMinutes();
    this._hours = this._time.getHours();
  }

  _renderHands() {
    this._secondsHandNode.style.transform = `rotate(${(this._seconds / 60) * 360 + this._startAngle}deg)`;
    this._minutesHandNode.style.transform = `rotate(${(this._minutes / 60) * 360 + (this._seconds / 60) * 6 + this._startAngle}deg)`;
    this._hoursHandNode.style.transform = `rotate(${(this._hours / 12) * 360 + (this._minutes / 60) * 30 + this._startAngle}deg)`;
  }

  _updateClock() {
    this._setTime();
    this._renderHands();
  }

  _createTimer() {
    setInterval(() => {
      this._updateClock();
    }, 1000);
  }
}

const clock = new Clock();

clock.start();
