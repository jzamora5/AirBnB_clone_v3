/*
 * Must use jQuery
 * If the checkbox is checked, store the Amenity ID in a variable (dictionary or list)
 * If unchecked, remove the Amenity ID from the variable
 * If in the status is “OK”, add the class available to the div#api_status
 * Otherwise, remove the class available to the div#api_status
 * Send a POST request with an empty dictionary in the body
 * Loop into result and create an article tag representing a Place in the section.places
 * When the <button> is clicked, a new POST request to places_search should be made with
   the list of Amenities checked
 */
$(function () {
  const checkBox = $('input[type="checkbox"]').css('margin-right', '10px');

  let amenityIds = {'amenities': []}
  let amenityNames = []

  $(checkBox).on('change', function () {
    const id = $(this).data('id');
    const name = $(this).data('name');

    if ($(this).is(':checked')) {

      amenityIds.amenities.push(id);
      amenityNames.push(name);

      if (amenityNames.length) {
        $('.amenities h4').text(`${amenityNames.join(', ')}`);
      } else {
        $('.amenities h4').text('Amenities');
      }
    } else {
      amenityNames = amenityNames.filter(item => item !== name);
      amenityIds.amenities = amenityIds.amenities.filter(item => item !== id);
    }
  });

  $('button[type="button"]').on('click', async function () {
    try {
      await $.ajax({
        url: 'http://localhost:5001/api/v1/places_search/',
        method: 'POST',
        contentType: 'application/json',
        dataType: 'json',
        data: JSON.stringify(amenityIds),
        success: function(response) {
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
          /*______Debugging line_____*/
          console.log(response.length)
          /*_________________________*/
        }
      });

      await $.ajax({
        url: 'http://localhost:5001/api/v1/status/',
        method: 'GET',
        dataType: 'json',
      });

      $('#api_status').addClass('available');

    } catch (error) {
      console.error('Something went wrong:', error.statusText);
      $('#api_status').removeClass('available');
    }
  })
});
