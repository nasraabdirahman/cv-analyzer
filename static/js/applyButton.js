const applyButton = document.querySelector(".standard-button");
const expandableSection = document.querySelector(".expandable-section");

applyButton.addEventListener("click", () => {
    if (!expandableSection.classList.contains("expandable-section--open")){
        event.preventDefault();
        expandableSection.classList.toggle("expandable-section--open");
    }
});