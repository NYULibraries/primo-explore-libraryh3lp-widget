import template from '../html/template.html';

angular
  .module('libraryh3lpWidget', [])
  // Add the libraryh3lp url to trusted url sources
  // so angular doesn't block it from an iframe
  .filter('trustUrl', ['$sce', function ($sce) {
    return function (url) {
      if (/^http(s)?:\/\/(.+\.)?libraryh3lp\.com.+$/.test(url)) {
        return $sce.trustAsResourceUrl(url);
      }
    };
  }])
  .factory('libraryh3lpWidgetResultsList', function () {
    // A factory that is used to get/update state of 'results' across components
    const model = {
      length: 0
    };
    return {
      updateLength(newLength) {
        model.length = newLength;
      },
      getLength() {
        return model.length;
      }
    };
  })
  .controller('libraryh3lpWidgetController', ['libraryh3lpWidgetConfig', '$scope', 'libraryh3lpWidgetResultsList', function (libraryh3lpWidgetConfig, $scope, libraryh3lpWidgetResultsList) {
    // controller for the h3lp widget itself
    let prevResultsListLength;
    this.$onInit = function () {
      $scope.config = libraryh3lpWidgetConfig;
      $scope.klasses = {
        'chat-bottom-padding': false
      };
      prevResultsListLength = libraryh3lpWidgetResultsList.getLength();
    };

    this.$doCheck = function () {
      const newResultsListLength = libraryh3lpWidgetResultsList.getLength();
      if (newResultsListLength !== prevResultsListLength) {
        $scope.klasses['chat-bottom-padding'] = !!newResultsListLength;
        prevResultsListLength = newResultsListLength;
      }
    };
  }])
  .component('prmSilentLoginAfter', {
    controller: 'libraryh3lpWidgetController',
    template
  })
  .controller('libraryh3lpWidgetResultsListController', ['libraryh3lpWidgetResultsList', function (libraryh3lpWidgetResultsList) {
    // controller whose pure function is to maintain updated results length in the libraryh3lpWidgetResultsList factory
    const ctrl = this;
    let prevResultsListLength;
    this.$onInit = function () {
      prevResultsListLength = ctrl.parentCtrl.searchService.facetService.results.length;
      libraryh3lpWidgetResultsList.updateLength(prevResultsListLength);
    };

    this.$doCheck = function () {
      const newResultsListLength = ctrl.parentCtrl.searchService.facetService.results.length;
      if (newResultsListLength !== prevResultsListLength) {
        libraryh3lpWidgetResultsList.updateLength(newResultsListLength);
        prevResultsListLength = newResultsListLength;
      }
    };
  }])
  .component('prmExploreMainAfter', {
    bindings: {
      parentCtrl: '<',
    },
    controller: 'libraryh3lpWidgetResultsListController',
  });