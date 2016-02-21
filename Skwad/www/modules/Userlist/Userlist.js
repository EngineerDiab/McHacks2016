/**
 * Created by mathieudiab on 16-02-20.
 */
angular.module('skwad.userlist', ['skwad.socketFactory'])

  .controller('UserlistCtrl', function($scope, $location, socketFactory) {
    $scope.usernames = [];

    socketFactory.addListHandler(function(data) {
        console.log(JSON.stringify(data));

        $scope.usernames = data;

        console.log("$scope.usernames = " + JSON.stringify(data));

    });

    socketFactory.addClearListHandler(function() {
        console.log("clearing list");
        $scope.usernames = [];
    });

    socketFactory.addScopeApply(function() {
      //FROMAGE
        $scope.$apply();
    })

    $scope.viewAccounts = function(){
      $location.path('accounts');
    };

    $scope.refreshUser = socketFactory.requestNearbyUsers;

  });
