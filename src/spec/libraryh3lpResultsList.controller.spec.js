const libraryh3lpWidgetConfig = __fixtures__['libraryh3lpWidgetConfig'];

describe('libraryh3lpWidgetResultsListController', () => {

  beforeEach(module('libraryh3lpWidget', ($provide) => {
    $provide.constant('libraryh3lpWidgetConfig', libraryh3lpWidgetConfig);
  }));

  let  $scope, $componentController;
  let controller, bindings;
  let libraryh3lpWidgetResultsList;
  const parentCtrl = {};
  beforeEach(inject(function (_$rootScope_, _$componentController_, _libraryh3lpWidgetResultsList_) {
    libraryh3lpWidgetResultsList = _libraryh3lpWidgetResultsList_;
    const $rootScope = _$rootScope_;
    $componentController = _$componentController_;
    $scope = $rootScope.$new();

    // content of results irrelevant because it's just checking for length'
    angular.merge(parentCtrl, {
      searchService: {
        facetService: {
          results: [null, null, null]
        }
      }
    });
    bindings = { parentCtrl };

    controller = $componentController('prmExploreMainAfter', { $scope }, bindings);
  }));

  describe('$onInit', () => {
    beforeEach(() => {
      spyOn(libraryh3lpWidgetResultsList, 'getLength');
      spyOn(libraryh3lpWidgetResultsList, 'updateLength');
      controller.$onInit();
    });

    it('should be defined', () => {
      expect(controller.$onInit).toBeDefined();
    });

    it(`should call libraryh3lpWidgetResultsList.updateLength with length of results`, () => {
      expect(libraryh3lpWidgetResultsList.updateLength).toHaveBeenCalledWith(3);
    });
  });

  describe(`$doCheck`, () => {
    beforeEach(() => {
      spyOn(libraryh3lpWidgetResultsList, 'getLength');
      spyOn(libraryh3lpWidgetResultsList, 'updateLength');
      controller.$onInit();

      libraryh3lpWidgetResultsList.updateLength.calls.reset();
      controller.$doCheck();
    });

    describe(`if length has not changed`, () => {
      it(`shouldn't updateLength`, () => {
        expect(libraryh3lpWidgetResultsList.updateLength).not.toHaveBeenCalled();
      });
    });

    describe(`if length has changed`, () => {
      it(`should updateLength with new length`, () => {
        parentCtrl.searchService.facetService.results.push(null);
        controller.$doCheck();
        expect(libraryh3lpWidgetResultsList.updateLength).toHaveBeenCalledWith(4);

        parentCtrl.searchService.facetService.results = [];
        controller.$doCheck();
        expect(libraryh3lpWidgetResultsList.updateLength).toHaveBeenCalledWith(0);
      });
    });
  });
});
