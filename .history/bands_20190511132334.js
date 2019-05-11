// ! Bands in Town (concert-this) function
function callBandsInTown(searchTerm) {
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

module.exports = callBandsInTown;