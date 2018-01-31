const express = require("express");
const router = express.Router();
const models = require("../models")
const { db, Place, Hotel, Activity, Restaurant } = models

module.exports = router;

// retrieve all the hotels, restaurants, and activities 
//do you only put error as a paramter ONLY when you are writing error handling middleware??
// router.get("/", function(req, res, next){
//     const allAttractions = {}
//     Hotel.findAll()
//     .then(function(hotels){
//         allAttractions.hotels = hotels;
//         return Restaurant.findAll()
//     }).then(function(restaurants){
//         allAttractions.restaurants = restaurants;
//         return Activity.findAll()
//     }).then(function(activites){
//         allAttractions.activites = activites
//     }).then(function(){
//         res.json(allAttractions)
//     }).catch(next)
// })

router.get("/", function(req, res, next){
    
    allAttractions = {}
    const hotel = Hotel.findAll();
    const restaurant = Restaurant.findAll();
    const activity = Activity.findAll();

    Promise.all([hotel, restaurant, activity])
    .then(function(hotel, restaurant, activity){
        allAttractions["hotel"] = hotel
        allAttractions["restaurant"] = restaurant
        allAttractions["activity"] = activity
    }).then(function(thing){
        console.log("Thing", thing)
        // where is this being logged?
        res.json(allAttractions)
    }).catch(next)
})