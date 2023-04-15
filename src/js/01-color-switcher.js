// select buttons from HTML using data attributes
const refs = {
  startBtnEl: document.querySelector('[data-start]'),
  stopBtnEl: document.querySelector('[data-stop]'),
};

// set interval id variable
let intervalId = null;

// add event listeners to the buttons
refs.startBtnEl.addEventListener('click', onStartBackgroundColorChange);
refs.stopBtnEl.addEventListener('click', onStopBackgroundColorChange);

// on start button click actions: switch button availability, set bg color immediate and set interval for bg changes.
function onStartBackgroundColorChange() {
  btnAvailabilitySwitcher();
  document.body.style.backgroundColor = `${getRandomHexColor()}`;
  intervalId = setInterval(() => {
    document.body.style.backgroundColor = `${getRandomHexColor()}`;
  }, 1000);
}

// on stop button click actions: switch button availability and clear interval by id.
function onStopBackgroundColorChange() {
  btnAvailabilitySwitcher();
  clearInterval(intervalId);
}

// switch available button
function btnAvailabilitySwitcher() {
  if (!refs.startBtnEl.disabled) {
    refs.startBtnEl.disabled = true;
    refs.stopBtnEl.disabled = false;
  } else {
    refs.startBtnEl.disabled = false;
    refs.stopBtnEl.disabled = true;
  }
}

// generate random color
function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}
