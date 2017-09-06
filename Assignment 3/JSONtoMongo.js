'use strict';
/* 
  Import modules/files you may need to correctly run the script. 
  Make sure to save your DB's uri in the config file, then import it with a require statement!
 */
var fs = require('fs'),
    mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    Listing = require('./ListingSchema.js'),
    config = require('./config');
var listingData = [];

/**
 * Connecting to the Database
 */
mongoose.connect(config.db.uri);
var connection = mongoose.connection;

connection.on('connected', function () {
    console.log("connected to db");
    fileToJSON();
});

connection.on("disconnected", function () {
    console.log("disconnected from db ");
});

connection.on("SIGINT", function () {
    connection.close(function () {
        console.log("db connection closed due to process termination");
    })
});

// mongoose.disconnect();

var addListings = function () {
    Listing.remove({}, function (err) {
        if (err) throw err;
        console.log("all were removed")

        addDataToDB();
    });
};

var addDataToDB = function () {
    for (var obj in listingData["entries"]) {
        /**
         * creating the new listing
         */
        var entry = new Listing(listingData["entries"][obj]);
        /**
         * saving to the database
         */
        entry.save(function (err) {
            if (err) {
                console.log(err);
            }

            console.log("User save successfully");
        });
    }
}


var fileToJSON = function () {
    fs.readFile('listings.json', 'utf8', function (err, data) {
        if (err) {
            console.log(err);
            return;
        }
        listingData = JSON.parse(data);
        // console.log(listingData);
        addListings();
    });
}
