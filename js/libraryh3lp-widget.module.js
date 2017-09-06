angular
  .module('libraryh3lpWidget', [])
  .filter('trustUrl', ['$sce', function ($sce) {
    return function(url) {
      if (/^http(s)?:\/\/(.+\.)?libraryh3lp\.com.+$/.test(url)) {
        return $sce.trustAsResourceUrl(url);
      }
    };
  }])
  .controller('libraryh3lpWidgetController', ['libraryh3lpWidgetConfig', '$scope', function(libraryh3lpWidgetConfig, $scope) {
    this.$onInit = () => {
      $scope.config = libraryh3lpWidgetConfig;
    }
  }])
  .component('prmExploreMainAfter', {
    bindings: {
      parentCtrl: '<'
    },
    controller: 'libraryh3lpWidgetController',
    template: '<button class="button chat-tab ss-chat js-toggle-chat" ng-init="showChatWidget = false" ng-click="showChatWidget = !showChatWidget">'+
                '<prm-icon style="z-index:1" icon-type="svg" svg-icon-set="{{config.icon.set}}" icon-definition="{{config.icon.icon}}"></prm-icon>'+
                '{{config.prompt}}'+
              '</button>'+
              '<div class="chat-frame-wrap" ng-show="showChatWidget">'+
              '<button class="chat-close ss-icon js-toggle-chat" title="Close chat window" ng-click="showChatWidget = !showChatWidget">&times;</button>'+
                '<iframe class="chat-frame" ng-src="{{config.url | trustUrl}}" frameborder="0"></iframe>'+
              '</div>'
  });
