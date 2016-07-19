// MainController
(() => {
  angular
    .module('myApp')
    .controller('MainController', MainController);

  function MainController(User, $state) {
    const vm = this;
    vm.isAuthenticated = isAuthenticated;
    vm.username = User.getUsername();
    vm.logout = logout;


    function isAuthenticated() {
      return User.isAuthenticated();
    }

    function logout() {
      User.logout()
        .then(() => {
          $state.go('home');
        });
    }
  }
})();
