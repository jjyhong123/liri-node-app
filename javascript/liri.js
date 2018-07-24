require("dotenv").config();
var keys = require("./keys.js");

var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);
console.log(spotify);

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