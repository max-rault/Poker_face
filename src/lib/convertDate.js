async function convertDate(date){
    let realDate;
    realDate = `${date.getFullYear()}-${('0' + date.getMonth()).slice(-2)}-${('0' + date.getDate()).slice(-2)}T${('0' + date.getHours()).slice(-2)}:${('0' + date.getMinutes()).slice(-2)}`
    return realDate
}

module.exports = {"convertDate": convertDate}