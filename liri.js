//node packages required for this project
//dotenv
require("dotenv").config();

//fs
var fs = require('fs');

//Spotify
var Spotify = require('node-spotify-api');
var keys = require("./keys.js");
var spotify = new Spotify(keys.spotify);

//Axios
const axios = require('axios');

//moment.js
var moment = require('moment');
moment().format();

//==================
// concert-this
// using: BANDS IN TOWN API via axios
//==================
function findConcert(artist){
    //empty array to store retrieved concert info
    var concertInfo = [];

    //Bands In Town (BIT) API
    var bandQueryURL = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp";

    // use axios to make BIT api call, store response
    axios.get(bandQueryURL).then(function(response) {
        //console.log(response.data[0]);
        // print the following info about the given artist/band in the terminal & push to concertInfo
        //next event
        if (response.data.length === 0){
            return console.log("Sorry no data could be located for that artist");
        } else{
            const event = response.data[0];
            
            //artist/band name
            const performer = event.artist.name;
            console.log("Artist: "+ performer);
            concertInfo.push("\nArtist: "+ performer);

            // Name of venue
            const venueName = event.venue.name;
            console.log("Venue Name: "+ venueName);
            concertInfo.push("\nVenue Name: "+ venueName);
            
            //Location of Venue
            const venueLocation = event.venue.city +","+ event.venue.country;
            console.log("Venue Location: "+ venueLocation);
            concertInfo.push("\nVenue Location: "+ venueLocation);
            
            //Date of Event (formated with moment as MM/DD/YYYY)
            const eventDate = moment(event.datetime).format("MM/DD/YYYY");
            console.log("Event Date: "+ eventDate);
            concertInfo.push("\nEvent Date: "+ eventDate);

            concertInfo = concertInfo.join().replace(/,/g," ")

            //BONUS: Append the above data to file log.txt
            fs.appendFileSync("log.txt", "\nCONCERT INFO:"+concertInfo+"\n", "utf8");
            console.log("-------------------------");
            console.log("Results Saved to log.txt");
            console.log("-------------------------");
        }
        })
        .catch(function(error) {
            if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            console.log("---------------Data---------------");
            console.log(error.response.data);
            console.log("---------------Status---------------");
            console.log(error.response.status);
            console.log("---------------Status---------------");
            console.log(error.response.headers);
            } else if (error.request) {
            // The request was made but no response was received
            // `error.request` is an object that comes back with details pertaining to the error that occurred.
            console.log(error.request);
            } else {
            // Something happened in setting up the request that triggered an Error
            console.log("Error", error.message);
            }
            console.log(error.config);
        });
}


//==================
// spotify-this-song
// using Spotify API
//==================
function findSong(song){
    //empty array to store retrieved song info
    var songInfo = [];

    //search: function({ type: 'artist OR album OR track', query: 'My search query', limit: 20 }, callback);
    //will search by song name and display to following info to terminal & push to songInfo
    spotify
    .search({ type: 'track', query: song , limit: 1})
    .then(function(response) {
        //console.log(response.tracks.items[0]);
        //song info
        const songResult = response.tracks.items[0];

        // // artist(s)
        const musician = songResult.artists[0].name;
        console.log("Artists: "+ musician);
        songInfo.push("\nArtists: "+ musician);

        // //song title
        const trackTitle = songResult.name;
        console.log("Track: "+ trackTitle);
        songInfo.push("\nTrack: "+ trackTitle);

        //album name
        const albumName = songResult.album.name;
        console.log("Album: "+ albumName);
        songInfo.push("\nAlbum: "+ albumName);

        //preview link of song
        const songLink = songResult.preview_url;
        console.log("Preview Link to Song: "+ songLink);
        songInfo.push("\nPreview Link to Song: "+ songLink);

        songInfo = songInfo.join().replace(/,/g," ");

        //BONUS: Append the above data to file log.txt
        fs.appendFileSync("log.txt", "\nSONG INFO:"+songInfo+"\n", "utf8");
        console.log("-------------------------");
        console.log("Results Saved to log.txt");
        console.log("-------------------------");
    })
    .catch(function(err) {
        console.log(err);
    });
}


