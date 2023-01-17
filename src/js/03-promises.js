import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
  form: document.querySelector('.form'),
  delayInput: document.querySelector('[name="delay"]'),
  stepInput: document.querySelector('[name="step"]'),
  amountInput: document.querySelector('[name="amount"]'),
};

refs.form.addEventListener('submit', submitPromise);

function submitPromise(e) {
  e.preventDefault();

  const promise = {
    position: 0,
    delay: 0,
  };

  for (let i = 0; i < refs.amountInput.value; i++) {
    promise.position = i + 1;
    promise.delay = +refs.delayInput.value + refs.stepInput.value * i;

    createPromise(promise)
      .then(resolve => {
        Notify.success(resolve, {
          useIcon: false,
        });
      })
      .catch(reject => {
        Notify.failure(reject, {
          useIcon: false,
        });
      });
  }
}

function createPromise({ position, delay }) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;
      if (shouldResolve) {
        resolve(`✅ Fulfilled promise ${position} in ${delay}ms`);
      } else {
        reject(`❌ Rejected promise ${position} in ${delay}ms`);
      }
    }, delay);
  });
}
