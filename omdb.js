// ? Use AXIOS with OMDB

var movie = 'Terminator';

axios
  .get("http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=trilogy")
  .then(
    function (response) {
      var imdb = response.data;
      console.log('IMDB Movie Data')
      console.log('\t-------------------------\n')
      console.log("Title: " + imdb.Title);
      console.log("Plot: " + imdb.Plot);
      console.log("Starring: " + imdb.Actors);
      console.log("Year: " + imdb.Year);
      console.log("IMDB Rating: " + imdb.imdbRating);
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
        console.log("Rotten Tomatoes: " + ratingNumberArray);
      } else {
        console.log("This hasn't been rated by Rotten Tomatoes");
      }
      console.log("Country of Production: " + imdb.Country);
      console.log("Language: " + imdb.Language);
      console.log('\n-------------------------\n')
    }
  );