(() => {
  angular
  .module('myApp')
    .config(states);

  function states($stateProvider, $urlRouterProvider) {
    $stateProvider
    .state('home', {
      url: '/',
      templateUrl: '/html/home.html',
    })
    .state('register', {
      url: '/register',
      templateUrl: '/html/register.html',
      controller: 'RegisterController',
      controllerAs: 'register',
    })
    .state('login', {
      url: '/login',
      templateUrl: '/html/login.html',
      controller: 'LoginController',
      controllerAs: 'login',
    })
    .state('search', {
      url: '/search',
      templateUrl: '/html/search.html',
      controller: 'SearchController',
      controllerAs: 'search',
    })
    .state('favorites', {
      url: '/favorites',
      templateUrl: '/html/favorites.html',
      controller: 'FavoritesController',
      controllerAs: 'favorites',
      resolve: {
        CurrentUser: (User) => User.getProfile(),
      },
    })
    .state('details', {
      url: '/details/:id',
      templateUrl: '/html/details.html',
      controller: 'DetailsController',
      controllerAs: 'details',
      resolve: {
        CurrentBusiness: (Yelp, $stateParams) => Yelp.getDetails($stateParams),
      },
    });
    $urlRouterProvider.otherwise('/');
  }
})();
