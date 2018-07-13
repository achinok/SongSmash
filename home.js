"use strict";
{   
    let home = {
        template: `<div class="homeContent">
        <h1 class="appName">SONG SMASH</h1>
        <img class="record home" src = "https://upload.wikimedia.org/wikipedia/commons/thumb/7/75/Vinyl_record.svg/2000px-Vinyl_record.svg.png">
        <p class="homeP">Think you know music? <br> Enter an artist to find out!</p>
        <input type="text" placeholder="Enter an artist" ng-model="$ctrl.artist" class="inputHome"/><a href= "#!/settings"><button class="mybtnHome" ng-click="$ctrl.updateArtist($ctrl.artist)">PLAY <i class="fa fa-play" aria-hidden="true"></i></button></a>
        </div>
        <div class="footer"><em><i class="fas fa-code"></i> with <i class="fas fa-heart"></i> from Claire, Kelly, DJ, and Roger!</em></div>`,
        // empty strings are created here that are filled in when a specific artist chosen by user.  
        controller: function (service) {
            let vm = this;
            vm.artist = "";

            vm.updateArtist = function (artist) {
                service.setArtist(artist);
                console.log(service.beArtist());
            }
        }
    };

    $('input').keypress(function (e) {
        if (e.which == 13) {
          $('.mybtnHome').click();
          return false;
        }})

    home.$inject = ["service"];

    angular
        .module("app")
        .component("home", home)
}