// Build the URL as before
var appId     = $v('pFlowId');
var sessionId = $v('pInstance');
var reportUrl = window.location.origin
  + "/pls/apex/f?p=" + appId
  + ":0:" + sessionId
  + ":PRINT_REPORT=KITCHEN__INVOICE";

// Option A: Open in a new tab/window
window.open(reportUrl, '_blank');

// Option B: Redirect current window
// window.location.href = reportUrl;

// Option C: Load into an iframe and show a dialog region automatically
/*
document.getElementById("print_report_iframe").src = reportUrl;
apex.region("print_report_dialog_1").show();
*/
