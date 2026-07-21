const container = document.querySelector('.settings-container');
const list = document.querySelector('.settings-list');
const mainBtn = document.querySelector('#settings-main-btn');
import { SoundContainer } from "./data.js";
import { Themes } from "./theme.js";

const Settings = [];
Settings.push(SoundContainer);
Settings.push(Themes);

mainBtn.addEventListener('click', () => {
  Themes.classList.remove('active');
  SoundContainer.classList.remove('active');
  if (list.classList.contains('active')) {
    list.classList.remove('active');
    list.classList.add('closing');
    setTimeout(() => {
      list.classList.remove('closing');
    }, 500); 
  } else {
    list.classList.remove('closing');
    list.classList.add('active');
  }
});

export {Settings};