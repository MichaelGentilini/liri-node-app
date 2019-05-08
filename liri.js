require("dotenv").config();

//! use this for Spotify keys
var keys = require("./keys.js");

//! This is needed for Bands In Town and OMDB
var axios = require("axios");
//! This is needed in order to access the data from the Bands In Town API
// var circular = require('circular.js');
var moment = require('moment');

var Spotify = require('node-spotify-api');
var spotify = new Spotify({
  id: keys.spotify.id,
  secret: keys.spotify.secret
});

// 
// ? Assignment Link: https://smu.bootcampcontent.com/SMU-Coding-Bootcamp/SMDA201902FSF4/blob/master/01-Class-Content/10-nodejs/02-Homework/Instructions/homework_instructions.md

// ? Make it so liri.js can take in one of the following commands:

// ! concert-this
// ! spotify-this-song
// ! movie-this
var callSpotify = function () {
  spotify
    .search({
      type: 'track',
      query: 'Halo',
      limit: 2
    })
    .then(function (data) {
      var music = data.tracks.items[0];
      var artist = music.album.artists[0].name;
      var song = music.name;
      var preview = music.preview_url;
      var album = music.album.name;

      console.log("\n\n" + "Artist Name: " + artist);
      console.log("Song Name: " + song);
      console.log("Album: " + album + "\n\n");
      console.log("Listen here: " + preview);
    })
    .catch(function (err) {
      return console.log('Error occurred: ' + err);
    });
};

// ? Use AXIOS for Bands In Town

// * Name of the venue
// * Venue location
// * Date of the Event (use moment to format this as "MM/DD/YYYY")

var artistName = 'shawn mendes';
axios
  .get("https://rest.bandsintown.com/artists/" + artistName + "/events?app_id=codingbootcamp")
  .then(
    function (data) {
      var concert = data.data[0];
      // console.log("concert: " + JSON.stringify(concert, null, 2));
      var concertDate = JSON.parse(JSON.stringify(concert.datetime, null, 2).trim());

      // console.log("concert Info: " + JSON.stringify(concert, null, 2));
      console.log("\tNext Concert For " + concert.lineup);
      console.log('-----------------------------------------\n');
      console.log("Venue: \t\t" + JSON.parse(JSON.stringify(concert.venue.name, null, 2).trim()));
      console.log("Location: \t" + JSON.parse(JSON.stringify(concert.venue.city, null, 2).trim()) + ", " + JSON.parse(JSON.stringify(concert.venue.region, null, 2).trim()) + ", " + JSON.parse(JSON.stringify(concert.venue.country, null, 2).trim()));
      console.log("Date: \t\t" + moment(concertDate).subtract(10, 'days').calendar());
      console.log("Buy Tickets at: \t" + JSON.parse(JSON.stringify(concert.offers[0].url, null, 2).trim()));

    })
  .catch(function (Error) {
    console.log("We can't find any current concerts for this artist. Please try a different artist");
  });