var http = require('http'),
    fs = require('fs'),
    url = require('url'),
    port = 8080;

var express = require('express');
var app = express();

/* Global variables */
var listingData, server;

app.get('/listings', function (req, res) {
    res.send(listingData);
});

app.get('*', function (req, res) {
    res.status(404).send('Bad gateway error');
});


fs.readFile('listings.json', 'utf8', function (err, data) {
    /*
      This callback function should save the data in the listingData variable,
      then start the server.
     */
    if (err) {
        console.log(err);
        return;
    }
    listingData = data;
    app.listen(port);
    console.log("server listening on: http://localhost:8080");
});
