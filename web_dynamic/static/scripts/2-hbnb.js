/*
 * Must use jQuery
 * If the checkbox is checked, store the Amenity ID in a variable (dictionary or list)
 * If unchecked, remove the Amenity ID from the variable
 * If in the status is “OK”, add the class available to the div#api_status
 * Otherwise, remove the class available to the div#api_status
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

  $.ajax({
    url: 'http://localhost:5001/api/v1/status/',
    method: 'GET',
    dataType: 'json'
  })
  .done(function () {
    $('#api_status').addClass('available')
  })
  .fail(function () {
    $('#api_status').removeClass('available')
  })
  .always(function () {
    console.log("API check is complete!");
  });
});
