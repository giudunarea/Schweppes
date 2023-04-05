let error_div = document.getElementById('error_div')
error_div.style.display = "none";

let mode = "car"
let waypoints = [];

let origin_el = [
    document.getElementById('origin-parent'),
    document.getElementById('select-origin'), // select
    document.getElementById('select-origin-add') // button +
]

let switch_travels = [
    document.getElementById('switch-car'),
    document.getElementById('switch-train')
]


let destination_el = document.getElementById('destination')
let waypoint_holder = document.getElementById('waypoint-holder')

origin_el[2].addEventListener('click', function(e) {
    let waypoint_select = origin_el[0].cloneNode(true)
    waypoint_holder.appendChild(waypoint_select)

    waypoint_select.children[1].innerText = "-"

    waypoint_select.children[1].addEventListener('click', function() {
        waypoint_select.remove();
    })

    waypoints.push(waypoint_select)
})

let submit_but = document.getElementById("submit-quiz")
submit_but.addEventListener("click", function() {
    if (mode == "car") {
        let cities_ = <%- JSON.stringify(cities) %>  
        console.log(cities_)
        var mapProp = {
            center: new google.maps.LatLng(0, 0),
            zoom: 11,
            mapId: 'd419190f5970e70b',
        };
        var map = new google.maps.Map(document.getElementById("google_map"), mapProp);

    } else {
        let origin = origin_el[1].value
        for (let index = 0; index < waypoints.length; index++) {
            console.log(waypoints[index].children[0].value)
        }
    }
})

switch_travels[0].addEventListener('click', function() {
    console.log(waypoints)
    for (let index = 0; index < waypoints.length; index++) {
        waypoints[index].remove()
    }
    waypoints = [];
    mode = "car"
})

switch_travels[1].addEventListener('click', function() {
    mode = "train"
})