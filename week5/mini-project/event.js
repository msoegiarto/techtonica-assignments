class Event {
  constructor(name, description, date) {
    this.name = name;
    this.description = description;
    this.date = date;
    this.availableTickets = []
  }

  // method to add available tickets
  addAvailableTickets(ticketType, ticketPrice) {
    const ticket = new Tickets(ticketType, ticketPrice);
    this.availableTickets.push(ticket);
  }

  // method to search available tickets based on the price
  searchTickets(minPrice, maxPrice) {
    let result = `Eligible tickets: `;
    let counter = 0;
    for (let i = 0; i < this.availableTickets.length; i++) {
      const _ticket = this.availableTickets[i];
      if (minPrice <= _ticket.ticketPrice && maxPrice >= _ticket.ticketPrice) {
        counter++;
        result += `${counter}. ${_ticket.ticketType} ($${_ticket.ticketPrice})  `;
      }
    }

    if (counter === 0) result = `No tickets available`;

    return `${this.name} - ${this.description} - ${result}`;
  }

  getCheapestTicket() {
    let result = 0;
    for (let i = 0; i < this.availableTickets.length; i++) {
      const _ticket = this.availableTickets[i];
      
      if (i === 0) {
        result = _ticket.ticketPrice;
      } else {
        result = result > _ticket.ticketPrice ? _ticket.ticketPrice : result;
      }
    }
    return result === 0 ? 'Sold out' : `$${result}`;
  }
}

class Tickets {
  constructor(ticketType, ticketPrice) {
    this.ticketType = ticketType;
    this.ticketPrice = ticketPrice;
  }
}

// The below statement creates an object.
const event_obj1 = new Event("KLOS Golden Gala", "An evening with hollywood vampires", new Date('October 30, 2019'));
const event_obj2 = new Event("Skillet & Sevendust", "Victorious war tour", new Date('November 27, 2019'));
const event_obj3 = new Event("Jenny Lewis", "On the line tour 2019", new Date('December 17, 2019'));

// adding tickets
event_obj1.addAvailableTickets("human", 299);
event_obj1.addAvailableTickets("vampire", 99);
event_obj2.addAvailableTickets("General Admission", 25);
event_obj2.addAvailableTickets("Floor Seating", 80);
event_obj2.addAvailableTickets("Orchestra", 300);
event_obj2.addAvailableTickets("Mezzanine", 200);
event_obj2.addAvailableTickets("Balcony", 100);

const event_array = new Array();

// pushing multiple objects to an array at once
event_array.push(event_obj1, event_obj2, event_obj3);

// in order to check whether the elements are pushed, use console.log
console.log(event_array);

const displayEvent = (event, isSearch) => {
  let html = "";
  if (!isSearch) {
    $.each(event, function (index, item) {
      const _date = item.date.toString().substring(4,15);
      if (item.getCheapestTicket() === 'Sold out') {
        html += `<li>${item.name} - ${item.description} - ${_date} - ${item.getCheapestTicket()}</li>`;
      } else {
        html += `<li>${item.name} - ${item.description} - ${_date} - Starting from: ${item.getCheapestTicket()}</li>`;
      }
    });
  } else {
    $.each(event, function (index, item) {
      html += `<li>${item}</li>`;
    });
  }
  // insert final html into #event...
  $("#event").html(html);
}

$(document).ready(function () {

  displayEvent(event_array, false);

  // SEARCH related methods
  $('#search-ticket-button').click(function () {
    let minPrice = $('#min-price-input').val() ? $('#min-price-input').val() : '0';
    let maxPrice = $('#max-price-input').val() ? $('#max-price-input').val() : '1000';
    console.log('minPrice = ', minPrice, 'maxPrice = ', maxPrice);

    $('#min-price-input').css('border', '1px solid #ececec');
    if (!minPrice.match(/^[0-9]*$/)) {
      $('#min-price-input').css('border', '1px solid #ff0000');
      $('#min-price-input').val('');
      alert('PLease insert positive number');
      return false;
    }

    $('#max-price-input').css('border', '1px solid #ececec');
    if (!maxPrice.match(/^[0-9]*$/)) {
      $('#max-price-input').css('border', '1px solid #ff0000');
      $('#max-price-input').val('');
      alert('PLease insert positive number');
      return false;
    }

    const searchResults = [];
    const search1 = event_obj1.searchTickets(parseInt(minPrice), parseInt(maxPrice));
    const search2 = event_obj2.searchTickets(parseInt(minPrice), parseInt(maxPrice));
    const search3 = event_obj3.searchTickets(parseInt(minPrice), parseInt(maxPrice));
    // console.log('searchTickets1 = ', search1);
    // console.log('searchTickets2 = ', search2);
    // console.log('searchTickets3 = ', search3);
    searchResults.push(search1, search2, search3);

    displayEvent(searchResults, true);
  });


});
