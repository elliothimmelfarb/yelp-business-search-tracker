(() => {
  angular
    .module('myApp')
    .service('Yelp', Yelp);

  function Yelp($http) {
    this.search = search;
    this.getDetails = getDetails;
    this.currentResults = [];
    this.currentParams = {};
    this.resultsPage = 1;

    function getDetails(id) {
      return $http.get(`/api/yelp/business/${id.id}`);
    }

    function search(searchObj) {
      return $http.post('/api/yelp/search', searchObj);
    }
  }
})();