//==================
// movie-this
// using OMDB via axios, api key = trilogy
//==================
function findMovie(movieName){
    //empty array to store retrieved movie info
    var movieInfo = [];
;
    // Then run a request with axios to the OMDB API with the movie specified
    var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";

    // Then create a request with axios to the queryUrl
    axios.get(queryUrl).then(
        function(response) {
            //will output the following data to terminal & add each item to movieInfo array
            //title of movie
            const movieTitle = response.data.Title;
            console.log("Movie Title: " + movieTitle);
            movieInfo.push("\nMovie Title: "+ movieTitle);
            
            //movie release year
            const releaseYear = response.data.Year;
            console.log("Release Year: " + releaseYear);
            movieInfo.push("\nRelease Year: " + releaseYear);
            
            //IMDB rating
            const imdbRate = response.data.Ratings[0].Value;
            console.log("IMDB Rating: " + imdbRate);
            movieInfo.push("\nIMDB Rating: " + imdbRate);
            
            //Rotten Tomatoes Rating
            const rtRate = response.data.Ratings[1].Value;
            console.log("Rotten Tomatoes Rating: " + rtRate);
            movieInfo.push("\nRotten Tomatoes Rating: " + rtRate);
            
            //County of origin
            const country = response.data.Country;
            console.log("Country: " + country);
            movieInfo.push("\nCountry: " + country);
            
            //language
            const lang = response.data.Language;
            console.log("Language(s): " + lang);
            movieInfo.push("\nLanguage(s): " + lang);
            
            //plot
            const plot = response.data.Plot;
            console.log("Plot: " + plot);
            movieInfo.push("\nPlot: " + plot);
            
            //actors
            const actors = response.data.Actors
            console.log("Actors: " + actors);
            movieInfo.push("\nActors: " + actors);

            movieInfo = movieInfo.join().replace(/,/g," ")

            //BONUS: Append the above data to file log.txt
            fs.appendFileSync("log.txt", "\nMOVIE INFO:"+movieInfo+"\n", "utf8");
            console.log("-------------------------");
            console.log("Results Saved to log.txt");
            console.log("-------------------------");
        })
        .catch(function(error) {
            if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            console.log("---------------Data---------------");
            console.log(error.response.data);
            console.log("---------------Status---------------");
            console.log(error.response.status);
            console.log("---------------Status---------------");
            console.log(error.response.headers);
            } else if (error.request) {
            // The request was made but no response was received
            // `error.request` is an object that comes back with details pertaining to the error that occurred.
            console.log(error.request);
            } else {
            // Something happened in setting up the request that triggered an Error
            console.log("Error", error.message);
            }
            console.log(error.config);
        });
}


//==================
// do-what-it-says
//==================
// LIRI will take the text inside of random.txt and then use it to call one of LIRI's commands.
function runTxtFile(){
    fs.readFile("random.txt", "utf8", function(error, data) {

        // If the code experiences any errors it will log the error to the console.
        if (error) {
          return console.log(error);
        }
        //do something with data....
        data = data.split('\n');
        //console.log(data);
        data.forEach(element => {
            var item = element.split(',');
            if (item[0] === "spotify-this-song"){
                findSong(item[1]);
            } else if(item[0] === "movie-this"){
                findMovie(item[1]);
            } else if(item[0] === "concert-this"){
                item[1] = item[1].replace(" ", "+").replace(/"/g, '');
                findConcert(item[1]);
            } else{
                return console.log(item);
            }

        });
    });
}

//==================
// parse user inputs
//==================

const op = process.argv[2];

if(op === "concert-this"){
    //grab & assemble artist/band name
    var artist = process.argv.splice(3);

    //If the user doesn't type an artist/band in, the program will output data for the artist 'Taylor Swift'
     if (artist.length === 0){
        artist = 'Taylor Swift';
    } else{
        //need to join movieName and turn it back into a string
        artist = artist.join().replace(/,/g, '%20');
    }
    //run findConcert function
    findConcert(artist);
} else if(op === "spotify-this-song"){
    //grab & assemble song title
    var song = process.argv.splice(3);

    // If no song is provided, default search/result will be "The Sign" by Ace of Base
    if (song.length === 0){
        song = 'the sign';
    } else{
        //need to join movieName and turn it back into a string
        song = song.join(" ");
    }

    //run findSong function
    findSong(song);
} else if(op === "movie-this"){
    //grab & assemble movie name
    var movieName = process.argv.splice(3);

    //If the user doesn't type a movie in, the program will output data for the movie 'Mr. Nobody.'
    if (movieName.length === 0){
        movieName = 'Mr.+Nobody';

    } else{
        //need to join movieName and turn it back into a string
        movieName = movieName.join().replace(',', '+')

    }

    //run findMovie function
    findMovie(movieName);
} else if(op === "do-what-it-says"){
    runTxtFile();
}