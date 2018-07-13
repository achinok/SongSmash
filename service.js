"use strict";
{
    let service = function ($http) {
        let vm = this;
        let load = true;
        let trackId = 0;
        let lyrics = "";
        // let difficulty = {};
        var array = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
        let winsneed = 0;
        let lossesallowed= 0;
        const APIKey = "c42ef466fff57d1c817a1efd2f2ebf38";

        // beArtist returns data from the api
        let beArtist = function () {
            return beArtist;
        }

        // setArtist allows artist selected to be stored as a variable to be passed back to the home page
        let setArtist = function (newArtist) {
            beArtist = newArtist;
        }

        // beLyrics returns the data from the api

        let beLyrics = function () {
            return lyrics;
        }
        // Takes the lyrics from the home component and stores it in a new variable        
        let setLyrics = function (newlyrics) {
            lyrics = newlyrics;
        }
        // Grabs a snippet of lyrics from our API by using the trackID. Also updates the lyrics variable. 
        let getLyrics = function (trackId) {
            let url = `https://cors-anywhere.herokuapp.com/api.musixmatch.com/ws/1.1/track.snippet.get?format=json&commontrack_id=${trackId}&apikey=${APIKey}`
            
            return $http.get(url).then(function (response) {
                let lyrics = response.data.message.body.snippet.snippet_body;
                setLyrics(lyrics);
                return lyrics;
            });
        }
        // getTrackId grabs tracks from our API and puts the trackId into the getLyrics function 
        // end point is the track rating, we pull in array lenth of 10.     
        let getTrackId = function (artist) {
            var artist = artist.split(" ").join("%20");
            let i = array.length;
            let j = 0;
            j = Math.floor(Math.random() * (i));
            let n = array[j];
            console.log(j);
    let url = `https://cors-anywhere.herokuapp.com/api.musixmatch.com/ws/1.1/track.search?format=json&q_artist=${artist}&s_track_rating=desc&f_has_lyrics&apikey=${APIKey}`
    
    return $http.get(url).then(function (response) {

        //create random number generator between 1 and 10 to find the index of the song. 
        //varying difficulties can change the number generated. 
        console.log(response.data.message.body.track_list[n].track.commontrack_id);
        let trackNum = response.data.message.body.track_list[n].track.commontrack_id;
        getLyrics(trackNum);
        array.splice(j,1);
        console.log(array);
        if(trackNum===87818215){
            trackNum = 89179138;
            return trackNum;
        }
        return trackNum;
    })
}



// getSongName takes the trackId to get the name of the specific song. 
let getSongName = function (trackId) {
    let url = `https://cors-anywhere.herokuapp.com/api.musixmatch.com/ws/1.1/track.get?format=json&commontrack_id=${trackId}&apikey=${APIKey}`;
    
    return $http.get(url).then(function (response) {
        console.log(url);
        var songName = response.data.message.body.track.track_name;
        if (songName.indexOf("-") > -1) {
            songName = songName.substring(0, songName.indexOf("-") - 1);
            return songName;
        } else if (songName.indexOf("(") > -1) {
            songName = songName.substring(0, songName.indexOf("(") - 1);
            return songName;
        }else if(songName.indexOf("?") > -1) {
            songName = songName.substring(0, songName.indexOf("?"));
            return songName;
        } else if (songName.indexOf("!") > -1) {
            songName = songName.substring(0, songName.indexOf("!"));
            return songName;
        }
        console.log(songName);
        return songName;
    });
}

    let difficulty = function () {
        return difficulty;
        }

    let difficultyType = function(difficultyResult) {
        difficulty = difficultyResult;
    }

$('input').keypress(function (e) {
    if (e.which == 13) {
      $('.mybtnGame').click();
      return false;
    } 
  }); 

  $('input').keypress(function (e) {
    if (e.which == 13) {
      $('.mybtnHome').click();
      return false;
    } 
  }); 



return {
    getLyrics,
    getTrackId,
    beLyrics,
    setLyrics,
    getSongName,
    beArtist,
    setArtist,
    load,
    difficulty,
    difficultyType
};

}
angular
    .module("app")
    .factory("service", service);
}