/* Fill out these functions using Mongoose queries*/
var Listing = require('./ListingSchema'),
    mongoose = require('mongoose'),
    config = require('./config');

mongoose.connect(config.db.uri);
var connection = mongoose.connection;

connection.on('connected', function () {
    console.log("connected to db");
    // findLibraryWest();
    // removeCable();
    // retrieveAllListings();
    // updatePhelpsLab();
});

var findLibraryWest = function () {

    Listing.find({name: "Library West"}, function (err, user) {
        if (err) throw err;

        console.log(user);
    });

    /*
      Find the document that contains data corresponding to Library West,
      then log it to the console.
     */
};

var removeCable = function () {

    Listing.findOneAndRemove({code: "CABL"}, function (err) {
        if (err) throw err;

        retrieveAllListings();
    });

    /*
      Find the document with the code 'CABL'. This cooresponds with courses that can only be viewed
      on cable TV. Since we live in the 21st century and most courses are now web based, go ahead
      and remove this listing from your database and log the document to the console.
     */
};

var updatePhelpsLab = function () {
    
    Listing.findOneAndUpdate({name:"Phelps Laboratory"}, {address:"102 Phelps Lab, Gainesville, FL 32611"}, function (err, data) {
        if (err) throw err;
    });

    Listing.find({name: "Phelps Laboratory"}, function (err, user) {
        if (err) throw err;

        console.log(user);
    });
    /*
      Phelps Laboratory's address is incorrect. Find the listing, update it, and then
      log the updated document to the console.
     */
};
var retrieveAllListings = function () {
    Listing.find({}, function (err, data) {
        if (err) throw err;

        console.log(data);
    });

    /*
      Retrieve all listings in the database, and log them to the console.
     */
};

// findLibraryWest();
// removeCable();
// updatePhelpsLab();
// retrieveAllListings();
