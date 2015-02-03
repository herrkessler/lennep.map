$(document).ready(function(){

  var closeModal = $('#modal-close-button');
  var modal = $('#modal');

  closeModal.click(function(event){
    event.preventDefault();
    modal.removeClass('active');
  });

  
});
