const colorScheme = document.querySelector('meta[name=color-scheme]');
const switchButtons = document.querySelectorAll('.scheme-switcher_button');
const slider = document.querySelector('.scheme-switcher_slider');

switchButtons.forEach((button, index) => {
  button.addEventListener('click', () => {
    switchButtons.forEach(btn =>
      btn.setAttribute(
        'aria-pressed',
        btn === button ? 'true' : 'false'
      )
    );

    slider.style.transform = `translateX(${index * 100}%)`;

    if (colorScheme) {
      colorScheme.content = button.value;
    }
    document.documentElement.dataset.theme = button.value;
    console.log(colorScheme);
  });
});