/**
 * Created by mathieudiab on 16-02-20.
 */
angular.module('skwad.userlist', ['skwad.socketFactory'])

  .controller('UserlistCtrl', function($scope, $location, socketFactory) {
    $scope.usernames = [];

    socketFactory.addListHandler(function(data) {
        console.log(JSON.stringify(data));

        $scope.usernames.push({
            "fullnames": data.userID
        });

    });

    socketFactory.addClearListHandler(function() {

    });

    $scope.viewAccounts = function(){
      $location.path('accounts');
    };

    $scope.refreshUser = socketFactory.requestNearbyUsers;

  });
