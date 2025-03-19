var model = apex.region("LINEID").widget().interactiveGrid("getViews", "grid").model; // LINEID is the static id of Interactive Grid
var n_dist_amount, n_total = 0;
var col_gl_amount = model.getFieldKey("RATE");  // BILL_PAYMENT is the column Of INTERACTIVE GRID
model.forEach(function(igrow)
       {
               
               n_dist_amount = parseInt(igrow[col_gl_amount], 10);
               if (!isNaN(n_dist_amount)) {
                         n_total += n_dist_amount;
          }
  } 
      );
     
console.log(n_total);

$s('P6_AMOUNT', n_total);        // 'P175_BILL' is the item where we will display the sum of bill_payment


// This takes all values in same column and send sum to a page item

// RATE is column name of grid
// P6_AMOUNT item name where data needs to send
