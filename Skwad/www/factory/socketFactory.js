/**
 * Created by gabriel on 2/20/2016.
 */

angular.module('skwad.socketFactory', ['skwad.settingsFactory'])

  .factory('socketFactory', function(settingsFactory, $cordovaGeolocation) {
      var socket = null;
      var nearby = null;
      var addToList = null;

      var geo = {
          latitude: null,
          longitude: null
      };

      function initialize() {

          socket = io("142.157.80.44:13033");

          socket.emit('setup', {
            userID: settingsFactory.getUsername(),
            latitude: geo.latitude,
            longitude: geo.longitude
          });

          socket.on('new nearby user', function(data) {

            console.log("received new user " + JSON.stringify(data));

            addToList(data);

          });

          socket.on('request sync response', function(resp) {
            if (resp != 'success') {
              //TODO: Display that the sync failed
            }
          });

          socket.on('sync data response', function(data) {
            //TODO: integrate with code to perform the sync

          });

          socket.on('deny sync response', function(data) {
            //TODO: notify that the other user has denied the sync

          });

      }

      return {
          addListHandler: function(callback) {
              addToList = callback;
          },
          requestNearbyUsers: function() {

              console.log("requesting nearby users");

              $cordovaGeolocation
              .getCurrentPosition()
              .then(function (position) {
                  geo.latitude = position.coords.latitude;
                  geo.longitude = position.coords.longitude;

                  console.log(settingsFactory.getUsername());

                  initialize();

                  console.log("Emitting request nearby");
                  socket.emit('request nearby');

                  }, function(err) {
                  // error

              });

          },
          requestSync: function(data) {
              //re initialize
              initialize();

              socket.emit('request sync', data);

          },
          acceptSync: function(data) {
              initialize();

              socket.emit('sync request accepted', data);

          },
          declineSync: function(data) {
              initialize();

              socket.emit('sync request refused', data);
          }

      }

  });


