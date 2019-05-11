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

var movieThis = require("omdb");

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
    "\tSearch: " +
    fullSearch +
    "\n\n";
  fs.appendFile("log.txt", text, function (err) {
    if (err) {
      console.log(err);
      // } else {
      //   console.log("new log entry!");
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
      console.log("---------------------------------------------\n");
      console.log("\tVersions of " + song);
      console.log("\n---------------------------------------------\n");
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
        "Sorry, I couldn't find anthing for " +
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
        "I can't find any current concerts for '" +
        searchTerm +
        "'!\n\n Please enter a different artist"
      );
    });
}


// ! do-what-it-says function
var doIt = function () {
  fs.readFile("random.txt", function (err, data) {
    if (err) {
      console.log(err);
    } else {
      searchTerm = data
        .toString()
        .split(",")
        .pop();

      console.log("\n ✔️  The text says: " + data.toString());

      var searchType = data.toString().split(",");
      if (searchType.indexOf("spotify")) {
        callSpotify();
      } else if (searchType.indexOf("movie")) {
        movieThis();
      } else if (searchType.indexOf("concert")) {
        callBandsInTown();
      } else {
        console.log("I do not recognize this command");
      }
      searchTerm = data
        .toString()
        .split(",")
        .pop();
    }
  });
};

var runInquirer = function () {
  inquirer
    .prompt([{
        type: "rawlist",
        name: "searchType",
        message: "Which can LIRI do for you?\t\t\t\t",
        choices: [
          "Find a song with Spotify",
          "Find a concert with Bands in Town",
          "Find movie info on OMDB",
          "Do whatever's in random.txt",
        ]
      },
      {
        when: function (answers) {
          return answers.searchType == "Find a song with Spotify";
        },
        type: "input",
        name: "searchTerm",
        message: "Please enter name of song:\t"
      },
      {
        when: function (answers) {
          return answers.searchType == "Find a concert with Bands in Town";
        },
        type: "input",
        name: "searchTerm",
        message: "Please enter name of artist(s):\t"
      }, {
        when: function (answers) {
          return answers.searchType === "Find movie info on OMDB";
        },
        type: "input",
        name: "searchTerm",
        message: "Please enter name of movie:\t"
      }
    ])
    .then(function (user) {
      // ? Spotify Search
      if (user.searchType === "Find a song with Spotify") {
        searchTerm = user.searchTerm;
        addToLog();
        callSpotify();
      } else if (
        user.searchType === "Find a concert with Bands in Town"
      ) {
        searchTerm = user.searchTerm;
        addToLog();
        callBandsInTown();
      } else if (user.searchType === "Find movie info on OMDB") {
        searchTerm = user.searchTerm;
        addToLog();
        movieThis();
      } else if (
        user.searchType === "Do whatever's in random.txt") {
        addToLog();
        doIt();
      } else {
        console.log("Sorry, I couldn't find a song named " + user.searchTerm + " Try something else?");
      }
    })
    .catch(function (err) {
      console.log("It won't work if you don't type something in!");
    });
};

// ? If then statement which  calls the various functions
if (userChoice === "spotify-this-song") {
  if (inputString[3]) {} else {
    searchTerm = "the sign"; -
    console.log(
      "\n📣\tIf you can't choose a song, I suggest The Sign by Ace of Base! It always makes me happy"
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
    console.log("\n📣\tIf you can't choose a movie, I suggest Mr. Nobody!\n What a wonderful movie\n");
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
    "\nplease enter:\t\tconcert-this, spotify-this-song, movie-this, or do-what-it-says\n\nfollowed by:\t\tthe name of the artist, song, or movie. \n\n👋  If you want to save a few key strokes, try entering node liri inquirer 👋"
  );
}