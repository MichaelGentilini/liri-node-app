// * all required modules

require("dotenv").config();

//! This is needed for Bands In Town and OMDB
var axios = require("axios");

//! This is needed for do-what-it-says
var fs = require("fs");

//! This is used to conver time
var moment = require("moment");

//! this is an extra to assign a unique ID to the log
var uniqid = require("uniqid");

// ! added as an extra option for those that don't like command line so much
var inquirer = require("inquirer");

//! use this for Spotify
var keys = require("./keys.js");
var Spotify = require("node-spotify-api");
var spotify = new Spotify({
  id: keys.spotify.id,
  secret: keys.spotify.secret
});

// * Global Variables
var inputString = process.argv;
var userChoice = inputString[2];
var searchTerm = process.argv.slice(3).join(" ");
var searchLimit = 10;
var today = new Date().toLocaleTimeString();
var fullSearch = userChoice + " " + searchTerm;

// ! This function logs user searches into log.txt
var addToLog = function () {
  var text =
    "ID: " +
    uniqid.time() +
    "\nTime: " +
    today +
    "\nSearch: " +
    fullSearch +
    "\n\n";
  fs.appendFile("log.txt", text, function (err) {
    if (err) {
      console.log(err);
    } else {
      console.log("new log entry!");
    }
  });
};

// ! Spotify (spotify-this-song)
var callSpotify = function () {
  spotify
    .search({
      type: "track",
      query: searchTerm,
      limit: searchLimit,
      album_type: "single"
    })
    .then(function (data) {
      var song = data.tracks.items[0].name;
      // console.log(data.tracks.items[7]);
      console.log("---------------------------------------------\n");
      console.log("\tVersions of " + song);
      console.log("\n---------------------------------------------\n");;
      for (i = 0; i < searchLimit; i++) {
        var music = data.tracks.items[i];
        var artist = music.artists[0].name;
        var song = music.name;
        var preview = music.preview_url;
        var album = music.album.name;

        console.log("Artist Name: \t" + artist);
        console.log("Album: \t\t" + album);
        if (!preview) {
          console.log("Listen here: \tLink unavailable at this time");
        } else {
          console.log("Listen here: \t" + preview);
        }
        console.log("\n");
      }
    })
    .catch(function (err) {
      console.log(
        "Sorry, we couldn't find anthing for " +
        searchTerm +
        "\nTry a different song!"
      );
      return err;
    });
};

// ! Bands in Town (concert-this) function
function callBandsInTown() {
  axios
    .get(
      "https://rest.bandsintown.com/artists/" +
      searchTerm +
      "/events?app_id=codingbootcamp"
    )
    .then(function (data) {
      var concert = data.data[0];
      // console.log("concert: " + JSON.stringify(concert, null, 2));
      var concertDate = JSON.parse(
        JSON.stringify(concert.datetime, null, 2).trim()
      );

      console.log("\n-----------------------------------------");
      console.log("\n\tNext Concert For " + concert.lineup);
      console.log("\n-----------------------------------------\n");
      console.log(
        "Venue: \t\t\t" +
        JSON.parse(JSON.stringify(concert.venue.name, null, 2).trim())
      );
      console.log(
        "Location: \t\t" +
        JSON.parse(JSON.stringify(concert.venue.city, null, 2).trim()) +
        ", " +
        JSON.parse(JSON.stringify(concert.venue.region, null, 2).trim()) +
        ", " +
        JSON.parse(JSON.stringify(concert.venue.country, null, 2).trim())
      );
      console.log(
        "Date: \t\t\t" +
        moment(concertDate)
        .subtract(10, "days")
        .calendar()
      );
      console.log(
        "Get More Details: \t" +
        JSON.parse(JSON.stringify(concert.url, null, 2).trim())
      );
    })
    .catch(function (Error) {
      console.log(
        "We can't find any current concerts for '" +
        searchTerm +
        "'!\n\n Please enter a different artist"
      );
    });
}

