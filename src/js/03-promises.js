import { Notify } from 'notiflix/build/notiflix-notify-aio';

// select required elements from HTML
const refs = {
  formEl: document.querySelector('.form'),
  delayEl: document.querySelector('[name="delay"]'),
  stepEl: document.querySelector('[name="step"]'),
  amountEl: document.querySelector('[name="amount"]'),
};

// add event listener to the form
refs.formEl.addEventListener('submit', onFormSubmit);

// on form submit: creates notifications and resets form
function onFormSubmit(e) {
  e.preventDefault();

  let delayCounter = Number(refs.delayEl.value);

  for (let i = 1; i <= Number(refs.amountEl.value); i += 1) {
    createPromise(i, delayCounter)
      .then(({ position, delay }) => {
        Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      });

    delayCounter += Number(refs.stepEl.value);
  }
}

// creates promises with delay
function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}
