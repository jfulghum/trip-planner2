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

router.get("/attractions", function(req, res, next){
    
    const allAttractions = {}
    const hotels = Hotel.findAll({ include: [{ all: true }] });
    const restaurants = Restaurant.findAll({ include: [{ all: true }] });
    const activities = Activity.findAll({ include: [{ all: true }] });

    Promise.all([hotels, restaurants, activities])
    .then(([hotels, restaurants, activities]) => {
        res.json({hotels, restaurants, activities})
    })
    .catch(next)
})

