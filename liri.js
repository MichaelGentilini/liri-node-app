require("dotenv").config();

//! use this for Spotify keys
var keys = require("./keys.js");

//! This is needed for Bands In Town and OMDB
var axios = require("axios");
//! This is needed in order to access the data from the Bands In Town API

// var omdb = require("./omdb");
// console.log(omdb);

var moment = require('moment');

var Spotify = require('node-spotify-api');
var spotify = new Spotify({
  id: keys.spotify.id,
  secret: keys.spotify.secret
});

// 
// ? Assignment Link: https://smu.bootcampcontent.com/SMU-Coding-Bootcamp/SMDA201902FSF4/blob/master/01-Class-Content/10-nodejs/02-Homework/Instructions/homework_instructions.md

// ? Make it so liri.js can take in one of the following commands:
// Takes in all of the command line arguments
var inputString = process.argv;

// ! concert-this
// ! spotify-this-song
// ! movie-this
var userChoice = inputString[2];
var searchTerm = process.argv.slice(3).join(" ");
var searchLimit = 20;
var callSpotify = function () {
  spotify
    .search({
      type: 'track',
      query: searchTerm,
      limit: searchLimit
    })
    .then(function (data) {
      var song = data.tracks.items[0].name;
      console.log('\n');
      console.log("Versions of " + song);
      console.log('- - - - - - - - - - - - - - - - - - - -\n');
      for (i = 0; i < searchLimit; i++) {

        var music = data.tracks.items[i];
        // console.log(music);
        var artist = music.artists[0].name;
        var song = music.name;
        var preview = music.preview_url;
        var album = music.album.name;


        console.log("Artist Name: \t" + artist);
        console.log("Album: \t\t" + album);
        console.log("Listen here: \t" + preview);
        // console.log('= = = = = = = = = = = = = = = = = = = =');
        console.log('\n');
      }
    })
    .catch(function (err) {
      console.log("Sorry, we couldn't find anthing for " + searchTerm + "\nTry a different song!");
      return err
    });
};


// ? For Bands In Town

// var artistName = 'shawn mendes';

function callBandsInTown() {
  axios
    .get("https://rest.bandsintown.com/artists/" + searchTerm + "/events?app_id=codingbootcamp")
    .then(
      function (data) {
        var concert = data.data[0];
        // console.log("concert: " + JSON.stringify(concert, null, 2));
        var concertDate = JSON.parse(JSON.stringify(concert.datetime, null, 2).trim());

        console.log('\n-----------------------------------------');
        console.log("\n\tNext Concert For " + concert.lineup);
        console.log('\n-----------------------------------------\n');
        console.log("Venue: \t\t\t" + JSON.parse(JSON.stringify(concert.venue.name, null, 2).trim()));
        console.log("Location: \t\t" + JSON.parse(JSON.stringify(concert.venue.city, null, 2).trim()) + ", " + JSON.parse(JSON.stringify(concert.venue.region, null, 2).trim()) + ", " + JSON.parse(JSON.stringify(concert.venue.country, null, 2).trim()));
        console.log("Date: \t\t\t" + moment(concertDate).subtract(10, 'days').calendar());
        console.log("Get More Details: \t" + JSON.parse(JSON.stringify(concert.url, null, 2).trim()));
      })
    .catch(function (Error) {
      console.log("We can't find any current concerts for '" + searchTerm + "'!\n\n Please enter a different artist");
    });
}

// ! Bands in Town Axios Call
var movieThis = function () {
  axios
    .get("http://www.omdbapi.com/?t=" + searchTerm + "&y=&plot=short&apikey=trilogy")
    .then(
      function (response) {
        var imdb = response.data;
        console.log('IMDB Movie Data')
        console.log('---------------------------------------------\n')
        console.log("Title: \t\t\t" + imdb.Title);
        console.log("Starring: \t\t" + imdb.Actors);
        console.log("Year: \t\t\t" + imdb.Year);
        console.log("IMDB Rating: \t\t" + imdb.imdbRating);
        // ? All this to get Rotten Tomatoes
        var propOwn = Object.getOwnPropertyNames(imdb.Ratings);
        var ratingArray = [];
        var ratingNumberArray = [];
        for (i = 0; i < propOwn.length - 1; i++) {
          var rating = Object.values(imdb.Ratings[i].Source).join('');
          var ratingNumber = Object.values(imdb.Ratings[i].Value).join('');
          if (Object.values(imdb.Ratings[i].Source).join('') === 'Rotten Tomatoes') {
            ratingArray.push(rating);
            ratingNumberArray.push(ratingNumber);
          }
        }
        if (ratingArray.length === 1) {
          console.log("Rotten Tomatoes: \t" + ratingNumberArray);
        } else {
          console.log("Rotten Tomatoes: \tNot Yet Rated");
        }
        console.log("Country of Production: \t" + imdb.Country);
        console.log("Language: \t\t" + imdb.Language);

        console.log("Plot: \t\t\t" + imdb.Plot + "\r\t\t\t");
        ('---------------------------------------------\n')
      }
    ).catch(function (Error) {
      console.log("\n\n😟 😟   Looks like we can't find a movie with the title '" + searchTerm + "😟 😟\n\n\tPlease enter a different movie");
    });
}


// ? If then statement which  calls the various functions
if (userChoice === 'spotify-this-song') {
  if (inputString[3]) {} else {
    searchTerm = "The Sign";
  }
  callSpotify();
} else if ((userChoice === 'concert-this')) {
  if (!inputString[3]) {
    console.log("Please enter an artist's name!");
  } else {
    callBandsInTown();
  }
} else if ((userChoice === 'movie-this')) {
  if (!inputString[3]) {
    searchTerm = 'Mr.Nobody';
    console.log("\n📣\tIf you can't choose a movie, we suggest Mr. Nobody!\n");
    movieThis();
  } else {
    movieThis();
  }

} else {
  console.log('\nplease enter: \n\tconcert-this, spotify-this-song or movie-this\nfollowed by:\n\tthe name of the artist, song, or movie.')
}