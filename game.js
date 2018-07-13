"use strict";
{
    let game = {
        template: `
        <div ng-init="$ctrl.getTrackId()">
        <div ng-show="$ctrl.load" class="preloader">
        <img class="record loadingImage" src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/75/Vinyl_record.svg/2000px-Vinyl_record.svg.png" />
        <p class="loadingText">Loading...</p>
        </div>
            <div class="tracker">
                <span ng-repeat="conds in $ctrl.count" class = "winContainer"><i class={{conds.class}}></i></span>
                </div>
                <div class="content">
    
                
                    <p class="lyrics">"{{$ctrl.lyrics}}"</p>
                    <p>- {{$ctrl.artist}} </p>
                    <div class="gameResponsive"><input class = "inputGame" type = "text" placeholder="Guess the song" ng-model="$ctrl.guess"><button class="mybtnGame" ng-click="$ctrl.getSongName($ctrl.songNum); $ctrl.getTrackId()">Smash</button></div>
                    <p class="resultGame">{{$ctrl.result}}</p>
                </div>
            <div class="background" ng-show="$ctrl.background">
            <div class="modal" ng-show="$ctrl.show"><h1 class="conditionText">{{$ctrl.modalText}}</h2><h2 class="conditionText">{{$ctrl.modalTextTwo}}</h2><h2 class="conditionText">{{vm.songText}}</h2><img class="modalImg" src="{{$ctrl.resultImg}}"><a href="#!/home"><button class="playAgain">Play again?</button></a></div></div>

        </div>
        <div class="footer"><em><i class="fas fa-code"></i> with <i class="fas fa-heart"></i> from Claire, Kelly, DJ, and Roger!</em></div>
        `,
        // empty strings are created here that are filled in when a specific artist, lyrics. 
        controller: function (service) {

            let vm = this;
            vm.load = true;
            vm.artist = "";
            vm.artistid = "";
            vm.lyrics = "";
            vm.guess = "";
            vm.result = "";
            vm.wins = 0;
            vm.losses = 0;
            vm.count = [];
            vm.modalText = "";
            vm.modalTextTwo = "";
            vm.resultImg = "";
            vm.copyright = 0;
            vm.gameType = service.difficulty();

            // guessSong function will determine if the users answer is correct or not and give an appropriate response
            vm.guessSong = function (guess) {
                if (guess.indexOf("?") > -1) {
                    guess = guess.substring(0, guess.indexOf("?"));
                    return guess;
                } else if (guess.indexOf("!") > -1) {
                    guess = guess.substring(0, guess.indexOf("!"));
                    return guess;
                }
                if (guess.toLowerCase() == vm.songName.toLowerCase()) {
                    console.log("correct");
                    vm.result = "Correct!";
                    vm.wins++;
                    if (vm.wins === vm.gameType.win) {
                        vm.wins = 0;
                        vm.losses = 0;

                        $(".mybtn").prop('disabled', true);
                        vm.modalText = "You win!";
                        vm.resultImg = "https://media3.giphy.com/media/R9YeL5bxPc34c/giphy.gif";
                        vm.show = !vm.show;
                        vm.background = !vm.background;
                    }
                    vm.count.push({ class: "fas fa-trophy" });
                    console.log(vm.count);
                    return vm.result;
                } else {
                    console.log("guess again");
                    vm.count.push({ class: "fas fa-times" });
                    console.log(vm.count);

                    vm.results = [
                        `Do you even listen to ${service.beArtist()}? The answer was: ${vm.songName}.`,
                        `Dang, even my mother knew that this song was ${vm.songName}.`,
                        `Hahaha.. NOPE!! This song is by ${service.beArtist()}. The song is called: ${vm.songName}.`
                    ];

                    //randomize lose response
                    let randRes = function () {
                        var i = Math.floor(Math.random() * (vm.results.length));
                        return vm.results[i];
                    }

                    //change vm.result to equal the randomized index from 'results'
                    vm.result = randRes();

                    vm.losses++;
                    if (vm.losses === vm.gameType.loss) {
                        // if user lose count reaches 3 reset wins and losses 0. Reset start again. 
                        vm.wins = 0;
                        vm.losses = 0;
                        $(".mybtn").prop('disabled', true);
                        vm.modalText = `GAME OVER!`;
                        vm.modalTextTwo = `The correct answer was: ${vm.songName}`;
                        vm.songText = vm.songName;
                        vm.resultImg = "https://media0.giphy.com/media/1QJ3bY1RkiqWY/giphy.gif";
                        vm.show = !vm.show;
                        vm.background = !vm.background;

                    }

                }
            }
            // getLyrics using the trackId to get lyrics. If lyric not found, call function again. 
            vm.getLyrics = function () {
                service.getLyrics(vm.songNum).then(function (response) {

                    if (response === "" && vm.copyright > 0) {
                        vm.lyrics = "Unfortunately this artist has a copyright that prevents us from displaying lyrics. Please choose another artist."
                        return vm.lyrics;
                    } else if (response === ""){
                        vm.getTrackId(service.beArtist());
                        vm.wins++;
                        vm.copyright++;  
                    }
                    vm.lyrics = service.beLyrics();
                    return vm.lyrics;
                }).finally(function () {
                    vm.load = false;
                });
            }
            // getSongName using the trackId to getSongName
            vm.getSongName = function () {
                service.getSongName(vm.songNum).then(function (response) {
                    vm.songName = response;
                    vm.guessSong(vm.guess);
                    console.log(vm.guess);
                    return vm.songName;

                });
            }
            // getTrackId is giving the song a trackId based on the artist name
            vm.getTrackId = function () {
                service.getTrackId(service.beArtist())
                    .then(function (response) {
                        console.log("It's working");
                        vm.artist = service.beArtist();
                        console.log("vm.artist is " + vm.artist)
                        vm.songNum = response;
                        vm.getLyrics();
                        return vm.songNum;
                    });
            }

            //JQuery Stuff
            //Clears value from input on click
            $("button").on("click", function () {
                $("input").val("");
            });
            $(".playAgain").on("click", function () {
                window.location.reload();
            });



            $('input').keypress(function (e) {
                if (e.which == 13) {
                    $('.mybtnGame').click();
                    return false;
                }
            });

        }
    };

    game.$inject = ["service"];

    angular
        .module("app")
        .component("game", game)
}