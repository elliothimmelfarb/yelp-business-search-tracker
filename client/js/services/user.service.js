(() => {
  angular
    .module('myApp')
    .service('User', User);

  function User($http, $auth) {
    this.login = login;
    this.register = register;
    this.getProfile = getProfile;
    this.logout = logout;
    this.isAuthenticated = isAuthenticated;
    this.getUsername = getUsername;
    this.addFavorite = addFavorite;
    this.removeFavorite = removeFavorite;

    function addFavorite(yelpId) {
      const userId = $auth.getPayload()._id;
      return $http.put(`api/users/${userId}/addFavorite/${yelpId}`);
    }

    function removeFavorite(yelpId) {
      const userId = $auth.getPayload()._id;
      return $http.delete(`api/users/${userId}/removeFavorite/${yelpId}`);
    }

    function isAuthenticated() {
      return $auth.isAuthenticated();
    }

    function getUsername() {
      if (!$auth.getPayload()) {
        return 'No payload';
      }
      return $auth.getPayload().username;
    }

    function logout() {
      return $auth.logout()
        .then(() => {
          this.loggedIn = false;
        });
    }

    function getProfile() {
      return $http.get('api/users/profile');
    }

    function register(userObj) {
      return $auth.signup(userObj);
    }

    function login(userObj) {
      return $auth.login(userObj);
    }
  }
})();
