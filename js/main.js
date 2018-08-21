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
    'id': 115,
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
const makeListItem = (dataId, cssClass, title, info) => {
    let listItem = `                
    <li data-id="${dataId}" class="places-item ${cssClass}">
        <h3 data-id="${dataId}">${title}</h3>
        <p data-id="${dataId}">${info}</p>
        <svg class="icon delete" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
        viewBox="0 0 512 512" style="enable-background:new 0 0 512 512;" xml:space="preserve">
                <g>
                    <g>
                        <g>
                            <polygon class="fill-color" points="353.574,176.526 313.496,175.056 304.807,412.34 344.885,413.804 			"/>
                            <rect class="fill-color" x="235.948" y="175.791" width="40.104" height="237.285"/>
                            <polygon class="fill-color" points="207.186,412.334 198.497,175.049 158.419,176.52 167.109,413.804 			"/>
                            <path class="fill-color" d="M17.379,76.867v40.104h41.789L92.32,493.706C93.229,504.059,101.899,512,112.292,512h286.74
                            c10.394,0,19.07-7.947,19.972-18.301l33.153-376.728h42.464V76.867H17.379z M380.665,471.896H130.654L99.426,116.971h312.474
                            L380.665,471.896z"/>
                        </g>
                    </g>
                </g>
            <g>
                <g>
                    <path class="fill-color" d="M321.504,0H190.496c-18.428,0-33.42,14.992-33.42,33.42v63.499h40.104V40.104h117.64v56.815h40.104V33.42
                C354.924,14.992,339.932,0,321.504,0z"/>
                </g>
            </g>
        </svg>
        <div class="icon delete divDelete">
        </div>

    
        <svg class="icon edit" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
        width="528.899px" height="528.899px" viewBox="0 0 528.899 528.899" style="enable-background:new 0 0 528.899 528.899;"
        xml:space="preserve">
            <g>
                <path class="fill-color" d="M328.883,89.125l107.59,107.589l-272.34,272.34L56.604,361.465L328.883,89.125z M518.113,63.177l-47.981-47.981
            c-18.543-18.543-48.653-18.543-67.259,0l-45.961,45.961l107.59,107.59l53.611-53.611
            C532.495,100.753,532.495,77.559,518.113,63.177z M0.3,512.69c-1.958,8.812,5.998,16.708,14.811,14.565l119.891-29.069
            L27.473,390.597L0.3,512.69z"/>
            </g>
        </svg>
        <div class="icon edit divEdit">
        </div>
    </li>
    `;
    $($list).append(listItem);
};

// Hide #list-header-p when places exist
if (arrData.length > 0) {
    $($p).hide();
}

// Click event to DELETE item and marker
$('.places-list').on('click', '.divDelete', (e) => {
    let icon = e.target;
    let id = $(icon).parent().attr('data-id');
    
    $(icon).parent().remove();
    $('#'+id).remove();

    delete markers[id];

    let arrIndex = arrData.findIndex(x => x.id === parseInt(id));

    arrData.splice(arrIndex,1);

    mymap.closePopup()
})

// Click event to EDIT item and marker
$('.places-list').on('click', '.divEdit', (e) => {
    let icon = e.target;
    let id = $(icon).parent().attr('data-id');
    console.log(id);
})

// Get marker ID and select correspondent list item
$('.map').on('click', '.leaflet-marker-icon', (e) => {
    // Use the event to find the clicked element
    const el = $(e.srcElement || e.target),
        id = el.attr('id');
 
        $('.places-item').removeClass('selected');
        $('li[data-id="'+id+'"]').addClass('selected'); 

        mymap.panTo(markers[id].getLatLng());
 });

// Get list item DATA-ID and select correspondent marker and open popup
$('.places-list').on('click', '.places-item', (e) => {
    const el = $(e.srcElement || e.target),
    id = $(el).attr('data-id');
    console.log(id);
    $('.places-item').removeClass('selected');
    $('li[data-id="'+id+'"]').addClass('selected');

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
        let dataId = place.id;

        if (place === arrData[0]) {
            cssClass = "selected";
            markers[place.id].openPopup();
            
        } else {
            cssClass = "";
        }
        
        makeListItem(dataId, cssClass, place.title, place.info)

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

