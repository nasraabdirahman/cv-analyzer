export function displayErrors(errors, errorMessage = ".error-message"){
  const container = document.querySelector(errorMessage) ;

  container.innerHTML = "" ;
  errors.forEach(error => {
    const p = document.createElement("p") ;
    p.textContent = error ;
    container.appendChild(p) ;
  });
}

export function display(response, data){
  if(!response.ok){
    displayErrors(data.errors);
    return;
  }
}