// ==========================================================================
// ARRAY OF DATA FROM SERVER
// ==========================================================================

let arrData = [
    {
    'id': 0,
    'title': 'Marker One',
    'info': 'I am the popup one.',
    'lat': 51.5,
    'lang': -0.09 
    },
    {
    'id': 1,
    'title': 'Marker Two',
    'info': 'I am the popup two.',
    'lat': 51.5,
    'lang': -0.08 
    },
    {
    'id': 2,
    'title': 'Marker Three',
    'info': 'I am the popup three.',
    'lat': 51.5,
    'lang': -0.07
    }
];


// ==========================================================================
// OBJECT TO SAVE MARKERS
// ==========================================================================

let markers = {};


// ==========================================================================
// VARIABLES
// ==========================================================================

let mapLat = arrData[0].lat; /************* para ver mais tarde */
let mapLong = arrData[0].lang; /*********** para ver mais tarde */

const $p = $('#list-header-p');
const $list = $('.places-list');

let markersCount = 0;


// ==========================================================================
// FUNCTIONS
// ==========================================================================

// Build list item with title and info
const makeListItem = (cssId, cssClass, title, info) => {
    let listItem = `                
    <li id="${cssId}" class="places-item ${cssClass}">
        <h3 id="${cssId}">${title}</h3>
        <p id="${cssId}">${info}</p>
    </li>
    `;
    $($list).append(listItem);
};

// Hide #list-header-p when places exist
if (arrData.length > 0) {
    $($p).hide();
}

// Get marker ID and select correspondent list item
$('.map').on('click', '.leaflet-marker-icon', function(e) {
    // Use the event to find the clicked element
    const el = $(e.srcElement || e.target),
        id = el.attr('id');
 
        $('.places-item').removeClass('selected');
        $('#' + id + '.places-item').addClass('selected');

        mymap.panTo(markers[id].getLatLng());
 });

// Get list item ID and select correspondent marker and open popup
$('.places-list').on('click', '.places-item', function(e) {
    const el = $(e.srcElement || e.target),
    id = $(el).attr('id');

    $('.places-item').removeClass('selected');
    $('#' + id + '.places-item').addClass('selected');

    mymap.panTo(markers[id].getLatLng());
    markers[id].openPopup();
});

// ==========================================================================
// MAP INIT
// ==========================================================================

let mymap = L.map('map-1').setView([mapLat, mapLong], 13);

L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
    maxZoom: 18,
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
        '<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
        'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    id: 'mapbox.streets'
}).addTo(mymap);


// ==========================================================================
// MARKERS INIT WITH CONTENT
// ==========================================================================

arrData.forEach((place) => {
    if (arrData.length > 0) {

        markers[place.id] = L.marker([place.lat, place.lang],
            {
            bounceOnAdd: true
            }
        )
        .addTo(mymap)
        .bindPopup(`<b>${place.title}</b><br>${place.info}`);

        markers[place.id]._icon.id = place.id;

        let cssClass;

        if (place === arrData[0]) {
            cssClass = "selected";
            markers[place.id].openPopup();
            
        } else {
            cssClass = "";
        }
        
        makeListItem(place.id, cssClass, place.title, place.info)

        markersCount += 1;
    }
});

        // let marker = L.marker([place.lat, place.lang],
        //     {
        //     bounceOnAdd: true
        //     }
        // )
        // .addTo(mymap)
        // .bindPopup(`<b>${place.title}</b><br>${place.info}`);


// mymap.on('popupopen', (e) => {
//     const popUpContent = e.popup._content;
//     console.log(popUpContent);
//     p.innerHTML = popUpContent;
// });

// mymap.on('popupclose', (e) => {
//     p.innerHTML = 'dasfasdfds';
// });

// marker.bounce({duration: 1000, height: 200}, function(){console.log("done")});

// function onMarkerClick(e) {
//    L.popup()
//     .setContent('dasda')
//     .openOn(map);

//     // console.log('test');
//     // L.popup().openOn(mymap);
//     // var content = e.target.getContent();
 
//     // console.log(content);
// }

// mymap.on('click', onMarkerClick);


// ==========================================================================
// POP UP INIT
// ==========================================================================

// const popup = L.popup();

// function onMapClick(e) {
//     popup
//         .setLatLng(e.latlng)
//         .setContent("You clicked the map at " + e.latlng.toString())
//         .openOn(mymap);
// }

// mymap.on('click', onMapClick);

