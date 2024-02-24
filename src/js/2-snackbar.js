
import iziToast from "izitoast";

import "izitoast/dist/css/iziToast.min.css";

//отримали елементи
const startButton = document.querySelector('button')
const form = document.querySelector('form')

// слухач подіі сабміт
form.addEventListener('submit', (event) => {
    event.preventDefault();
    //отримали значення вводу користувача і кнопок
    const userTime = Number(form.delay.value);
    const btnState = form.querySelector('input[name="state"]:checked');
    const userBtnState = btnState.value;

    // створюємо проміс
    const promise = new Promise((res, rej) => {
    setTimeout(() => {
        if (userBtnState === 'fulfilled') {
            res(userTime)
        }
        else {
            rej(userTime)
        }
    }, userTime);
    }
    )
// результат промісу 
promise.then(function (delay) {
    iziToast.success({
        message: `✅ Fulfilled promise in ${delay}ms`,
        fontSize: 'large',
        close: true,
        position: 'topRight',
        messageColor: 'white',
        timeout: 2000,
        icon: false
    });
}).catch(function (delay) {
    iziToast.error({
        message: `❌ Rejected promise in ${delay}ms`,
        fontSize: 'large',
        close: true,
        position: 'topRight',
        messageColor: 'white',
        timeout: 2000,
        icon: false
    });
})
    //очищаємо форму 
    form.reset()
})



