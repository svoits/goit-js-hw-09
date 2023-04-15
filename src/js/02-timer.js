import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

// select required elements from HTML
const refs = {
  startBtnEl: document.querySelector('[data-start]'),
  daysEl: document.querySelector('[data-days]'),
  hoursEl: document.querySelector('[data-hours]'),
  minutesEl: document.querySelector('[data-minutes]'),
  secondsEl: document.querySelector('[data-seconds]'),
  dateInputEl: document.querySelector('#datetime-picker'),
};

// disable start button until a date in the future is chosen
refs.startBtnEl.disabled = true;

// set timer interval id variable
let timerIntervalId = null;

// add listener to start button
refs.startBtnEl.addEventListener('click', onStartBtnClick);

// notifying when start and sets interval
function onStartBtnClick() {
  refs.startBtnEl.disabled = true;
  refs.dateInputEl.disabled = true;
  Notify.success('Let`s count! 🔥🔥🔥');
  timerIntervalId = setInterval(timerRender, 1000);
}

// create flatpickr
const flatpickrDate = flatpickr('#datetime-picker', {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] < Date.now()) {
      refs.startBtnEl.disabled = true;
      return Notify.failure('Please choose a date in the future!');
    }
    refs.startBtnEl.disabled = false;
  },
});

// rendering html content
function timerRender() {
  const remainingTime = flatpickrDate.selectedDates[0] - Date.now();

  if (remainingTime < 1000) {
    refs.startBtnEl.disabled = false;
    refs.dateInputEl.disabled = false;
    Notify.success('Counter finished work! 🎉🎉🎉');
    clearInterval(timerIntervalId);
  }

  const convertedTime = convertMs(remainingTime);

  refs.daysEl.textContent = addLeadingZero(convertedTime.days);
  refs.hoursEl.textContent = addLeadingZero(convertedTime.hours);
  refs.minutesEl.textContent = addLeadingZero(convertedTime.minutes);
  refs.secondsEl.textContent = addLeadingZero(convertedTime.seconds);
}

// adds leading zero to the timer values
function addLeadingZero(value) {
  return value.toString().padStart(2, '0');
}

// ms converter
function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}
