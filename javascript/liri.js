require("dotenv").config();
var keys = require("./keys.js");
var Twitter = require('twitter');

// var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);
console.log(client);

/*

switch (process.argv[2]) {
    case "my-tweets":
        twitter();
        break;
    case "spotify-this-song": 
        spotify();
        break;
    case "movie-this":
        OMDB();
        break;
    case "do-what-it-says":
        random();
}

function twitter() {
    $.ajax({
        url: "https://www.omdbapi.com/?t=romancing+the+stone&y=&plot=short&apikey=trilogy",
        method: "GET"
      }).then(function(response) {
        console.log(response);
      });
  
}

function OMDB() {
    $.ajax({
        url: "https://www.omdbapi.com/?t=romancing+the+stone&y=&plot=short&apikey=trilogy",
        method: "GET"
      }).then(function(response) {
        console.log(response);
      });
  
}
*/