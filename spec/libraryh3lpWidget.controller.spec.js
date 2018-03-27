const libraryh3lpWidgetConfig = __fixtures__['libraryh3lpWidgetConfig'];

describe('libraryh3lpWidgetController', () => {

  beforeEach(module('libraryh3lpWidget', ($provide) => {
    $provide.constant('libraryh3lpWidgetConfig', libraryh3lpWidgetConfig);
  }));

  let  $scope, $componentController;
  let controller, bindings;
  beforeEach(inject(function(_$rootScope_, _$componentController_,) {
    const $rootScope = _$rootScope_;
    $componentController = _$componentController_;
    $scope = $rootScope.$new();

    // content of results irrelevant because it's just checking for length'
    const parentCtrl = {
      searchService: {
        facetService: {
          results: [null, null, null]
        }
      }
    };
    bindings = { parentCtrl };

    controller = $componentController('prmExploreMainAfter', { $scope }, bindings);
  }));

  describe('$onInit', () => {
    beforeEach(() => {
      controller.$onInit();
    });

    it('should be defined', () => {
      expect(controller.$onInit).toBeDefined();
    });

    it('should initialize config', () => {
      expect($scope.config).toBeDefined();
    });

    it('should intialize facetsExist', () => {
      expect($scope.facetsExist).toBeDefined;
    });

    it('should initialize facetsExist to false if no results', () => {
      const noResultsBinding = angular.copy(bindings);
      noResultsBinding.parentCtrl.searchService.facetService.results = [];

      const $noFacetsScope = $scope.$new();
      const noResultsController = $componentController('prmExploreMainAfter',
        { $scope: $noFacetsScope },
        noResultsBinding
      );

      noResultsController.$onInit();
      expect($noFacetsScope.facetsExist).toBe(false);
    });

    describe('if facetsExist', () => {
      it('should assign facetsExists to true', () => {
        expect($scope.facetsExist).toBe(true);
      });

      it('should have bottomPadding', () => {
        expect($scope.bottomPadding['chat-bottom-padding']).toBe(true);
      });
    });
  });

});
