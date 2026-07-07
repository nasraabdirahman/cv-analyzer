const colourScheme = document.querySelector('meta[name=color-scheme]');
const switchButtons = document.querySelectorAll('.scheme-switcher_button');
const slider = document.querySelector('.scheme-switcher_slider');

function getCookie(name) {
  const value = `; ${document.cookie}` ;
  const parts = value.split(`; ${name}=`) ;

  if (parts.length === 2) {
    return parts.pop().split(";").shift() ;
  }
  return null ;
}

const savedTheme = getCookie("theme");
if(savedTheme) {
  document.documentElement.dataset.theme = savedTheme ;
  if (colourScheme){
    colourScheme.content = savedTheme  ;
  }

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

    if (colourScheme) {
      colourScheme.content = button.value;
    }
    document.documentElement.dataset.theme = button.value;
    document.cookie = `theme=${button.value}; path=/; `
    console.log(colourScheme);
  });
});