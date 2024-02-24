//імпортуємо 2 бібліотеки
import flatpickr from "flatpickr";

import "flatpickr/dist/flatpickr.min.css";

import iziToast from "izitoast";

import "izitoast/dist/css/iziToast.min.css";

import iconError from "../img/icon.svg"


//Обираємо елемент 
const input = document.querySelector('#datetime-picker')
const button = document.querySelector('button')
const day = document.querySelector('[data-days]')
const minute = document.querySelector('[data-minutes]')
const hour = document.querySelector('[data-hours]')
const second = document.querySelector('[data-seconds]')
const labels = document.querySelectorAll('.label');
labels.forEach(label => { label.textContent = label.textContent.toUpperCase() })


// Функція, щоб 0 додавати
function addZero(value) {
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
// різниця часу

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
            let userSelectedDate = selectedDates && selectedDates[0] ?
                new Date(selectedDates[0]).getTime() : null;
            let timeNow = Date.now();
            if (userSelectedDate > timeNow) {
                button.disabled = false;
                difference = userSelectedDate - timeNow;
                const { days, hours, minutes, seconds } = convertMs(difference);
                day.textContent = addZero(days);
                hour.textContent = addZero(hours);
                minute.textContent = addZero(minutes);
                second.textContent = addZero(seconds);
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
    if (difference > 1000) {
        difference -= 1000;
        updateClockFace(convertMs(difference))
    }
    else {
        clearInterval(intervalId)
    }
}


function updateClockFace({ days, hours, minutes, seconds }) {
    day.textContent = addZero(`${days}`);
    hour.textContent = addZero(`${hours}`);
    minute.textContent = addZero(`${minutes}`);
    second.textContent = addZero(`${seconds}`)
}

