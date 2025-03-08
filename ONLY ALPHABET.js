var textArea = document.getElementById('P73_REMARKS');
textArea.addEventListener('input', function() {
    textArea.value = textArea.value.replace(/[^a-zA-Z\s]/g, '').toUpperCase();
});


// place it in dynamic action of text feild
