'use strict';

/* Controllers */

function AppCtrl($scope, $http, $location) {
  $http({method: 'GET', url: '/api/name'}).
  success(function(data, status, headers, config) {
    $scope.name = data.name;
  }).
  error(function(data, status, headers, config) {
    $scope.name = 'Error!'
  });

  $http.get('/api/tsearch/xbox').success(function(data, status, headers, config) {
    $scope.tweets = data.tweets;    
  });

  $scope.searchTwitter = function () {
      this.search = true;
      $http.get('/api/tsearch/' + this.searchQuery).success(function(data, status, headers, config) {
        $scope.twitterJSON = data;
        $scope.search = false;
      });
  };

  $scope.signin = function() { 
      location.path('/auth/tiwtter');
  };
}

function MyCtrl1() {}
MyCtrl1.$inject = [];


function MyCtrl2() {
}
MyCtrl2.$inject = [];
