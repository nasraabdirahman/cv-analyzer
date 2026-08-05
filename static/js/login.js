import { displayErrors } from "./errorHandling.js";

const formL = document.querySelector("form.loginForm") ;
const formS = document.querySelector("form.signupForm") ;

formL.addEventListener("submit", async(event) => {
  event.preventDefault();
  const response = await fetch(formL.action, {
    method: "POST",
    body: new FormData(formL)
  });
  const data = await response.json();
  display(response, data);
  if(response.ok){
    window.location.href = "/create";
  }
});

formS.addEventListener("submit", async(event) => {
  event.preventDefault();
  const response = await fetch(formS.action, {
    method: "POST",
    body: new FormData(formS)
  });
  const data = await response.json();
  display(response, data);
  if(response.ok){
    window.location.href = "/loginSignup";
  }
});

function display(response, data){
  if(!response.ok){
    displayErrors(data.errors || data.message);
    return;
  }
}