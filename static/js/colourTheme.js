import { getCookie } from "./cookies.js";
const colourScheme = document.querySelector('meta[name=color-scheme]');
const switchButtons = document.querySelectorAll('.scheme-switcher_button');
const slider = document.querySelector('.scheme-switcher_slider');


const savedTheme = getCookie("theme");
if(savedTheme) {
  document.documentElement.dataset.theme = savedTheme ;

  switchButtons.forEach((button, index) => {
    if(button.value === savedTheme) {
      button.setAttribute('aria-pressed','true') ;
      slider.style.transform = `translateX(${index * 100}%)`;
    } 
  });
}


switchButtons.forEach((button, index) => {
  button.addEventListener('click', () => {
    switchButtons.forEach(btn =>
      btn.setAttribute(
        'aria-pressed',
        btn === button ? 'true' : 'false'
      )
    );

    slider.style.transform = `translateX(${index * 100}%)`;
    document.documentElement.dataset.theme = button.value;
    document.cookie = `theme=${button.value}; path=/; `
  });
});