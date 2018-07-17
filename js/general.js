//this function is used to sort the items in the combo by text
function sortList(s_combo_id) {
    var lb = document.getElementById(s_combo_id);
    arrTexts = new Array();
    arrValues = new Array();
    arrOldTexts = new Array();

    for (i = 0; i < lb.length; i++) {
        arrTexts[i] = lb.options[i].text;
        arrValues[i] = lb.options[i].value;
        arrOldTexts[i] = lb.options[i].text;
    }

    arrTexts.sort();

    for (i = 0; i < lb.length; i++) {
        lb.options[i].text = arrTexts[i];
        for (j = 0; j < lb.length; j++) {
            if (arrTexts[i] == arrOldTexts[j]) {
                lb.options[i].value = arrValues[j];
                j = lb.length;
            }
        }
    }
}


//this function is used to sort the items in the combo by numbers
function sortListOfNumbers(s_combo_id) {
    var lb = document.getElementById(s_combo_id);
    arrTexts = new Array();
    arrValues = new Array();
    arrOldTexts = new Array();

    for (i = 0; i < lb.length; i++) {
        arrTexts[i] = lb.options[i].text;
        arrValues[i] = lb.options[i].value;
        arrOldTexts[i] = lb.options[i].text;
    }

    arrTexts.sort(function(a,b) { return a - b; });

    for (i = 0; i < lb.length; i++) {
        lb.options[i].text = arrTexts[i];
        for (j = 0; j < lb.length; j++) {
            if (arrTexts[i] == arrOldTexts[j]) {
                lb.options[i].value = arrValues[j];
                j = lb.length;
            }
        }
    }
}


//this function is used to set combo according to a given family index
//parameters:   o_cmb - combo object
//              n_family - given family index
function SetComboByFamilyIndex(o_cmb, n_family) 
{
    //loop over combo options and find the matching entry to n_family
    for (var i = 0; i < o_cmb.length; i++) {
        if (n_family == o_cmb[i].value)
            o_cmb.selectedIndex = i;
    }

}