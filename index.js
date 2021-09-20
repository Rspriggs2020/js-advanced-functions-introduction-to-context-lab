// Your code here
//let foo => bar
let createEmployeeRecord = function(src) {
    return {
        firstName: src[0],
        familyName: src[1],
        title: src[2],
        payPerHour: src[3],
        timeInEvents: [],
        timeOutEvents: [],
    }
}

//create objects

let createEmployeeRecords = function(srcdata) {
    return srcdata.map(function(src){
        return createEmployeeRecord(src)
    })
}

let createTimeInEvent = function(employee, time) {
    let [date, hour] = time.split(' ')
    employee.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(hour, 10),
        date,
    })
    return employee
}

let createTimeOutEvent = function(employee, time) {
    let [date, hour] = time.split(' ')
    employee.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(hour, 10),
        date,
    })
    return employee
}

let hoursWorkedOnDate = function(employee, time) {
    let timeIn = employee.timeInEvents.find(function(e){
        return e.date === time
    })
    let timeOut = employee.timeOutEvents.find(function(e){
        return e.date === time
    })
    return (timeOut.hour - timeIn.hour) / 100
}

let wagesEarnedOnDate = function(employee, date) {
    let wage = hoursWorkedOnDate(employee, date)
        * employee.payPerHour
    return parseFloat(wage.toString())

}

let allWagesFor = function(employee) {
    let time = employee.timeInEvents.map(function(e){
        return e.date
    })
    let wages = time.reduce(function(timeCard, pay){
        return timeCard + wagesEarnedOnDate(employee, pay)
    }, 0)
    return wages
}

let findEmployeeByFirstName = function(person, firstName) {
    return person.find(function(record){
        return record.firstName === firstName
    })

}

let calculatePayroll = function(array) {
    return array.reduce(function(timeCard, record){
        return timeCard + allWagesFor(record)
    }, 0)
}