// ! OMDB (movie-this) function
var movieThis = function () {
  axios
    .get(
      "http://www.omdbapi.com/?t=" +
      searchTerm +
      "&y=&plot=short&apikey=trilogy"
    )
    .then(function (response) {
      var imdb = response.data;
      console.log("---------------------------------------------\n");
      console.log("\tMovie Info for " + imdb.Title);
      console.log("\n---------------------------------------------\n");
      console.log("Title: \t\t\t" + imdb.Title);
      console.log("Starring: \t\t" + imdb.Actors);
      console.log("Year: \t\t\t" + imdb.Year);
      console.log("IMDB Rating: \t\t" + imdb.imdbRating);
      // ? All this to get Rotten Tomatoes
      var propOwn = Object.getOwnPropertyNames(imdb.Ratings);
      var ratingArray = [];
      var ratingNumberArray = [];
      for (i = 0; i < propOwn.length - 1; i++) {
        var rating = Object.values(imdb.Ratings[i].Source).join("");
        var ratingNumber = Object.values(imdb.Ratings[i].Value).join("");
        if (
          Object.values(imdb.Ratings[i].Source).join("") === "Rotten Tomatoes"
        ) {
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
      ("---------------------------------------------\n");
    })
    .catch(function (Error) {
      console.log(
        "\n\n😟 😟   Looks like we can't find a movie with the title '" +
        searchTerm +
        "😟 😟\n\n\tPlease enter a different movie"
      );
    });
};

var doIt = function () {
  fs.readFile("random.txt", function (err, data) {
    if (err) {
      console.log(err);
    } else {
      searchTerm = data
        .toString()
        .split(",")
        .pop();

      console.log("The text says ----> " + data.toString());

      var searchType = data.toString().split(",");
      if (searchType.indexOf("spotify")) {
        callSpotify();
      } else if (searchType.indexOf("movie")) {
        movieThis();
      } else if (searchType.indexOf("concert")) {
        callBandsInTown();
      } else {
        console.log("We do not recognize this command");
      }
      searchTerm = data
        .toString()
        .split(",")
        .pop();
    }
  });
}

var runInquirer = function () {
  inquirer.prompt([{
      type: "rawlist",
      name: "searchType",
      message: "Which can LIRI do for you?\t\t\t\t",
      choices: ["Find a song with Spotify (spotify-this-song)", "Find a concert with Bands in Town (concert-this)", "Find movie info on OMDB (movie-this)", "Do whatever's in random.txt (do-what-it-says)"],
    },
    {
      type: "input",
      name: "searchTerm",
      message: "Please enter name of song, artist(s), or movie:\t"
    }
  ]).then(function (user) {
    // ? Spotify Search
    if (user.searchType === 'Find a song with Spotify (spotify-this-song)') {
      searchTerm = user.searchTerm;
      callSpotify();
    } else if (user.searchType === 'Find a concert with Bands in Town (concert-this)') {
      searchTerm = user.searchTerm;
      callBandsInTown();
    } else if (user.searchType === 'Find movie info on OMDB (movie-this)') {
      searchTerm = user.searchTerm;
      movieThis();
    } else if (user.searchType === "Do whatever's in random.txt (do-what-it-says)") {
      // searchTerm = user.searchType;
      doIt();
    } else {
      console.log('try something else?');
    }
  }).catch(function (err) {
    console.log("It won't work if you don't type something in!");
  });
}

// ? If then statement which  calls the various functions
if (userChoice === "spotify-this-song") {
  if (inputString[3]) {} else {
    searchTerm = "the sign"; -
    console.log(
      "\n📣\tIf you can't choose a song, we suggest The Sign by Ace of Base!"
    );
  }
  addToLog();
  callSpotify();
} else if (userChoice === "concert-this") {
  if (!inputString[3]) {
    console.log("Please enter an artist's name!");
  } else {
    addToLog();
    callBandsInTown();
  }
} else if (userChoice === "movie-this") {
  if (!inputString[3]) {
    searchTerm = "Mr.Nobody";
    console.log("\n📣\tIf you can't choose a movie, we suggest Mr. Nobody!\n");
    addToLog();
    movieThis();
  } else {
    addToLog();
    movieThis();
  }
} else if (userChoice === "do-what-it-says") {
  doIt();
} else if (userChoice === "inquirer") {
  runInquirer();
} else {
  console.log(
    "\nplease enter:\n\tconcert-this, spotify-this-song, movie-this, or do-what-it-says\nfollowed by:\n\tthe name of the artist, song, or movie. \n\n*** If you don't want to type all of that out try entering inquirer"
  );
}