/**
 * Created by mathieudiab on 16-02-20.
 */
angular.module('skwad.accounts', [])

  .controller('AccountsCtrl', function($scope, $cordovaOauth) {
<<<<<<< HEAD
    function twitterLogin (){
      cordovaOauth.twitter("43KDzSuzdGWAployL1BjOxsTw","ZPGYMjbTuX4a9ftwhH7BLEw4EY7abCNrBO0XygpVcxrW2DRe4x");
=======
>>>>>>> diab

    }
    var accounts = [
      {"account": "Facebook",
        auth: null},
      {"account": "Twitter",
      auth: twitterLogin()},
      {"account": "Instagram",
        auth: instagramLogin()},
      {"account": "LinkedIn",
        auth: null},
      {"account": "Email",
        auth: null},
      {"account": "Phone Number",
        auth: null}
    ];


    $scope.accounts = accounts;


    function instagramLogin(){
      $cordovaOauth.instagram("6dac6947026e410f887ff37c3666e71b", ['relationships']).then(function(result){
        console.log(JSON.stringify(result));
      }, function(error) {
        // error
      });

    }



  });
