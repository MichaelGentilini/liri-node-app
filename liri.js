// require("dotenv").config();

var keys = require("./keys.js");

var id = 'fd863a46654b496ca97f026cd8497f9c';
var secret = 'f7ede7d989924de99ace93f709e74ee3';

var Spotify = require('node-spotify-api');
var spotify = new Spotify({
  id: id,
  secret: secret
});



var axios = require("axios");
var request = require("request");

// 
// ? Assignment Link: https://smu.bootcampcontent.com/SMU-Coding-Bootcamp/SMDA201902FSF4/blob/master/01-Class-Content/10-nodejs/02-Homework/Instructions/homework_instructions.md

// ? Make it so liri.js can take in one of the following commands:

// ! concert-this
// ! spotify-this-song
// ! movie-this
// ! do-what-it-saysls
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
// ? Use AXIOS with OMDB

var movie = 'Terminator';

axios
  .get("http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=trilogy")
  .then(
    function (response) {
      var imdb = response.data;

      console.log("Title: " + imdb.Title);
      console.log("Plot: " + imdb.Plot);
      console.log("Starring: " + imdb.Actors);
      console.log("Year: " + imdb.Year);
      console.log("IMDB Rating: " + imdb.imdbRating);
      console.log("Country of Production: " + imdb.Country);
      console.log("Language: " + imdb.Language);
      console.log('-------------------------')

      // ? Not sure how to access this
      // console.log("let's access the ratings" + JSON.stringify(imdb.Ratings['Source']));
      var ratings = JSON.stringify(imdb.Ratings);
      console.log(ratings);


      // Object.size = function (Imdb.Ratings) {
      //   var size = 0,
      //     key;
      //   for (key in Imdb.Ratings) {
      //     i(Imdb.Ratings.hasOwnProperty(key)) size++;
      //   }
      //   return size;
      // }; // Get the size of an object
      // var size = Object.size(myArray);


      // console.log(size);

      // var size = Object.keys(ratings).length;

      // console.log("Length: " + size);
      // console.log("ratings" + Object.entries(ratings));
      // console.log("keys :" + Object.keys(imdb.Ratings));
      // console.log("ratings: " + Object.entries(imdb.Ratings));


      var propOwn = Object.getOwnPropertyNames(imdb.Ratings);
      var ratingArray = [];
      var ratingNumberArray = [];
      // propOwn.length = propOwn.length - 1;
      console.log("Length is: " + (propOwn.length - 1));
      for (i = 0; i < propOwn.length - 1; i++) {
        var rating = Object.values(imdb.Ratings[i].Source).join('');
        var ratingNumber = Object.values(imdb.Ratings[i].Value).join('');
        if (Object.values(imdb.Ratings[i].Source).join('') === 'Rotten Tomatoes') {
          ratingArray.push(rating);
          ratingNumberArray.push(ratingNumber);
        } else {
          console.log("Looks like it hasn't been rated by Rotten Tomatoes");
        }
        console.log(ratingArray);
      }




      if (ratingArray.indexOf('Rotten Tomatoes')) {
        console.log('hello');
      } else {
        console.log("Looks like it hasn't been rated by Rotten Tomatoes");
      }


    }


  );


// * Year the movie came out.
// * IMDB Rating of the movie.
// * Rotten Tomatoes Rating of the movie.
// * Country where the movie was produced.
// * Language of the movie.
// * Plot of the movie.
// * Actors in the movie.