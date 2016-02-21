/**
 * Created by mathieudiab on 16-02-20.
 */
angular.module('skwad.accounts', [])

  .controller('AccountsCtrl', function($scope, $cordovaOauth) {

    var accounts = [
      {
        "account": "Facebook",
        auth: null
      },
      {
        "account": "Twitter",
        auth: null
      },
      {
        "account": "Instagram",
        auth: null
      },
      {
        "account": "LinkedIn",
        auth: null
      },
      {
        "account": "Email",
        auth: null
      },
      {
        "account": "Phone Number",
        auth: null
      }
    ];


    $scope.accounts = accounts;

    $scope.twitterLogin = function () {
      $cordovaOauth.twitter("4whKDCvg412Tg3NrufNFNO7wR", "q46VNMBoRjqs22y8EJm913wy4jjh2Q2JNFwgW4oAbKdZqP3AH1").then(function(result){
        console.log(JSON.stringify(result));
      }, function (error) {
        console.log("poop");
      });
    }

    $scope.facebookLogin = function() {
      $cordovaOauth.facebook("1666500190268334", ["email"]).then(function(result) {
        console.log(JSON.stringify(result));
      }, function(error) {
        console.log(error);
      });
    }


    $scope.instagramLogin = function(){
      $cordovaOauth.instagram("6dac6947026e410f887ff37c3666e71b", ['relationships']).then(function(result){
        console.log(JSON.stringify(result));
      }, function(error) {
        console.log(error);
      });

    }

    $scope.linkedLogin = function(){
    $cordovaOauth.linkedin("77dshqnvo9evlf", "8lfTZGLrvOPt2S4A", ['r_basicprofile', 'r_emailaddress', 'w_share'], "DCEeFWf45A53sdfKef424").then(function(result){
        console.log(JSON.stringify(result));
      }, function(error) {
        console.log(error);
      });

    }



  });
