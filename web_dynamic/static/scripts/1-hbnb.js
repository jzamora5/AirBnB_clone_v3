/*
 * Must use jQuery
 * If the checkbox is checked, store the Amenity ID in a variable (dictionary or list)
 * if unchecked, remove the Amenity ID from the variable
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
});
