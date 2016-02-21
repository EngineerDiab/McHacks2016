/**
 * Created by gabriel on 2/20/2016.
 */

angular.module('skwad.socketFactory', ['skwad.settingsFactory'])

  .factory('socketFactory', function(settingsFactory, $cordovaGeolocation) {
      var socket = null;
      var nearby = null;
      var usernames = [];
      var addToList = null;
      var clearList = null;
      var forceApply = null;

      var geo = {
          latitude: null,
          longitude: null
      };

      function initialize() {

          console.log("initializing connection");
          socket = io("142.157.80.18:13033");

          console.log("emitting setup");
          socket.emit('setup', {
            userID: settingsFactory.getUsername(),
            latitude: geo.latitude,
            longitude: geo.longitude
          });

          socket.on('new nearby user', function(data) {

              console.log("received new user " + JSON.stringify(data));

              for (var index in usernames) {
                  var user = usernames[index];
                  if (user.fullname == data.userID) {
                      //Guy is already being displayed
                      return;
                  }
              }

              usernames.push({"fullname": data.userID});
              console.log(addToList);
              addToList(angular.copy(usernames));
              forceApply();

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
          addClearListHandler: function(callback) {
              clearList = callback;
          },
          addScopeApply: function(callback) {
              forceApply = callback;
          },
          requestNearbyUsers: function() {

              usernames = [];
              clearList();
              forceApply();

              console.log("requesting nearby users");

              $cordovaGeolocation
              .getCurrentPosition()
              .then(function (position) {
                  geo.latitude = position.coords.latitude;
                  geo.longitude = position.coords.longitude;
                  console.log(JSON.stringify(geo));

                  initialize();

                  console.log("Emitting request nearby");
                  socket.emit('request nearby');

              }, function(err) {
                  // error
                  console.log("error getting geoLocation: " + err.toString());
                  console.log("Error Code: " + err.code);
                  console.log("message: " + err.message);

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
          },

          //active (boolean value), prerequisite_data (object)
          syncHook: function(active, prerequisite_data) {
              this.activeHook = active;
              this.prerequisite_data = prerequisite_data;
          },
          syncPrerequisites: function(userID, facebookHook, twitterHook, linkedinHook, instagramHook, contactHook) {
              this.theirUserID = userID;
              this.facebookHook = facebookHook;
              this.twitterHook = twitterHook;
              this.linkedinHook = linkedinHook;
              this.instagramHook = instagramHook;
              this.contactHook = contactHook;
          }

      }

  });


