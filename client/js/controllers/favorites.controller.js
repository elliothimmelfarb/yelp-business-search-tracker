(() => {
  angular
    .module('myApp')
    .controller('FavoritesController', FavoritesController);

  function FavoritesController(CurrentUser, User) {
    const vm = this;

    activate();

    function activate() {
      vm.currentUser = CurrentUser.data;
      // eslint-disable-next-line no-param-reassign
      vm.favorites = User.favorites = CurrentUser.data.favorites;
    }
  }
})();
