const libraryh3lpWidgetConfig = __fixtures__['libraryh3lpWidgetConfig'];

describe('libraryh3lpWidgetController', () => {

  beforeEach(module('libraryh3lpWidget', ($provide) => {
    $provide.constant('libraryh3lpWidgetConfig', libraryh3lpWidgetConfig);
  }));

  let  $scope, $componentController;
  let controller, bindings;
  let libraryh3lpWidgetResultsList;
  beforeEach(inject(function (_$rootScope_, _$componentController_, _libraryh3lpWidgetResultsList_) {
    libraryh3lpWidgetResultsList = _libraryh3lpWidgetResultsList_;
    const $rootScope = _$rootScope_;
    $componentController = _$componentController_;
    $scope = $rootScope.$new();

    controller = $componentController('prmSilentLoginAfter', { $scope }, bindings);
  }));

  describe('$onInit', () => {
    beforeEach(() => {
      spyOn(libraryh3lpWidgetResultsList, 'getLength').and.returnValue(0);
      controller.$onInit();
    });

    it('should be defined', () => {
      expect(controller.$onInit).toBeDefined();
    });

    it('should initialize config', () => {
      expect($scope.config).toBeDefined();
    });

    it('should intialize klasses', () => {
      expect($scope.klasses).toBeDefined();
    });

    it(`should getLength from libraryh3lpWidgetResultsList`, () => {
      expect(libraryh3lpWidgetResultsList.getLength).toHaveBeenCalled();
    });

    describe(`when initializing 'chat-bottom-padding'`, () => {
      it(`should be false if libraryh3lpWidgetResultsList.getLength() === 0`, () => {
        expect($scope.klasses['chat-bottom-padding']).toBe(false);
      });

      it(`should be true if libraryh3lpWidgetResultsList.getLength() > 0`, () => {
        libraryh3lpWidgetResultsList.getLength.and.returnValue(10);

        controller.$onInit();
        expect($scope.klasses['chat-bottom-padding']).toBe(true);
      });
    });
  });

  describe('$doCheck', () => {
    describe(`klasses responds to libraryh3lpWidgetResultsList.getLength() changes`, () => {
      beforeEach(() => {
        spyOn(libraryh3lpWidgetResultsList, 'updateLength').and.stub();
        spyOn(libraryh3lpWidgetResultsList, 'getLength').and.returnValue(0);
        controller.$onInit();
      });

      it(`should change klasses['chat-bottom-padding'] to true if > 0`, () => {
        libraryh3lpWidgetResultsList.getLength.and.returnValue(10);
        controller.$doCheck();
        expect($scope.klasses['chat-bottom-padding']).toBe(true);
      });

      it(`should change klasses['chat-bottom-padding'] to false if === 0`, () => {
        controller.$doCheck();
        expect($scope.klasses['chat-bottom-padding']).toBe(false);
      });
    });
  });
});
