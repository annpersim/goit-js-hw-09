const COLOR_SWITCH_DELAY = 1000;
let intervalId = null;

const refs = {
  btnStart: document.querySelector('[data-start]'),
  btnStop: document.querySelector('[data-stop]'),
  body: document.querySelector('body'),
};

refs.btnStart.addEventListener('click', onStartBtnClick);
refs.btnStop.addEventListener('click', onStopBtnClick);

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

function backgroundColorSwitch() {
  const hexColor = getRandomHexColor();
  refs.body.style.backgroundColor = hexColor;
}

function onStartBtnClick(e) {
  intervalId = setInterval(backgroundColorSwitch, COLOR_SWITCH_DELAY);
  refs.btnStart.setAttribute('disabled', '');
}

function onStopBtnClick(e) {
  clearInterval(intervalId);
  refs.btnStart.removeAttribute('disabled', '');
}
