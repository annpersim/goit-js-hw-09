import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

// refs
const refs = {
  picker: document.querySelector('#datetime-picker'),

  days: document.querySelector('[data-days]'),
  hours: document.querySelector('[data-hours]'),
  minutes: document.querySelector('[data-minutes]'),
  seconds: document.querySelector('[data-seconds]'),

  btnStart: document.querySelector('[data-start]'),

  timerDiv: document.querySelector('.timer'),
  timerField: document.querySelectorAll('.field'),
  timerValue: document.querySelectorAll('.value'),
  timerLabel: document.querySelectorAll('.label'),
};

// js styles
refs.timerDiv.style.display = 'flex';
refs.timerDiv.style.gap = '20px';

refs.timerValue.forEach(value => {
  value.style.textAlign = 'center';
  value.style.fontSize = '25px';
});

refs.timerLabel.forEach(label => {
  label.style.fontSize = '11px';
  label.style.textTransform = 'uppercase';
  label.style.fontWeight = '600';
});

// disable start button
refs.btnStart.setAttribute('disabled', '');

// flatpickr calendar
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);
    if (selectedDates[0] < options.defaultDate) {
      return Notify.failure('Please choose a date in the future');
    } else {
      refs.btnStart.removeAttribute('disabled', '');
    }
  },
};

flatpickr('#datetime-picker', options);

// timer: set date and count time
class Timer {
  constructor({ onTick }) {
    this.intervalId = null;
    this.onTick = onTick;
  }

  start() {
    this.intervalId = setInterval(() => {
      const startTime = new Date(refs.picker.value);
      const currentTime = Date.now();
      const deltaTime = startTime.getTime() - currentTime;

      if (deltaTime > 0) {
        const time = this.getTimeComponents(deltaTime);
        this.onTick(time);
      } else {
        clearInterval(this.intervalId);
      }
    }, 1000);
  }

  getTimeComponents(time) {
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    const days = this.addLeadingZero(Math.floor(time / day));
    const hours = this.addLeadingZero(Math.floor((time % day) / hour));
    const minutes = this.addLeadingZero(
      Math.floor(((time % day) % hour) / minute)
    );
    const seconds = this.addLeadingZero(
      Math.floor((((time % day) % hour) % minute) / second)
    );

    return { days, hours, minutes, seconds };
  }

  addLeadingZero(value) {
    return String(value).padStart(2, '0');
  }
}

const timer = new Timer({
  onTick: updateTimerInterface,
});

// interface update on btn click
function updateTimerInterface({ days, hours, minutes, seconds }) {
  refs.days.textContent = `${days}`;
  refs.hours.textContent = `${hours}`;
  refs.minutes.textContent = `${minutes}`;
  refs.seconds.textContent = `${seconds}`;
}

refs.btnStart.addEventListener('click', () => {
  timer.start();
});
