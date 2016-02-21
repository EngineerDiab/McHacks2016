angular.module('skwad.settingsFactory', [])

  .factory('settingsFactory', function() {
    var username = null;
    var facebookID = null;
    var twitterID = null;
    var linkedinID = null;
    var usernameToken = 'skwadUsername';

    return {
      loadUsername: function(){
        var username = window.localStorage[usernameToken];
        if(username){
          this.setUsername(username);
        }
      },
      getUsername: function(){
        return username;
      },
      setUsername: function(name){
        username = name;
        window.localStorage[usernameToken] = name;
      },
      getFacebookID: function(){
        return facebookID;
      },
      setFacebookID: function(id){
        facebookID = id;
      },
      getTwitterID: function(){
        return twitterID;
      },
      setTwitterID: function(id){
        twitterID = id;
      },
      getLinkedinID: function(){
        return linkedinID;
      },
      setLinkedinID: function(id){
        linkedinID = id;
      }
    };
  });
