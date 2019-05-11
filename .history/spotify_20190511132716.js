// ! Spotify (spotify-this-song)
var callSpotify = function (searchTerm, searchLimit) {
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

module.exports = callSpotify;