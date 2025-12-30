/*
 * Must use jQuery
 * If the checkbox is checked, store the Amenity ID in a variable (dictionary or list)
 * If unchecked, remove the Amenity ID from the variable
 * If in the status is “OK”, add the class available to the div#api_status
 * Otherwise, remove the class available to the div#api_status
 * Send a POST request with an empty dictionary in the body
 * Loop into result and create an article tag representing a Place in the section.places
 */
$(function () {
  const checkBox = $('input[type="checkbox"]').css('margin-right', '10px');

  let amenitiesList = [];

  $(checkBox).on('change', function () {
    const name = $(this).data('name');

    if (this.checked) {
      amenitiesList.push(name);
      if (amenitiesList.length) {
        $('.amenities h4').text(`${amenitiesList.join(', ')}`);
      } else {
        $('.amenities h4').text('Amenities');
      }
    } else {
      amenitiesList = amenitiesList.filter(item => item !== name);
    }
  });

  /*---- Places are now loaded from the frontend not from the backend ----*/
  $.ajax({
    url: 'http://localhost:5001/api/v1/places_search/',
    method: 'POST',
    contentType: 'application/json',
    dataType: 'json',
    data: JSON.stringify({}),
    success: function(response) {
      console.log(response.length)
      response.forEach(function(place) {
        $('<article>')
          .html(`
            <div class="title_box">
              <h2>${place.name}</h2>
              <div class="price_by_night">${'$' + place.price_by_night}</div>
            </div>
            <div class="information">
              <div class="max_guest">${place.max_guest} Guest(s)</div>
              <div class="number_rooms">${place.number_rooms} Bedroom(s)</div>
              <div class="number_bathrooms">
                ${place.number_bathrooms} Bathroom(s)
              </div>
            </div>
            <div class="description">${place.description}</div>
          `)
          .appendTo('section.places')
      });
    }
  })
  .done(function() {
    return $.ajax({
      url: 'http://localhost:5001/api/v1/status/',
      method: 'GET',
      dataType: 'json'
    })
    .done(function () {
      $('#api_status').addClass('available')
    })
    .fail(function () {
      $('#api_status').removeClass('available');
    })
    .always(function () {
      console.log("API check is complete!");
    })
  })
});
