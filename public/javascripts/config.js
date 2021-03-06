app.config(function($locationProvider, $routeProvider){
  $locationProvider.html5Mode(true)
  $routeProvider
    .when('/', {
      templateUrl: '/partials/home.html',
      controller: 'HomeController'
    })
    .when('/signup', {
      templateUrl: '/partials/signup.html',
      controller: "LoginController"
    })
    .when('/signin', {
      templateUrl: '/partials/signin.html',
      controller: "LoginController"
    })
    .when('/new', {
      templateUrl: '/partials/newmeetup.html',
      controller: 'NewController'
    })
    .when('/group/:id', {
      templateUrl: '/partials/group.html',
      controller: 'HomeController'
    })
})