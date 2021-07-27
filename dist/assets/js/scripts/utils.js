function get_url(url, params)
{
    let result = ""
    var xhr = new XMLHttpRequest();
        xhr.open('POST' , url, false);
        xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded')

        xhr.onload = function() {
            if(this.status ==200) {
            result = JSON.parse(this.responseText);
            }
        }
        xhr.send(params);
    return result
}

function getNumberOfWeek() {
    const today = new Date();
    const firstDayOfYear = new Date(today.getFullYear(), 0, 1);
    const pastDaysOfYear = (today.valueOf() - firstDayOfYear.valueOf()) / 86400000;
    return Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7)-1;
}
export {get_url, getNumberOfWeek};