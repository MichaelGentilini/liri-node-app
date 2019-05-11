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

var movieThis = require("./omdb");
var callBandsInTown = require("./bands");
var callSpotify = require("./spotify");

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
        callSpotify(searchTerm, searchLimit);
      } else if (searchType.indexOf("movie")) {
        movieThis(searchTerm);
      } else if (searchType.indexOf("concert")) {
        callBandsInTown(searchTerm);
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
        callSpotify(searchTerm, searchLimit);
      } else if (
        user.searchType === "Find a concert with Bands in Town"
      ) {
        searchTerm = user.searchTerm;
        addToLog();
        callBandsInTown(searchTerm);
      } else if (user.searchType === "Find movie info on OMDB") {
        searchTerm = user.searchTerm;
        addToLog();
        movieThis(searchTerm);
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
  callSpotify(searchTerm, searchLimit);
} else if (userChoice === "concert-this") {
  if (!inputString[3]) {
    console.log("Please enter an artist's name!");
  } else {
    addToLog();
    callBandsInTown(searchTerm);
  }
} else if (userChoice === "movie-this") {
  if (!inputString[3]) {
    searchTerm = "Mr.Nobody";
    console.log("\n📣\tIf you can't choose a movie, I suggest Mr. Nobody!\n What a wonderful movie\n");
    addToLog();
    movieThis(searchTerm);
  } else {
    addToLog();
    movieThis(searchTerm);
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