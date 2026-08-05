export function timer(removal, today) {
    var removalDate = new Date(removal) ;
    var difference = removalDate.getTime() - today.getTime();
    console.log(difference);
    return Math.ceil(difference / (1000 * 3600 * 24)) ;  
}   

export function displayTimer(job) {
    const daysLeft = document.getElementById("days-left");
    daysLeft.textContent = timer(job.removalDate, new Date()); 
    console.log(daysLeft.textContent);
}