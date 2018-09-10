// ==========================================================================
// ARRAY OF DATA FROM SERVER
// ==========================================================================

let arrData = [
    {
    'id': 40,
    'title': "I'm a marker",
    'info': "Nice to meet you!",
    'lat': 51.5,
    'lang': -0.09
    },
    {
    'id': 44,
    'title': "You can edit my title",
    'info': "And description.",
    'lat': 51.5,
    'lang': -0.08
    },
    {
    'id': 46,
    'title': "Reorder?",
    'info': "It's easy, just drag me.",
    'lat': 51.5,
    'lang': -0.07
    },
    {
    'id': 48,
    'title': "Don't like me?",
    'info': "You can delete me. :(",
    'lat': 51.5,
    'lang': -0.06
    }
];


// ==========================================================================
// OBJECT TO SAVE MARKERS
// ==========================================================================

let markers = {};


// ==========================================================================
// VARIABLES
// ==========================================================================

const mapLat = arrData[0].lat; /************* para ver mais tarde */
const mapLong = arrData[0].lang; /*********** para ver mais tarde */

const $p = $('#list-header-p');
const $list = $('.places-list');

const sortableList = document.querySelector('.places-list');
const sortable = Sortable.create(sortableList);


// ==========================================================================
// MAP INIT
// ==========================================================================

const mymap = L.map('map-1').setView([mapLat, mapLong], 13);

L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
    maxZoom: 18,
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
        '<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
        'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    id: 'mapbox.streets'
}).addTo(mymap);


// ==========================================================================
// FUNCTIONS
// ==========================================================================

// Build list item with title and info
const makeListItem = (dataId, cssClass, title, info) => {
    const listItem = `                
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

        <svg version="1.1" class="icon drag" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
	 width="459px" height="459px" viewBox="0 0 459 459" style="enable-background:new 0 0 459 459;" xml:space="preserve">
        <g>
            <g id="swap-vert" class="fill-color">
                <path d="M331.5,357V178.5h-51V357H204l102,102l102-102H331.5z M153,0L51,102h76.5v178.5h51V102H255L153,0z"/>
            </g>
        </g>
        <g>
        </g>
        <g>
        </g>
        <g>
        </g>
        <g>
        </g>
        <g>
        </g>
        <g>
        </g>
        <g>
        </g>
        <g>
        </g>
        <g>
        </g>
        <g>
        </g>
        <g>
        </g>
        <g>
        </g>
        <g>
        </g>
        <g>
        </g>
        <g>
        </g>
        </svg>
        <div class="icon drag divDrag">
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

        <svg class="icon check" version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 26 26" xmlns:xlink="http://www.w3.org/1999/xlink" enable-background="new 0 0 26 26">
            <path class="fill-color" d="m.3,14c-0.2-0.2-0.3-0.5-0.3-0.7s0.1-0.5 0.3-0.7l1.4-1.4c0.4-0.4 1-0.4 1.4,0l.1,.1 5.5,5.9c0.2,0.2 0.5,0.2 0.7,0l13.4-13.9h0.1v-8.88178e-16c0.4-0.4 1-0.4 1.4,0l1.4,1.4c0.4,0.4 0.4,1 0,1.4l0,0-16,16.6c-0.2,0.2-0.4,0.3-0.7,0.3-0.3,0-0.5-0.1-0.7-0.3l-7.8-8.4-.2-.3z"/>
        </svg>
        <div class="icon check divCheck">
        </div>
    </li>
    `;
    $($list).append(listItem);
};


// Hide #list-header-p when places exist
const arrDataLength = () => {
    if (arrData.length > 0) {
        $($p).hide();
    } else {
        $($p).show();
    }
};


// ==========================================================================
// EVENTS
// ==========================================================================

// Click event to DELETE item and marker
$('.places-list').on('click', '.divDelete', (e) => {
    const iconDelete = e.target;
    const id = $(iconDelete).parent().attr('data-id');
    
    $(iconDelete).parent().remove();
    $('#'+id).remove();
    mymap.removeLayer(markers[id]);

    mymap.closePopup()

    delete markers[id];

    const arrIndex = arrData.findIndex(x => x.id === parseInt(id));
    arrData.splice(arrIndex,1);

    arrDataLength();
});


