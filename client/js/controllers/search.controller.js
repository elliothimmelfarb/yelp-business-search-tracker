(() => {
  angular
    .module('myApp')
    .controller('SearchController', SearchController);

  function SearchController(SweetAlert, Yelp) {
    const vm = this;
    vm.search = search;

    function search(searchObj) {
      Yelp.search(searchObj)
        .then(res => {
          /* eslint-disable no-param-reassign */
          Yelp.currentParams = searchObj;
          Yelp.resultsPage = 1;
          vm.searchResults = Yelp.currentResults = res.data.businesses;
          /* eslint-enable no-param-reassign */
          console.log(vm.searchResults[0]);
        })
        .catch(err => {
          SweetAlert.swal('Search Failed:', err.data.error);
        })
        .then(() => {
          vm.searchObj = {};
        });
    }
  }
})();
