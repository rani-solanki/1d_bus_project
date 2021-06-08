const linereader = require("line-reader");
var tickets = {}
var seats = []

// read the test.txt file
linereader.eachLine('test.txt', function (line) {
    var data = line.split(" ")

    // Create the bus
    if (data[0] == "create_bus") {
        createBus(seats, Number(data[1]))
    }
    // create the tickets
    if (data[0] == "tickets_book") {
        console.log(ticketBook(tickets, data,seats))
    }
    if (data[0] == "cancel_tickets") {
        console.log(tickets_cancel(data,tickets))
    }
    if (data[0] == "status") {
        status ()
    }
})

// create the bus function 
function createBus(seats, noOfseats) {
    for (var i = 1; i <= noOfseats; i++) {
        seats.push(i)
    }
    console.log("bus_created")
}

// create the tickets function 
function ticketBook(tickets, data, seats) {
    var seat = data[1].split(",")
    for (var j = 0; j < seat.length; j++){
        if (Number(seat[j]) > seats.length) {
            return "these seats are not available in bus"
        }if(seat[j] in tickets) {
            return "seats are already book"
        }
    }
    for (var i = 0; i < seat.length; i++) {
        tickets[seat[i]] = data[2]
    }
    console.log("tickets book")
    return tickets
}

function tickets_cancel(data, tickets) {

    var seat = data[1].split(",")
    for (var j = 0; j < seat.length; j++) {
        if (!(seat[j] in tickets)) {
            return "this seat is not book yet"
        }
    }

    for (var i = 0; i < seat.length; i++) {
        if (!(data[2] == tickets[seat[i]])) {
            return "user is invalid"
        } else {
            delete tickets[seat[i]]
        }
    }
    return "tickets cancel"
}

function status() {
    console.log("S.No.      Staus ")
    for (var i = 0; i < seats.length; i++){
        if (seats[i] in tickets) {
            console.log(`${seats[i]}        booked`)
        }
        else {
            console.log(`${ seats[i]}       Not booked`)
        }
    }
}











