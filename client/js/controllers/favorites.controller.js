(() => {
  angular
    .module('myApp')
    .controller('FavoritesController', FavoritesController);

  function FavoritesController(CurrentUser) {
    const vm = this;

    activate();

    function activate() {
      vm.currentuser = CurrentUser.data; // eslint-disable-line no-param-reassign
      vm.favorites = CurrentUser.data.favorites;
      console.log(vm.currentUser);
    }
  }
})();
