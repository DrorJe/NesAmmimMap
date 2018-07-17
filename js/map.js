var LOCATIONS_POS = {
    INDEX       : { value: 0, name: "Index" },
    AREA        : { value: 1, name: "Area" },
    LAT         : { value: 2, name: "Lattitude" },
    LNG         : { value: 3, name: "Longtitidue" },
    TITLE       : { value: 4, name: "Title" },
    FAMILY_NAME : { value: 5, name: "Family Name" },
    PARENTS     : { value: 6, name: "Parents" },
    CHILDREN    : { value: 7, name: "Children" },
    IMAGE       : { value: 8, name: "Image" },
    TEL         : { value: 9, name: "Telephone" }
};

var SOURCE = {
    MAP: { value: 1},
    FAMILY: { value: 2},
    AREA: { value: 3}
};


var nes_ammim_map_center = new google.maps.LatLng(32.965940, 35.120958);
var markers = [];
var map;
var infowindow = new google.maps.InfoWindow();
var marker, i;
var image = { url: 'http://maps.google.com/mapfiles/ms/icons/red-dot.png' };
var o_cmb_family = document.getElementById("cmb_family");
var o_cmb_area = document.getElementById("cmb_area");

//google map object + initial position
var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 17,
    center: nes_ammim_map_center,
    mapTypeId: google.maps.MapTypeId.HYBRID
});

//get locations

//set markers on map
for (i = 0; i < locations.length; i++) 
{
    //set marker properties
    marker = new google.maps.Marker({
        position: new google.maps.LatLng(locations[i][LOCATIONS_POS.LAT.value], locations[i][LOCATIONS_POS.LNG.value]),
        map: map,
        animation: google.maps.Animation.DROP,
        icon: image
    });
    //manage markers in array
    markers.push(marker);
    //add location index to marker
    marker.metadata = { "index": locations[i][LOCATIONS_POS.INDEX.value] };
    //add click event to marker
    google.maps.event.addListener(marker, 'click', (function (marker, i) 
                                                    {
                                                        return function () 
                                                                {
                                                                    infowindow.setContent(locations[i][LOCATIONS_POS.TITLE.value]);
                                                                    infowindow.open(map, marker);
                                                                    setTimeout('infowindow.close(map,marker)', '3000');
                                                                    ChangeLocation(SOURCE.MAP.value, locations[i][LOCATIONS_POS.INDEX.value]);
                                                                }
                                                     }
                                                    )(marker, i));
}


//initialize the families combo
for (i = 0; i < locations.length; i++) 
{
    var option = document.createElement("option");
    option.value = locations[i][LOCATIONS_POS.INDEX.value];
    option.text  = locations[i][LOCATIONS_POS.FAMILY_NAME.value];
    o_cmb_family.add(option);
}

//sort the families combo
sortList("cmb_family");

//initialize the areas combo
for (i = 0; i < locations.length; i++) {
    var option = document.createElement("option");
    option.value = locations[i][LOCATIONS_POS.INDEX.value];
    option.text = locations[i][LOCATIONS_POS.AREA.value];
    o_cmb_area.add(option);
}

//sort the areas combo
//sortList("cmb_area");
sortListOfNumbers("cmb_area");

//set default location
//o_cmb_family.getElementsByTagName('option')[0].selected = 'selected';
//doSomethingCombo(o_cmb_family);
o_cmb_area.getElementsByTagName('option')[0].selected = 'selected';
doSomethingComboArea(o_cmb_area);

function doSomethingCombo(o_combo) {
    //alert("index=" + o_combo.selectedIndex + " *** value=" + o_combo[o_combo.selectedIndex].value + " *** text=" + o_combo[o_combo.selectedIndex].text);
    ChangeLocation(SOURCE.FAMILY.value, o_combo[o_combo.selectedIndex].value);
}

function doSomethingComboArea(o_combo) {
    //alert("index=" + o_combo.selectedIndex + " *** value=" + o_combo[o_combo.selectedIndex].value + " *** text=" + o_combo[o_combo.selectedIndex].text);
    ChangeLocation(SOURCE.AREA.value, o_combo[o_combo.selectedIndex].value);
}

function ChangeLocation(n_src, n_family) 
{
    switch(n_src)
    {
        //Change is click on map
        case (SOURCE.MAP.value):
            SetComboByFamilyIndex(document.getElementById("cmb_family"), n_family);
            SetComboByFamilyIndex(document.getElementById("cmb_area"), n_family);
            break;
        //family combo changed
        case (SOURCE.FAMILY.value):
            SetComboByFamilyIndex(document.getElementById("cmb_area"), n_family);
            break;
        //area combo changed
        case (SOURCE.AREA.value):
            SetComboByFamilyIndex(document.getElementById("cmb_family"), n_family);
        default:
            break;
    }

    //refresh details - parent names
    var input_parents = document.getElementById('input_parents');
    input_parents.value = locations[n_family][LOCATIONS_POS.PARENTS.value];
    //refresh details - children
    var input_children = document.getElementById('input_children');
    input_children.value = locations[n_family][LOCATIONS_POS.CHILDREN.value];
    //refresh details - telephone
    var input_tel = document.getElementById('input_tel');
    input_tel.value = locations[n_family][LOCATIONS_POS.TEL.value];
    //refresh image
    var img_family = document.getElementById('img_family');
    img_family.src = "img/" + locations[n_family][LOCATIONS_POS.IMAGE.value];
    //change marker icon
    for (var j = 0; j < markers.length; j++)
        markers[j].setIcon('http://maps.google.com/mapfiles/ms/icons/red-dot.png');
    markers[n_family].setIcon('http://maps.google.com/mapfiles/ms/icons/green-dot.png');
}


