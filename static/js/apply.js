import { display } from "./errorDisplay.js";
import { displayTimer } from "./listingTimer.js";

displayTimer(job);

const expandableSection = document.querySelector(".expandable-section");
const applyForm = document.querySelector("form.applyForm") ;

applyForm.addEventListener("submit", async(event) => {
  if (!expandableSection.classList.contains("expandable-section--open")){
    event.preventDefault();
    expandableSection.classList.toggle("expandable-section--open");
    return;
  }
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