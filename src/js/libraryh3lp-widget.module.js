import template from '../html/template.html';

angular
  // Name our module
  .module('libraryh3lpWidget', [])
  // Add the libraryh3lp url to trusted url sources
  // so angular doesn't block it from an iframe
  .filter('trustUrl', ['$sce', function ($sce) {
    return function(url) {
      if (/^http(s)?:\/\/(.+\.)?libraryh3lp\.com.+$/.test(url)) {
        return $sce.trustAsResourceUrl(url);
      }
    };
  }])
  // Controller for the component below
  .controller('libraryh3lpWidgetController', ['libraryh3lpWidgetConfig', '$scope', function(libraryh3lpWidgetConfig, $scope) {
    const ctrl = this;
    this.$onInit = () => {
      $scope.config = libraryh3lpWidgetConfig;
      // Do facets exist?
      $scope.facetsExist = (() => {
        try {
          return (ctrl.parentCtrl.searchService.facetService.results.length > 0);
        } catch (e) {
          return false;
        }
      })();
      // Add the bottom padding class if there are facets
      $scope.bottomPadding = { ["chat-bottom-padding"]: $scope.facetsExist };
    };
  }])
  .component('prmSilentLoginAfter', {
    bindings: {
      parentCtrl: '<'
    },
    controller: 'libraryh3lpWidgetController',
    template
  });
