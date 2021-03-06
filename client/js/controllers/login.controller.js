(() => {
  angular
    .module('myApp')
    .controller('LoginController', LoginController);

  function LoginController($rootScope, SweetAlert, User, $state) {
    const vm = this;
    vm.submit = login;

    function login(userObj) {
      User.login(userObj)
        .then(() => {
          $state.go('favorites');
        })
        .catch(err => {
          vm.user.email = null;
          vm.user.password = null;
          SweetAlert.swal('Login Failed:', err.data.error);
        });
    }
  }
})();
