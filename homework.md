LIRI Bot


Overview

In this assignment, you will make LIRI. LIRI is like iPhone's SIRI. However, while SIRI is a Speech Interpretation and Recognition Interface, LIRI is a Language Interpretation and Recognition Interface. LIRI will be a command line node app that takes in parameters and gives you back data.

##Submission Guide

###Create and use a standard GitHub repository. As this is a CLI App, it cannot be deployed to GitHub pages or Heroku. This time you'll need to include screenshots, a GIF, and/or a video showing us that you have the app working with no bugs. You can include these screenshots/GIFs or a link to a video in a README.md file. -->


Include screenshots (or a GIF/Video) of the typical user flow of your application. Make sure to include the use of Spotify, Bands in Town, and OMDB.
Include any other screenshots you deem necessary to help someone who has never been introduced to your application understand the purpose and function of it. This is how you will communicate to potential employers/other developers in the future what you built and why, and to show how it works.
Because screenshots (and well-written READMEs) are extremely important in the context of GitHub, this will be part of the grading.

Commits

Having an active and healthy commit history on GitHub is important for your future job search. It is also extremely important for making sure your work is saved in your repository. If something breaks, committing often ensures you are able to go back to a working version of your code.

Be clear and descriptive in your commit messaging.

Submission on BCS

Please submit the link to the Github Repository!

Inside of random.txt put the following in with no extra characters or white space:

spotify-this-song,"I Want it That Way"


#Make it so liri.js can take in one of the following commands:

concert-this
spotify-this-song
movie-this
do-what-it-says


##node liri.js concert-this <artist/band name here>

This will search the Bands in Town Artist Events API for an artist and render the following information about each event to the terminal


<li>Name of the venue
<li>Venue location
<li>Date of the Event (use moment to format this as "MM/DD/YYYY")

##node liri.js spotify-this-song '<song name here>'

This will show the following information about the song in your terminal/bash window

<li>Artist(s)
<li>The song's name
<li>A preview link of the song from Spotify
<li>The album that the song is from

### If no song is provided then your program will default to "The Sign" by Ace of Base.

#node liri.js movie-this '<movie name here>'

This will output the following information:

   <li> Title of the movie.
   <li> Year the movie came out.
   <li> IMDB Rating of the movie.
   <li> Rotten Tomatoes Rating of the movie.
   <li> Country where the movie was produced.
   <li> Language of the movie.
   <li> Plot of the movie.
   <li> Actors in the movie.


#If the user doesn't type a movie in, the program will output data for the movie 'Mr. Nobody.'

If you haven't watched "Mr. Nobody," then you should: http://www.imdb.com/title/tt0485947/

It's on Netflix!

##node liri.js do-what-it-says

Using the fs Node package, LIRI will take the text inside of random.txt and then use it to call one of LIRI's commands.

It should run spotify-this-song for "I Want it That Way," as follows the text in random.txt.
Edit the text in random.txt to test out the feature for movie-this and concert-this.

BONUS


In addition to logging the data to your terminal/bash window, output the data to a .txt file called log.txt.
Make sure you append each command you run to the log.txt file. 
Do not overwrite your file each time you run a command.



Create a README.md


Add To Your Portfolio
