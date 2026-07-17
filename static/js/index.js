document.querySelector("#colorSwitch").addEventListener("click", (e) => {
    // Bubbling stops here.
    e.stopPropagation();

    // switch logic.
    document.documentElement.dataset.theme = e.currentTarget.isOn ? "dark" : "light";
});

