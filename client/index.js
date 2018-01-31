const mapboxgl = require("mapbox-gl");
const buildMarker = require("./marker.js");

mapboxgl.accessToken = 'pk.eyJ1IjoiamZ1bGdodW0iLCJhIjoiY2pkMjZhYm5uMG92YzJ4cGE5bHNrcnJidSJ9.1BzRK5wKtCbBjCtLD6NyCg';

const fullstackCoords = [-74.009, 40.705] // NY
// const fullstackCoords = [-87.6320523, 41.8881084] // CHI

const map = new mapboxgl.Map({
  container: "map",
  center: fullstackCoords, // FullStack coordinates
  zoom: 12, // starting zoom
  style: "mapbox://styles/mapbox/streets-v10" // mapbox has lots of different map styles available.
});

fetch('/api/attractions')
.then(result => result.json())
.then(data => {
  console.log("data", data)
  for (var hotel in data){
    if (data.hasOwnProperty(hotel)){
      for (let i = 0; i < data.hotels.length; i++){
        var div = document.createElement("option")
        div.innerHTML = data.hotels[i].name
        document.getElementById("hotels-choices").appendChild(div);
      }
    }
  }
  for (var restaurant in data){
    if (data.hasOwnProperty(restaurant)){
      for (let i = 0; i < data.restaurants.length; i++){
        var div = document.createElement("option")
        div.innerHTML = data.restaurants[i].name
        document.getElementById("restaurants-choices").appendChild(div);
      }
    }
  }
  for (var activity in data){
    if (data.hasOwnProperty(activity)){
      for (let i = 0; i < data.activities.length; i++){
        var div = document.createElement("option")
        div.innerHTML = data.activities[i].name
        document.getElementById("activities-choices").appendChild(div);
      }
    }
  }
})
.catch(console.error)

const marker = buildMarker("activities", fullstackCoords);
marker.addTo(map);

var hotelButton = document.getElementById("hotels-add") 
hotelButton.onclick = function() { 
  var selectedOptionsLength = document.getElementById("hotels-choices").children.length
  var selectedOptions = document.getElementById("hotels-choices").children
  var chosenOne;
  var div1;
  for( let i = 0; i < selectedOptionsLength; i++){
    if (selectedOptions[i].selected){
      chosenOne = selectedOptions[i]
      div1 = document.createElement("div")
      div1.innerHTML = chosenOne.innerHTML;
      document.getElementById("hotels-list").appendChild(div1)
    }
  }
 };

 var restaurantButton = document.getElementById("restaurants-add") 
 restaurantButton.onclick = function() { 
  var selectedOptionsLength = document.getElementById("restaurants-choices").children.length
  var selectedOptions = document.getElementById("restaurants-choices").children
  var chosenOne;
  var div1;
  for( let i = 0; i < selectedOptionsLength; i++){
    if (selectedOptions[i].selected){
      chosenOne = selectedOptions[i]
      div1 = document.createElement("div")
      div1.innerHTML = chosenOne.innerHTML;
      document.getElementById("restaurants-list").appendChild(div1)
    }
  }
 };

 var restaurantButton = document.getElementById("activities-add") 
 restaurantButton.onclick = function() { 
  var selectedOptionsLength = document.getElementById("activities-choices").children.length
  var selectedOptions = document.getElementById("activities-choices").children
  var chosenOne;
  var div1;
  for( let i = 0; i < selectedOptionsLength; i++){
    if (selectedOptions[i].selected){
      chosenOne = selectedOptions[i]
      div1 = document.createElement("div")
      div1.innerHTML = chosenOne.innerHTML;
      document.getElementById("activities-list").appendChild(div1)
    }
  }
 };