export function displayErrors(errors){
  const display = document.querySelector(".error-message") ;
    
  if (!display) {
      console.error("No .flash-message element found.");
      return;
  }
  
  display.innerHTML = "" ;
  errors.forEach(error => {
    const p = document.createElement("p") ;
    p.textContent = error ;
    display.appendChild(p) ;
    
  });
}
