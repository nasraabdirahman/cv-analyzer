import { displayErrors } from "./errorHandling.js";
import { display } from "./errorHandling.js";
import { displayTimer } from "./listingTimer.js";

displayTimer(job);

const applyButton = document.querySelector(".standard-button");
const expandableSection = document.querySelector(".expandable-section");

applyButton.addEventListener("click", () => {
    if (!expandableSection.classList.contains("expandable-section--open")){
        event.preventDefault();
        expandableSection.classList.toggle("expandable-section--open");
    }
});

const applyForm = document.querySelector("form.applyForm") ;

applyForm.addEventListener("submit", async(event) => {
  event.preventDefault();
  const response = await fetch(applyForm.action, {
    method: "POST",
    body: new FormData(applyForm)
  });
  const data = await response.json();
  
  display(response, data);
  if(response.ok){
    window.location.href = "/market";
  }
});