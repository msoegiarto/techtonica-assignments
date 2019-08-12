$(document).ready(function () {
  // SIDEBAR
  $("#sidebar").mCustomScrollbar({
    theme: "minimal"
  });

  $('#sidebarCollapse').on('click', function () {
    $('#sidebar, #content').toggleClass('active');
    $('.collapse.in').toggleClass('in');
    $('a[aria-expanded=true]').attr('aria-expanded', 'false');
  });

});

const displayEventTable = events => {
  $('#table-body').empty();
  // console.log('eventRecommender from displayTbl = ', events);
  if (!events || events.length === 0) {
    const tr = $('<tr></tr>');
    const td1 = $('<td></td>').attr({ colspan: 6 }).text('There is no event');
    const html = tr.append(td1);
    $("#table-body").append(html);
  } else {
    $.each(events, function (index, item) {
      const tr = $('<tr></tr>').attr({ id: index });
      const th = $('<th></th>').attr({ scope: 'row' }).text(index + 1);
      const td1 = $('<td></td>').text(item.eventName);
      const td2 = $('<td></td>').text(item.eventDescription);
      const td3 = $('<td></td>').text(item.eventDate.toString().substring(4, 15));
      const td4 = $('<td></td>').text(item.eventDate.toString().substring(16, 24));
      const td5 = $('<td></td>').append(`<button type="button" class="btn btn-outline-secondary event-del-btn">Delete</button>`);
      const html = tr.append(th, td1, td2, td3, td4, td5);
      $("#table-body").append(html);
    });
  }
}

const validateEventInput = (eventName, eventDescription, eventDate) => {
  $('#inputEventName').removeClass('is-invalid');
  $('#inputEventDescription').removeClass('is-invalid');
  $('#inputEventDate').removeClass('is-invalid');
  // console.log(eventName, eventDescription, eventDate);

  if (!eventName || !eventDescription || !eventDate) {
    if (!eventName) $('#inputEventName').addClass('is-invalid');
    if (!eventDescription) $('#inputEventDescription').addClass('is-invalid');
    if (!eventDate) $('#inputEventDate').addClass('is-invalid');
    return false;
  }
  return true;
}

const displayUserTable = eventRecommender => {
  $('#table-body').empty();
  if (!eventRecommender.users || eventRecommender.users.length === 0) {
    const tr = $('<tr></tr>');
    const td1 = $('<td></td>').attr({ colspan: 5 }).text('There is no user');
    const html = tr.append(td1);
    $("#table-body").append(html);
  } else {
    $.each(eventRecommender.users, function (index, item) {
      const tr = $('<tr></tr>').attr({ id: index });
      const th = $('<th></th>').attr({ scope: 'row' }).text(index + 1);
      const a = $('<a></a>').attr({ href: '#', 'data-toggle': 'modal', 'data-target': '#modal' + index }).css('color', '#0000ff').text(item.username);
      const td1 = $('<td></td>').append(a);
      const td2 = $('<td></td>').text(item.lastName);
      const td3 = $('<td></td>').text(item.firstName);
      const td4 = $('<td></td>').append(`<button type="button" class="btn btn-outline-secondary user-del-btn">Delete</button>`);
      const html = tr.append(th, td1, td2, td3, td4);
      $("#table-body").append(html);

      // the modal
      const modalDiv = $('<div></div>').attr({ id: 'modal' + index, tabindex: '-1', role: 'dialog' }).addClass('modal fade');
      const modalDialog = $('<div></div>').addClass('modal-dialog').attr({ role: 'document' });
      const modalContent = $('<div></div>').addClass('modal-content');
      const modalHeader = $('<div></div>').addClass('modal-header').append(`<h5 class="modal-title">${item.username}'s Events</h5>`);
      modalHeader.append('<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>');
      const modalBody = $('<div><div>').addClass('modal-body');
      const modalBodyContent = getModalBodyContent(item);
      modalBody.append(modalBodyContent);
      const modalFooter = $('<div></div>').addClass('modal-footer').append('<button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>');
      modalContent.append(modalHeader, modalBody, modalFooter);
      modalDialog.append(modalContent);
      const modalHtml = modalDiv.append(modalDialog);
      $('#content').append(modalHtml);
    });
  }
}

const getModalBodyContent = user => {
  const table = $('<table></table>').addClass('table table-striped');
  const thead = $('<thead></thead>');
  const theadContents = $('<tr></tr>');
  const theadContent1 = $('<th></th>').css('width', '10%').text('#');
  const theadContent2 = $('<th></th>').css('width', '50%').text('Event Name');
  const theadContent3 = $('<th></th>').css('width', '40%').text('Event Date');
  theadContents.append(theadContent1, theadContent2, theadContent3);
  thead.append(theadContents);
  const tbody = $('<tbody></tbody>');

  $.each(user.savedEvents, function (index2, item2) {
    const tr = $('<tr></tr>');
    const td1 = $('<td></td>').text(`${index2 + 1}`);
    const td2 = $('<td></td>').text(`${item2.eventName}`);
    const td3 = $('<td></td>').text(`${item2.eventDate}`);
    tr.append(td1, td2, td3);
    tbody.append(tr);
  });

  return table.append(thead, tbody);
}

const validateUserInput = (username, lastName, firstName) => {
  $('#inputUsername').removeClass('is-invalid');
  $('#inputLastName').removeClass('is-invalid');
  $('#inputFirstName').removeClass('is-invalid');
  // console.log(username, firstName, lastName);

  if (!username || !lastName || !firstName) {
    if (!username) $('#inputUsername').addClass('is-invalid');
    if (!lastName) $('#inputLastName').addClass('is-invalid');
    if (!firstName) $('#inputFirstName').addClass('is-invalid');
    return false;
  }
  return true;
}