// ? Use AXIOS with OMDB
var axios = require("axios");

var movieThis = function (movie) {
  axios
    .get("http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=trilogy")
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
    );
}

module.exports = movieThis();