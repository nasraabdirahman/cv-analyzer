export function displayErrors(errors){
  const display = document.querySelector(".error-message") ;

  display.innerHTML = "" ;
  errors.forEach(error => {
    const p = document.createElement("p") ;
    p.textContent = error ;
    display.appendChild(p) ;
    
  });
}

export function display(response, data){
  if(!response.ok){
    displayErrors(data.errors || data.message);
    return;
  }
}