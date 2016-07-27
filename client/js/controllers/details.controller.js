(() => {
  angular
    .module('myApp')
    .controller('DetailsController', DetailsController);

  function DetailsController(CurrentBusiness, User, SweetAlert) {
    const vm = this;
    vm.addFavorite = addFavorite;
    vm.removeFavorite = removeFavorite;

    activate();

    function checkFavorited(yelpId) {
      User.getFavorites()
        .then(favorites => {
          if (favorites.filter(fav => fav.yelpId === yelpId).length) vm.isFavorited = true;
          else vm.favorited = false;
        })
        .catch(err => {
          SweetAlert.swal(err);
        });
    }

    function addFavorite(businessObj) {
      return User.addFavorite(businessObj)
        .then(() => {
          vm.isFavorited = true;
          vm.business.favorited++;
        })
        .catch(err => {
          SweetAlert.swal(err);
        });
    }

    function removeFavorite(yelpId) {
      return User.removeFavorite(yelpId)
        .then(() => {
          vm.isFavorited = false;
          vm.business.favorited--;
        });
    }

    function activate() {
      vm.business = CurrentBusiness.data;
      checkFavorited(vm.business.id);
    }
  }
})();
