$(document).ready(function() {
   $('#P235_CONTACT_NUMBER').keyup(function() {
      var phoneNo = $(this).val().replace(/-/g, ''); // Remove existing hyphens
      if (phoneNo.length > 4) {
         phoneNo = phoneNo.slice(0, 4) + '-' + phoneNo.slice(4); // Add hyphen after 4 digits
      }
      $(this).val(phoneNo);
   });
});


function restrictNumericInput() {
    document.querySelectorAll('.only-numeric').forEach(function(element) {
        element.addEventListener('input', function(e) {
            e.target.value = e.target.value.replace(/[^0-9]/g, '');
        });
    });
}

document.addEventListener('DOMContentLoaded', restrictNumericInput);
