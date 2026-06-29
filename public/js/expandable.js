const applyButton = document.querySelector(".standard-button");
const expandableSection = document.querySelector(".expandable-section");

applyButton.addEventListener("click", () => {
    expandableSection.classList.toggle("expandable-section--open");
});