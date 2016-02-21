/**
 * Created by mathieudiab on 16-02-20.
 */
angular.module('skwad.accounts', [])

  .controller('AccountsCtrl', function($scope, $cordovaOauth, $http) {



    var accounts = [
      {
        "account": "Facebook",
        "accessToken": null,
        "userID": null
      },
      {
        "account": "Twitter",
        "accessToken": null,
        "userID": null
      },
      {
        "account": "Instagram",
        "accessToken": null,
        "userID": null
      },
      {
        "account": "LinkedIn",
        "accessToken": null,
        "userID": null
      },
      {
        "account": "Email",
        "accessToken": null,
        "userID": null
      },
      {
        "account": "Phone Number",
        "accessToken": null,
        "userID": null
      }
    ];


    $scope.accounts = accounts;

    $scope.twitterLogin = function () {
      $cordovaOauth.twitter("4whKDCvg412Tg3NrufNFNO7wR", "q46VNMBoRjqs22y8EJm913wy4jjh2Q2JNFwgW4oAbKdZqP3AH1").then(function(result){
        console.log(JSON.stringify(result));
      }, function (error) {
        console.log("poop");
      });
    };

    $scope.facebookLogin = function() {
      $cordovaOauth.facebook("1666500190268334", ["email"]).then(function(result) {
        accounts[0].accessToken = result;
        console.log(accounts[0].accessToken);
      }, function(error) {
        console.log(error);
      });
    };


    $scope.instagramLogin = function(){
      $cordovaOauth.instagram("6dac6947026e410f887ff37c3666e71b", ['relationships', 'public_content', 'basic']).then(function(result){

        accounts[2].accessToken = result.access_token;
        console.log(JSON.stringify(accounts[2].accessToken));
        getUserInsta().then(function(response){
          console.log("success: "+JSON.stringify(response.data.id));
          accounts[2].userID = response.data.id;
        }, function(error){
          console.log("error: "+JSON.stringify(error));
        });
        //followInsta();
      }, function(error) {
        console.log(error);
      });

    };

    function followInsta(){
      $http.post("https://api.instagram.com/v1/users/" + accounts[2].userID + "/relationship?access_token=" + accounts[2].accessToken.get())
        .then(function(response) {
          $scope.myWelcome = response.data;
          console.log(response.data);
        });
    };

    function getUserInsta(){
      return $http.get("https://api.instagram.com/v1/users/self/?access_token=" + accounts[2].accessToken);
    };



    $scope.linkedLogin = function(){
    $cordovaOauth.linkedin("77dshqnvo9evlf", "8lfTZGLrvOPt2S4A", ['r_basicprofile', 'r_emailaddress', 'w_share'], "DCEeFWf45A53sdfKef424").then(function(result){
        console.log(JSON.stringify(result));
      }, function(error) {
        console.log(error);
      });

    }



  });
