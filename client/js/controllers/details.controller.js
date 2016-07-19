(() => {
  angular
    .module('myApp')
    .controller('DetailsController', DetailsController);

  function DetailsController(CurrentBusiness, User, $state) {
    const vm = this;
    vm.addFavorite = addFavorite;
    vm.removeFavorite = removeFavorite;

    activate();

    function addFavorite(yelpId) {
      return User.addFavorite(yelpId);
    }

    function removeFavorite(yelpId) {
      return User.removeFavorite(yelpId)
        .then(() => {
          $state.go('favorites');
        });
    }

    function activate() {
      vm.business = CurrentBusiness.data;
    }
  }
})();
