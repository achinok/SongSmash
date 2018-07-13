"use strict";
{
    let settings = {
        template: `<h1>Select your Difficulty</h1>
        <div class="settingsContainer">
        <div class="settingsContent">
            <div>
                <a href="#!/game"><button class="difficultyButton" ng-mouseenter="val=true" ng-mouseleave="val=false" ng-click="$ctrl.difficulty(3,3)">Easy <span ng-show="val"> {{$ctrl.text}}</span></button><a>        
            </div>
            <div>
                <a href="#!/game"> <button class="difficultyButton" ng-mouseenter="val2=true" ng-mouseleave="val2=false" ng-click="$ctrl.difficulty(5,3)">Medium <span ng-show="val2"> {{$ctrl.text2}}</span></button></a>        
            </div>
            <div>
                <a href="#!/game"> <button class="difficultyButton" ng-mouseenter="val3=true" ng-mouseleave="val3=false" ng-click="$ctrl.difficulty(7,3)">Hard <span ng-show="val3"> {{$ctrl.text3}}</span></button></a>
            </div>
            <div>   
                <a href="#!/game"> <button class="difficultyButtonInsane" id="difficultyButtonInsane" ng-mouseenter="val4=true" ng-mouseleave="val4=false" ng-click="$ctrl.difficulty(10,1)">Insane <span ng-show="val4"> {{$ctrl.text4}}</span></button></a>
            </div>        
        </div>
        <div class="footer"><em><i class="fas fa-code"></i> with <i class="fas fa-heart"></i> from Claire, Kelly, DJ, and Roger!</em></div></div>`,


        controller: function(service){
            let vm = this;
            vm.text = " You need 3 correct to win";
            vm.text2 = " You need 5 correct to win";
            vm.text3= " You need 7 correct to win";
            vm.text4= " Enter If You Dare";


            vm.difficulty = function(a, b){
                let gameType = {win: a, loss: b}
                service.difficultyType(gameType);
                console.log(gameType);
                return gameType; 

            }            

    }
};

    settings.$inject = ["service"];


 angular
        .module("app")
        .component("settings", settings)
}