// Click event to EDIT item and marker
$('.places-list').on('click', '.divEdit', (e) => {
    const iconEdit = e.target;

    const h3 = $(iconEdit).siblings('h3')
    const h3Text = $(h3).text();
    const p = $(iconEdit).siblings('p');
    const pText = $(p).text();

    const id = $(iconEdit).parent().attr('data-id');
    markers[id].openPopup();
    
    $(iconEdit).parent().find('.delete').hide();
    $(iconEdit).parent().find('.drag').hide();
    $(iconEdit).parent().find('.edit').hide();
    $(iconEdit).parent().find('.check').show();

    $(h3).remove();
    $(p).remove();

    $(iconEdit).parent().prepend('<input type="text" data-id="'+id+'" class="input-p" placeholder="Description" value="'+pText+'">');
    $(iconEdit).parent().prepend('<input type="text" data-id="'+id+'" class="input-h3" placeholder="Title" value="'+h3Text+'" autofocus>');
});


// Click event to CHECK ICON
$('.places-list').on('click', '.check', (e) => {
    const iconCheck = e.target;
    
    const id = $(iconCheck).parent().attr('data-id');

    const h3 = $(iconCheck).siblings('.input-h3');
    const p = $(iconCheck).siblings('.input-p');

    const titleVal = $(h3).val();
    const descVal = $(p).val();

    $(h3).remove();
    $(p).remove();

    $(iconCheck).parent().prepend('<p data-id="'+id+'">'+descVal+'</p>');
    $(iconCheck).parent().prepend('<h3 data-id="'+id+'">'+titleVal+'</h3');

    markers[id].bindPopup(`<b>${titleVal}</b><br>${descVal}`);

    const index = arrData.findIndex(x => x.id === parseInt(id));
    arrData[index].title = titleVal;
    arrData[index].info = descVal;

    
    $(iconCheck).parent().find('.delete').show();
    $(iconCheck).parent().find('.drag').show();
    $(iconCheck).parent().find('.edit').show();
    $(iconCheck).parent().find('.check').hide();
});


// Marker click event
$('.map').on('click', '.leaflet-marker-icon', (e) => {
    // Use the event to find the clicked element
    const el = $(e.target),
    id = el[0]._leaflet_id;

    $('.places-item').removeClass('selected');
    $('li[data-id="'+id+'"]').addClass('selected'); 

    mymap.panTo(markers[id].getLatLng());
 });


// List click event
$('.places-list').on('click', '.places-item', (e) => {
    const el = $(e.srcElement || e.target),
    id = $(el).attr('data-id');
    
    $('.places-item').removeClass('selected');
    $('li[data-id="'+id+'"]').addClass('selected');

    mymap.panTo(markers[id].getLatLng());
    markers[id].openPopup();
});


// Map click event
mymap.on('click', function(e){
    const marker = new L.marker([e.latlng.lat, e.latlng.lng]).addTo(mymap).bindPopup(`<b>Title</b><br>Description`).openPopup();
    const markerId = marker._leaflet_id + 1;

    markers[markerId] = marker;

    arrData.push({
        'id': markerId,
        'title': 'Title',
        'info': 'Description',
        'lat': e.latlng.lat,
        'lang': e.latlng.lng
    });

    $('.places-item').removeClass('selected');
    
    makeListItem(markerId, 'selected', 'Title', 'Description');

    arrDataLength();
});


// ==========================================================================
// MARKERS INIT WITH CONTENT FROM SERVER
// ==========================================================================

arrData.forEach(place => {
    if (arrData.length > 0) {

        markers[place.id] = new L.marker([place.lat, place.lang],
            {
            bounceOnAdd: true
            }
        )
        .addTo(mymap)
        .bindPopup(`<b>${place.title}</b><br>${place.info}`);

        let cssClass;
        if (place === arrData[0]) {
            cssClass = "selected";
            markers[place.id].openPopup();
        } else {
            cssClass = "";
        }
        
        makeListItem(place.id, cssClass, place.title, place.info)        
    }

    arrDataLength();
});