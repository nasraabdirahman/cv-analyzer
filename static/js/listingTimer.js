export function timer(removal, today) {
    var removalDate = new Date(removal) ;
    var difference = removalDate.getTime() - today.getTime();
    return Math.ceil(difference / (1000 * 3600 * 24)) ;  
}   
