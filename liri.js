// Import required materials
require("dotenv").config();
var fs = require('fs');
var keys = require("./keys.js");
var request = require('request');
var Spotify = require('node-spotify-api');
var Twitter = require('twitter');

// Keys
var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);

// Perform user-specified command
switch (process.argv[2]) {
    case "my-tweets":
        getTweets();
        break;
    case "spotify-this-song":
        // Initialize song title with default
        var songTitle = "The Sign Ace of Base";
        // If user provided song title 
        if (process.argv.length > 3) {
            // Replace default song title with one provided by user 
            songTitleArray = process.argv.slice(3, process.argv.length);
            songTitle = songTitleArray.join(" ");
        }
        getSong(songTitle);
        break;
    case "movie-this":
        // Initialize movie title with default
        var movieTitle = "Mr Nobody";
        // If user provided movie title
        if (process.argv.length > 3) {
            // Replace default movie title with one provided by user 
            movieTitleArray = process.argv.slice(3, process.argv.length);
            movieTitle = movieTitleArray.join(" ");
        }
        getMovie(movieTitle);
        break;
    case "do-what-it-says":
        random();
}

// Twitter
function getTweets() {
    var params = { screen_name: 'jae_gatsby' };
    client.get('statuses/user_timeline', params, function (error, tweets, response) {
        if (!error) {
            // Set default number of tweets displayed to 20
            var breakoutIndex = 20;
            // If user hasn't posted that many tweets, display however many he has
            if (tweets.length < 20) {
                breakoutIndex = tweets.length;
            }
            // Display tweets
            for (var i = 0; i < breakoutIndex; i++) {
                console.log("\nPosted on: " + tweets[i].created_at + "\n" + params.screen_name + " says: " + tweets[i].text);
            }
        }
    });
}

// Spotify
function getSong(songTitle) {
    spotify.search({
        type: 'track',
        query: songTitle
    }, function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }
        // Return the artist, song name, preview link and album name
        console.log("\nArtist name: " + data.tracks.items[0].album.artists[0].name + "\nSong name: " + data.tracks.items[0].name + "\nPreview link: " + data.tracks.items[0].preview_url + "\nAlbum name: " + data.tracks.items[0].album.name + "\n-----");
    });
}

// OMDB
function getMovie(movieTitle) {
    request("http://www.omdbapi.com/?t=" + movieTitle + "&plot=short&apikey=trilogy", function (error, response, body) {
        if (JSON.parse(body).Response === 'False') {
            return console.log(JSON.parse(body).Error);
        }
        if (!error && response.statusCode === 200) {
            console.log("\nTitle: " + JSON.parse(body).Title + "\nRelease date: " + JSON.parse(body).Released + "\nIMDB rating: " + JSON.parse(body).Ratings[0].Value + "\nRotten Tomatoes rating: " + JSON.parse(body).Ratings[1].Value + "\nCountry of production: " + JSON.parse(body).Country + "\nLanguage: " + JSON.parse(body).Language + "\nPlot: " + JSON.parse(body).Plot + "\nActors: " + JSON.parse(body).Actors + "\n-----");
        }
    })
};

// Do what it says
function random() {
    fs.readFile("random.txt", "utf8", function (err, data) {
        if (err) {
            return console.log(err);
        }
        data = data.split(",");

        // Extract command
        var command = data[0];
        
        if (command === "spotify-this-song") {
            getSong(data[1]);
        }
        else if (command === "movie-this") {
            getMovie(data[1]);
        }
        else {
            getTweets();
        }
    });
}