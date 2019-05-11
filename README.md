# liri-node-app

LIRI is a Language Interpretation and Recognition Interface. LIRI will be a command line node app that takes in parameters and gives you back data.

##liri.js can take in one of the following commands:

1. concert-this
2. spotify-this-song
3. movie-this
4. do-what-it-says

![welcome](https://i.ibb.co/gJt2Zrd/welcome.jpg?raw=true)

##node liri.js concert-this <artist/band-name>

This will search the Bands in Town Artist Events API for an artist and render the following information about each event to the terminal

<li>Name of the venue
<li>Venue location
<li>Date of the Event

![concert](https://i.ibb.co/TDyWLwL/omdb.jpg?raw=true)

##node liri.js spotify-this-song <song-name>

This will show the following information for 10 songs

<li>Artist(s)
<li>The song's name
<li>A preview link of the song from Spotify
<li>The album that the song is from

\*\* If no song is provided the program will provide info for a default song.

![spotify](https://i.ibb.co/192yT41/spotify.jpg?raw=true)

##node liri.js movie-this <movie-name>'

This will output the following information:

<li> Title of the movie.
<li> Actors in the movie.
<li> Year the movie came out.
<li> IMDB Rating of the movie.
<li> Rotten Tomatoes Rating of the movie.
<li> Country where the movie was produced.
<li> Language of the movie.
<li> Plot of the movie.
  
**If the user doesn't type a movie in, the program will output data for *Mr. Nobody*.

![movie](https://i.ibb.co/DLpTQ2d/movie.jpg?raw=true)

##node liri.js do-what-it-says

LIRI will take the text inside of random.txt and use it to call the corresponding command.

![do-what-it-says](https://i.ibb.co/9Yk9dzy/do-what.jpg?raw=true)

##logging

Each command is logged to a log.txt file

## ![logging](https://i.ibb.co/rv4Vm4T/log.jpg?raw=true)

#Other things used/added

[node spotify api](https://www.npmjs.com/package/node-spotify-api) is used for song info.

[axios](https://www.npmjs.com/package/axios) for api calls to bands in town and omdb.

[bands in town api]([https://manager.bandsintown.com/support/bandsintown-api](https://manager.bandsintown.com/support/bandsintown-api "bands in town api") is used for concert info.

[omdb api](http://www.omdbapi.com/) is used for movie info.


[moment](https://www.npmjs.com/package/moment "moment") is used to convert concert dates to a readable format.

*[npm uniqid](https://www.npmjs.com/package/uniqid "npm uniqid") is used to provide a unique hexatridecimal id for logging.

#Added Feature

##node liri-js inquirer
This is more user friendly and allows the user to run all of the above commands with the inquirer CLI.

![Inquirer](https://i.ibb.co/FsS8k3V/Inquirer.jpg?raw=true)

###movie-this example

![Inquirer-example](https://i.ibb.co/SPqxZyP/Inquirer2.jpg?raw=true)
