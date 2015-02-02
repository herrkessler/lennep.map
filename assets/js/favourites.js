$(document).ready(function(){
  var sessionUserID = $('body').data('user');

  if (sessionUserID != "sessionlessUser") {

    $('.card-favourite').on('click', function(event){
      var venueID = $(this).closest('.card').data('venue') ;
      if ($(this).closest('.card').hasClass('favourite')) {
        io.socket.get('/user/'+sessionUserID+'/venuesList/remove/' + venueID, function (removeFav) {
          $(this).closest('.card').removeClass('favourite');
        });
      } else {
        io.socket.get('/user/'+sessionUserID+'/venuesList/add/' + venueID, function (addFav) {
          $(this).closest('.card').addClass('favourite');
        });
      }
    });

  } else {

    if (typeof $.cookie('favourites') === 'undefined'){
     $.cookie('favourites', '', { expires: 2 });
    } else {
      var venueList = $.cookie('favourites').split(/,/);
      $('.card').each(function(){
        if ($.inArray($(this).data('venue'),venueList) != -1) {
          $(this).addClass('favourite');
        }
      });
    }

    $('.card-favourite').on('click', function(event){
      var venueID = $(this).closest('.card').data('venue') ;
      var venueList = $.cookie('favourites').split(/,/);

      if ($(this).closest('.card').hasClass('favourite')) {
        venueList = jQuery.grep(venueList, function(value) {
          return value != venueID;
        });
        $.cookie('favourites', venueList);
        $(this).closest('.card').removeClass('favourite');
      }
      else {
        venueList.push(venueID);
        $.cookie('favourites', venueList);
        $(this).closest('.card').addClass('favourite');
      }
    });
  }
});