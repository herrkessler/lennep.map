$(document).ready(function(){

  // Main Menu

  var mobileLink = $('#mobile-icon'),
      mobileNav = $('#mobile-navigation-wrapper');

  mobileLink.on('click', function(){
    if ($(this).hasClass('active')) {
      $(this).removeClass('active');
      mobileNav.removeClass('active');

    } else {
      $(this).addClass('active');
      mobileNav.addClass('active');
    }
  });

});