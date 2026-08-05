const container = document.querySelector(".container");
const signupBtn = document.querySelector(".signup-button");
const loginBtn = document.querySelector(".login-button");

signupBtn.addEventListener('click', ()=>{
	container.classList.add("active");
});

loginBtn.addEventListener('click', ()=>{
	container.classList.remove("active");
});