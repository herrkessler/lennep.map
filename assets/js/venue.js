$(document).ready(function(){

  var venueWrapper = $('#venue-container');
  var filterWrapper = $('#venue-filter-bar');
  var filterButton = $('.show-filter-link');
  var listToggleButton = $('.show-list-link');

  $(window).resize(function() {
    var viewportWidth = $(window).width(),
        viewportHeight = $(window).height();

    if (viewportWidth < 480) {
      listToggleButton.show();
    } else {
      listToggleButton.hide();
    }

  });

  filterButton.click(function(event){
    event.preventDefault();
    if (filterWrapper.hasClass('active')) {
      filterWrapper.removeClass('active');
    } else {
      filterWrapper.addClass('active');
    }
  });

  listToggleButton.click(function(event){
    event.preventDefault();
    if (venueWrapper.hasClass('active')) {
      venueWrapper.removeClass('active');
      $(this).find('i').removeClass('fa-map-marker').addClass('fa-list');
    } else {
      venueWrapper.addClass('active');
      $(this).find('i').removeClass('fa-list').addClass('fa-map-marker');
    }
  });
  
});