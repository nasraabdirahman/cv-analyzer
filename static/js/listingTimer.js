const daysLeft = document.getElementById("days-left");

export function timer() {
    var today = new Date();
    var removalDate = new Date(job.removalDate) ;
    var difference = removalDate.getTime() - today.getTime();
    return Math.ceil(difference / (1000 * 3600 * 24)) ;
    
}   

daysLeft.textContent = timer(); 