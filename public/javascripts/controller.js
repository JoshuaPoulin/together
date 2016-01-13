app.controller('HomeController', ['$scope', '$http','$location', '$rootScope', function($scope, $http, $location, $rootScope){
  var socket = io();
  $scope.currentURL;
  $scope.showGroup;
  $scope.meetups;
  $scope.displayname;
  var groupURL = $location.path();

  socket.on('messageFeed', function(data){
    console.log("got a message", data)
    var chatRoom = document.location.pathname.split('/');
    $scope.messageArray = data.filter(function(item){
      return item.meetups_id == chatRoom[2];
    })
    $scope.$apply();
  })

  $http.get('../meetups').then(function(data){
    $scope.meetups = data.data[0];
    $scope.attendees = data.data[1];
    for(var i = 0; i < $scope.meetups.length; i++){
      $scope.meetups[i].attendees = 0;
      for(var j = 0; j < $scope.attendees.length; j++){
        if($scope.meetups[i].id == $scope.attendees[j].meetups_id){
          $scope.meetups[i].attendees++;
        }
      }
    }
  }).then(function(){
    // TODO: inject $routeParams instead of watching location
    $scope.$watch(function(){
      return $location.path();
    }, function(value){

      $scope.currentURL = value;
      var groupURL = value.split('/');
      $http.get("../group").then(function(response){
        console.log("these are the messages")
        $scope.messageArray = response.data.filter(function(item){
          return item.meetups_id == groupURL[2];
        })
      })
    
      var temp = value.split('/');
      if(temp[1] === "group"){
        for(var i = 0; i < $scope.meetups.length; i++){
          if($scope.meetups[i].id == temp[2]){
            $scope.showGroup = $scope.meetups[i];
          }
        }
      }
    })
  })

  if (localStorage.getItem("userId")) {
    var id = localStorage.getItem("userId");
    $http.post('/users/me',{user: id}).then(function(response) {
      $scope.username = response.data.rows[0].email;
      $rootScope.username = response.data.rows[0].email;
      $scope.displayname = response.data.rows[0].display;
      console.log($scope.displayname);
    }, function() {
      // error
    });
  }


  $scope.join = function(meetups){
    var id = localStorage.getItem("userId");
    $http.post('/users/me',{user: id}).then(function(response) {
      $http.post('../joinGroup', {user: response.data.rows[0], meetup: meetups}).then(function(response){
        for(var i = 0; i< $scope.meetups.length; i++){
          if($scope.meetups[i].id === meetups){
            $scope.meetups[i].attendees++
          }
        }
      })
    }, function() {
      // error
    }); 
  }
  $scope.logout = function (){
    localStorage.clear();
    $rootScope.username = '';
    $rootScope.$apply();
    $location.path('/');
  };
  $scope.submitChat = function(event){
    if(event.keyCode === 13){
      $scope.chat();
    }
  }

  $scope.chat = function(){
    console.log("I am chatting...")
    var message = $scope.chatbox;

    console.log(message, $scope.messageArray)
    var tempMessage = {};
        tempMessage.content = message;
        tempMessage.meetups_id = $scope.showGroup.id;
        tempMessage.users_display = $scope.displayname;
        tempMessage.url = document.location.pathname;
        tempMessage.date = Date.now();
    socket.emit('sendMessage', tempMessage);
    $scope.chatbox = null;
    groupURL = $scope.currentURL.split('/');
  }
}]);

app.controller('LoginController', ["$scope","$http", "$location", "$cookieStore", function($scope, $http, $location, $cookieStore){
  $scope.signup = function(signupForm) {
    $http.post('/users/signup', {user: signupForm}).then(function (response){
      localStorage.setItem("userId", response.data.rows[0].id);
      $location.path("/");
    }, function(){
        console.log('error');
    });
  };

  $scope.signin = function(signinForm) {
    $http.post('/users/signin', {user: signinForm}).then(function (response){
      localStorage.setItem("userId", response.data.rows[0].id);
      $location.path("/");
    }, function (){
      console.log('error');
    });
  };
}]);
app.controller('NewController', ["$scope","$http", "$location", "$cookieStore", function($scope, $http, $location, $cookieStore){
  $scope.createNew = function() {
    $scope.newMeetup.date = Date.parse($scope.newMeetup.date);
    console.log($scope.newMeetup.date);
    $http.post('../newMeetup', {user: $scope.newMeetup}).then(function(response){
      $location.path("/");
    }, function(){
      console.log("error");
    });
  };
}]);




