"use strict";
{
    angular
        .module("app")
        .config(($routeProvider) => {
			$routeProvider
			.when("/home", {
				template: "<home></home>"
			})
			.when("/game", {
				template: "<game></game>"
			})
			.when("/settings",{
				template: "<settings></settings>"
			})
			.otherwise({ redirectTo: "/home" });
	});
}

