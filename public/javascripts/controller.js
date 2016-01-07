app.controller('HomeController', ['$scope', '$http','$location', '$rootScope', function($scope, $http, $location, $rootScope){
  if (localStorage.getItem("userId")) {
    var id = localStorage.getItem("userId");
    $http.post('/users/me',{user: id}).then(function(response) {
      $scope.username = response.data.rows[0].email;
      $rootScope.username = response.data.rows[0].email;
      console.log($scope.username);
    }, function() {
      // error
    });
  }
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
  });
  $scope.logout = function (){
    localStorage.clear();
    $rootScope.username = '';
    $location.path('/');
  };
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