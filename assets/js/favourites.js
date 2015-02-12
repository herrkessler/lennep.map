$(document).ready(function(){

  var sessionUserID = $('body').data('user');
  var modal = $('#modal');
  var modalAccountCancel = $('#cancel-account-button');
  var clickedCard = '';
  var favCounter = $('.fav-counter');
  var mobileFavCounter = $('.mobile-fav-counter');
  var favouritesLink = $('.favourites-link-js');

  if (sessionUserID != "sessionlessUser") {

    var hasFavourites = favCounter.text();

    if (hasFavourites === "") {
      favCounter.hide();
      mobileFavCounter.hide();
    }

    $('.card-favourite').on('click', function(event){

      var venueID = $(this).closest('.card').data('venue') ;

      if ($(this).closest('.card').hasClass('favourite')) {

        $(this).closest('.card').removeClass('favourite');
        io.socket.get('/user/'+sessionUserID+'/venuesList/remove/' + venueID, function (removeFav) {
          if (favCounter.text() === '1') {
            favCounter.hide().text("");
            mobileFavCounter.hide().text("");
          } else {
            var initialCount = favCounter.text();
            favCounter.text(parseInt(initialCount)-1);
            mobileFavCounter.text(parseInt(initialCount)-1);
          }
        });

      } else {
        $(this).closest('.card').addClass('favourite');

        io.socket.get('/user/'+sessionUserID+'/venuesList/add/' + venueID, function (addFav) {

          if (favCounter.text() === "") {
            favCounter.show();
            mobileFavCounter.show();
            favCounter.text(1);
            mobileFavCounter.text(1);

          } else {
            var initialCount = favCounter.text();
            favCounter.text(parseInt(initialCount)+1);
            mobileFavCounter.text(parseInt(initialCount)+1);
          }
        });
      }
    });

  } else {

    if ($.cookie('favourites') === undefined){
     $.cookie('favourites', '', { expires: 2 });
     favCounter.hide();
     mobileFavCounter.hide();
    } else {
      var venueList = $.cookie('favourites').split(/,/);
      $('.card').each(function(){
        if ($.inArray($(this).data('venue'),venueList) != -1) {
          $(this).addClass('favourite');
        }
      });
      favCounter.text(venueList.length-1);
      mobileFavCounter.text(venueList.length-1);
    }

    $('.card-favourite').on('click', function(event){

      var venueID = $(this).closest('.card').data('venue') ;
      var venueList = $.cookie('favourites').split(/,/);

      if ($.cookie('favourites') !== "") {

        if ($(this).closest('.card').hasClass('favourite')) {
          venueList = jQuery.grep(venueList, function(value) {
            return value != venueID;
          });
          $.cookie('favourites', venueList);
          $(this).closest('.card').removeClass('favourite');
          if (favCounter.text() == '1') {
            favCounter.hide();
            mobileFavCounter.hide();
          } else {
            favCounter.text(venueList.length-1);
            mobileFavCounter.text(venueList.length-1);
          }
        }
        else {
          venueList.push(venueID);
          $.cookie('favourites', venueList);
          $(this).closest('.card').addClass('favourite');
          favCounter.show();
          mobileFavCounter.show();
          favCounter.text(venueList.length-1);
          mobileFavCounter.text(venueList.length-1);
        }

      } else {
        modal.addClass('active');
        clickedCard = $(this);
      }

      
    });
    
    favouritesLink.on('click', function(event) {
      event.preventDefault();
      var favs = $.cookie('favourites');
      var host = window.location.host;
      var newUrl = 'http://'+host+'/favourites/?favs='+favs;
      window.location.assign(newUrl);
    });
  }

  modalAccountCancel.on('click', function(){

    var venueID = clickedCard.closest('.card').data('venue') ;
    var venueList = $.cookie('favourites').split(/,/);

    venueList.push(venueID);
    $.cookie('favourites', venueList);
    clickedCard.closest('.card').addClass('favourite');
    modal.removeClass('active');
    favCounter.show();
    mobileFavCounter.show();
    favCounter.text(venueList.length-1);
    mobileFavCounter.text(venueList.length-1);

  });

});