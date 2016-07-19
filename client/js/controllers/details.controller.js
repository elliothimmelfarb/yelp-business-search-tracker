(() => {
  angular
    .module('myApp')
    .controller('DetailsController', DetailsController);

  function DetailsController(CurrentBusiness, User) {
    const vm = this;
    vm.addFavorite = addFavorite;

    activate();

    function addFavorite(yelpId) {
      console.log('here')
      return User.addFavorite(yelpId)
    }

    function activate() {
      vm.business = CurrentBusiness.data;
      console.log(vm.business);
    }
  }
})();
