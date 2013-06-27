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

  $scope.searchTwitter = function () {
      this.search = true;
      $http.get('/api/tsearch/' + this.searchQuery).success(function(data, status, headers, config) {
        $scope.twitterJSON = data;
        $scope.search = false;
      });
  };
}

function AccountCtrl($scope, $http, $location) {
  $scope.keywords = [];
  $scope.keywordBank = [];

  $scope.getKeywords = function() {
      $http.get('api/user/keywords').success(function(data, status, headers, config) {
        $scope.keywords = data.keywords;    
      });
  };

  $scope.getKeywordBank = function() {
      $http.get('api/user/keywordbank/spa').success(function(data, status, headers, config) {
        $scope.keywordBank = data.keywordBank;    
      });
  };
  
  $scope.searchTwitter = function () {
      this.search = true;
      $http.get('/api/tsearch/' + this.searchQuery).success(function(data, status, headers, config) {
        $scope.twitterJSON = data;
        $scope.search = false;
      });
  };

  $scope.addUserKeyword = function () {
      if (this.keywordTerm != null) {
          $http.get('/api/user/add-keyword/'+this.keywordTerm).success(function(data, status, headers, config){
              $scope.keywords = data;
          });
      }
  };
  
  $scope.removeKeyword = function (keyword) {
      $http.get('/api/user/remove-keyword/'+keyword).success(function(data, status, headers, config){
          $scope.keywords = data;
          });
  };
  $scope.removeKeywordBankTerm = function (keyword) {
      $http.get('/api/user/remove-keyword-bank-term/'+keyword).success(function(data, status, headers, config){
          $scope.keywordBank = data;
          });
  };
  $scope.getKeywords();
  $scope.getKeywordBank();
}

function MyCtrl1() {}
MyCtrl1.$inject = [];


function MyCtrl2() {
}
MyCtrl2.$inject = [];
