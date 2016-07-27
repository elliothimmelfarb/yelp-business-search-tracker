(() => {
  angular
  .module('myApp')
    .config(auth);

  function auth($authProvider) {
    const authP = $authProvider;
    authP.loginUrl = '/api/users/login';
    authP.signupUrl = '/api/users/register';
  }
})();
