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
  .controller('libraryh3lpWidgetController', ['libraryh3lpWidgetConfig', function (libraryh3lpWidgetConfig) {
    const ctrl = this;
    ctrl.$onInit = function () {
      ctrl.config = libraryh3lpWidgetConfig;
      ctrl.klasses = {
        'chat-bottom-padding': false
      };
    };

    ctrl.$doCheck = function () {
      ctrl.klasses = {
        'chat-bottom-padding': Boolean(ctrl.parentCtrl.userSessionManagerService.searchStateService.resultObject.data.length)
      };
    };
  }])
  .component('prmSilentLoginAfter', {
    controller: 'libraryh3lpWidgetController',
    bindings: {
      parentCtrl: '<',
    },
    template
  });