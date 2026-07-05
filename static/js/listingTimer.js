const { response } = require("express")
const daysLeft = document.getElementById("days-left");


    
var today = new Date();
var removalDate = new Date(job.removalDate)
var difference = today.getTime() - removalDate.getTime() ;
var days = Math.ceil(difference / (1000 * 3600 * 24)) ;

daysLeft.textContent = days;