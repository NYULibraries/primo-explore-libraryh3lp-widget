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

      ctrl.mode = libraryh3lpWidgetConfig.mode;

      if (ctrl.mode === undefined) {
        console.warn('By defaut, using the "iframe" setting for libaryh3lp widget.'+
          'This default will be deprecated in future verions.'+
          'In your configuration option, please select an explicit "mode" ("script" or "iframe")'
        );
        ctrl.mode = 'iframe';
      }
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
  })
  .factory('libraryh3lpInjectionService', ['libraryh3lpWidgetConfig', '$document', function (libraryh3lpWidgetConfig, $document) {
    const { url, mode } = libraryh3lpWidgetConfig;
    const document = $document[0];

    return {
      injectScript() {
        if (mode !== 'script') {
          console.warn(`library-h3lp configuration 'mode' must be set to 'script' for 'injectScript' function to run`);
          return;
        }
        if (!url) {
          console.warn(`library-h3lp configuration has set mode to 'script', but no 'url' paramater has been defined`);
          return;
        }

        var x = document.createElement("script");
        x.type = "text/javascript";
        x.async = true;
        x.src = (document.location.protocol === "https:" ? "https://" : "http://") + url.replace(/(^\w+:|^)\/\//, '');
        var y = document.getElementsByTagName("script")[0];
        y.parentNode.insertBefore(x, y);
      }
    };
  }]);