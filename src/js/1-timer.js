//імпортуємо 2 бібліотеки
import flatpickr from "flatpickr";

import "flatpickr/dist/flatpickr.min.css";

import iziToast from "izitoast";

import "izitoast/dist/css/iziToast.min.css";

import iconError from "../img/icon.svg"


//Обираємо елемент 
const input = document.querySelector('#datetime-picker')
const button = document.querySelector('button')
const dayElement = document.querySelector('[data-days]')
const minuteElement = document.querySelector('[data-minutes]')
const hourElement = document.querySelector('[data-hours]')
const secondElement = document.querySelector('[data-seconds]')
const labels = document.querySelectorAll('.label');
labels.forEach(label => { label.textContent = label.textContent.toUpperCase() })


// Функція, щоб 0 додавати
function addLeadingZero(value) {
    if (value < 10) {
        return '0' + value
    }
    else {
        return value
    }
}

//функція, щоб рахувати час
function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

let difference = 0;
let intervalId = 0;
let userSelectedDate = null;
// різниця часу

button.disabled = true;

//Об'єкт параметрів для роботи з календарем
const options = {
    enableTime: true,
    time_24hr: true,
    minuteIncrement: 1,
    //функція при закритті календаря
    onClose(selectedDates) {
        if (!selectedDates || selectedDates.length === 0) {
            return;
        }
             userSelectedDate = selectedDates && selectedDates[0] ?
                new Date(selectedDates[0]).getTime() : null;
            let timeNow = Date.now();
            if (userSelectedDate > timeNow) {
                button.disabled = false;
                difference = userSelectedDate - timeNow;
                const { days, hours, minutes, seconds } = convertMs(difference);
                dayElement.textContent = addZero(days);
                hourElement.textContent = addZero(hours);
                minuteElement.textContent = addZero(minutes);
                secondElement.textContent = addZero(seconds);
            }
            else {
                iziToast.error({
                    fontSize: 'large',
                    close: true,
                    position: 'topRight',
                    messageColor: 'white',
                    timeout: 2000,
                    backgroundColor: 'red',
                    message: ("Please choose a date in the future"),
                    iconUrl: iconError,
                    theme: 'dark'
                })
                button.disabled = true
            }

        }

    }

flatpickr(input, options)

button.addEventListener('click', startTimer)

function startTimer() {
    clearInterval(intervalId)
    intervalId = setInterval(timer, 1000);
}

function timer() {
    if (difference > 0) {
        difference -= 1000;
        displayTime(convertMs(difference))
    }
    else {
        stopTimer()
    }
}

function stopTimer() {
   clearInterval(intervalId) 
}

function displayTime({ days, hours, minutes, seconds }) {
    dayElement.textContent = addLeadingZero(days);
    hourElement.textContent = addLeadingZero(hours);
    minuteElement.textContent = addLeadingZero(minutes);
    secondElement.textContent = addLeadingZero(seconds)
}

