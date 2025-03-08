$(document).ready(function() {
    // Detect bell icon click
    $(document).on('click', '.bell-icon', function() {
        var pendingCount = $(this).data('pending');
        
        // Create a popup
        var popup = $('<div class="popup-box">')
            .text(pendingCount + ' approvals pending')
            .appendTo('body');
        
        // Show the popup near the bell icon
        popup.css({
            position: 'absolute',
            top: $(this).offset().top + 20,
            left: $(this).offset().left,
            padding: '10px',
            backgroundColor: '#f9f9f9',
            border: '1px solid #ccc',
            borderRadius: '5px'
        });

        // Close popup on click anywhere outside
        $(document).on('click', function(e) {
            if (!$(e.target).closest('.popup-box, .bell-icon').length) {
                $('.popup-box').remove();  // Remove the popup when clicking outside
            }
        });
    });
});


// for pop up through a icon/button
 

////////////////////////// -------------------- \\\\\\\\\\\\\\\\\\\\\\\\\\\\\
javascript:$s('P57_DET_ID','#PO_ID#');javascript:$s('P57_PO_DET_ID','#DET_ID#');
javascript:$s('P57_CATEGORY_ID','#CATEGORY_ID#');
javascript:$s('P57_PRODUCT_SIZE','#ITEM_NAME#');
javascript:$s('P57_PRODUCT_NAME','#ITEM_NAME#');
javascript:$s('P57_CATEGORY_NAME','#CATERGORY_NAME#');
openModal('TAX_ADD'); apex.region('TAX_ADD').refresh();

// to pass values to pop up page
