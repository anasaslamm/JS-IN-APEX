var itemValue = apex.item("P57_SELECT_TAX_POLICY").getValue();
if (itemValue == null || itemValue.trim() === '') {
    apex.message.alert("Please Select Tax Policy First!");    
    return false;
} else {
    return true;
}

// to show pop up on bases of page item (LOV or any thing)
