// To send id to any page item
// Check if the clicked element is a "Disable" span
if (!event.target.classList.contains('disable-action')) return;

// Get the clicked row ID
var reqId = $(event.target).data('row-id');

// Get TR_ID from data attribute
var rowId = event.target.dataset.rowId;

// Set value in hidden item
apex.item("P658_INVOICE_NO").setValue(reqId);
