var app = angular.module("airQuality", ["ngRoute"]);

app.filter('capitalize', function () {
    return function (input) {
        return (!!input) ? input.charAt(0).toUpperCase() + input.substr(1).toLowerCase() : '';
    }
});

app.config(function ($routeProvider) {

    $routeProvider

        .when('/', {
            templateUrl: 'pages/main.html',
            controller: 'homeController'


        })
        .when('/search', {
            templateUrl: 'pages/search.html',
            controller: 'searchController'


        })
});

app.service('cityService', function () {
    this.city = "New York";

});

app.service('styleService', function () {
    var myEl = angular.element(document.querySelector('#custom'));
    myEl.addClass('customShow');
})

app.controller('searchController', ['$scope', 'cityService', '$http', function ($scope, cityService, $http) {
    $scope.foundCity = cityService.city;

    $scope.$watch('fondCity', function () {
        cityService.city = $scope.foundCity;
    });

    $scope.getCity = function () {
        var newUrl = "http://api.waqi.info/feed/" + $scope.foundCity + "/?token=5336bd836b9ec064f6c6fe0bf7e2781838c15c87";
        $http({
            method: "GET",
            url: newUrl
        }).then(function mySucces(response) {
            $scope.newData = response.data;

        }, function myError(response) {
            $scope.newData = response.statusText;
        });


        $scope.newCity = $scope.foundCity;
    }



}]);

app.controller('homeController', ['$scope', '$http', function ($scope, $http) {

    var cityArr = ["London", "Beijing", "Tokyo", "Chicago", "Tel Aviv", "HongKong"];
    $scope.newData = {};

    angular.forEach(cityArr, function (value) {
        var newUrl = "http://api.waqi.info/feed/" + value + "/?token=5336bd836b9ec064f6c6fe0bf7e2781838c15c87";
        $scope.dataLoaded = false;
        $http({
            method: "GET",
            url: newUrl
        }).then(function mySucces(response) {
            $scope.dataLoaded = true;
            $scope.newData[value] = response.data;


        }, function myError(response) {
            $scope.newData = response.statusText;
        });
    })
}]);

app.directive("airIndexDirective", function () {
    return {
        restrict: 'EA',
        templateUrl: 'pages/airIndexDirective.html'


    }
})
