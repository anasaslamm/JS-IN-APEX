var fileInput = document.getElementById('P5_IMAGE'); // Replace with your file upload item ID

if (fileInput.files.length > 0) {
  var file = fileInput.files[0];
  var fileName = file.name;
  var fileType = fileName.split('.').pop().toLowerCase();

  apex.item('P5_FILE_NAME').setValue(fileName); // Replace with your hidden item name for file name
  apex.item('P5_FILE_TYPE').setValue(fileType); // Replace with your hidden item name for file type

  // Fetch MIME type using FileReader API
  var fileReader = new FileReader();
  fileReader.onload = function() {
    var arrayBuffer = this.result;
    var uint8Array = new Uint8Array(arrayBuffer);
    var blob = new Blob([uint8Array], { type: file.type });
    var mimeType = blob.type;
    
    apex.item('P5_MIME_TYPE').setValue(mimeType); // Replace with your hidden item name for MIME type
  };
  fileReader.readAsArrayBuffer(file);
}
