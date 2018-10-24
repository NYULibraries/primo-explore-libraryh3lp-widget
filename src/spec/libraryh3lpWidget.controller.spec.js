const libraryh3lpWidgetConfig = __fixtures__['libraryh3lpWidgetConfig'];

describe('libraryh3lpWidgetController', () => {

  beforeEach(module('libraryh3lpWidget', ($provide) => {
    $provide.constant('libraryh3lpWidgetConfig', libraryh3lpWidgetConfig);
  }));

  let  $scope, $componentController;
  let controller, bindings;
  const resultsList = [];
  beforeEach(inject(function (_$rootScope_, _$componentController_) {
    const $rootScope = _$rootScope_;
    $componentController = _$componentController_;
    $scope = $rootScope.$new();

    bindings = {
      parentCtrl: {
        userSessionManagerService: {
          searchStateService: {
            resultObject: {
              data: resultsList,
            }
          }
        }
      }
    };

    controller = $componentController('prmSilentLoginAfter', { $scope }, bindings);
  }));

  describe('$onInit', () => {
    beforeEach(() => {
      controller.$onInit();
    });

    it('should be defined', () => {
      expect(controller.$onInit).toBeDefined();
    });

    it('should initialize config', () => {
      expect(controller.config).toBeDefined();
    });

    it('should intialize klasses', () => {
      expect(controller.klasses).toBeDefined();
    });

    describe('klasses', () => {
      describe(`'chat-bottom-padding'`, () => {
        it(`should be initialized as false`, () => {
          expect(controller.klasses['chat-bottom-padding']).toBe(false);
        });
      });
    });
  });

  describe('$doCheck', () => {
    describe(`klasses responds to results length changes`, () => {
      beforeEach(() => {
        controller.$onInit();
      });

      it(`should change klasses['chat-bottom-padding'] to true if > 0`, () => {
        resultsList.push(null, null, null);
        controller.$doCheck();
        expect(controller.klasses['chat-bottom-padding']).toBe(true);
      });

      it(`should change klasses['chat-bottom-padding'] to false if === 0`, () => {
        resultsList.push(null, null, null);
        controller.$doCheck();
        resultsList.splice(0, resultsList.length); // mutate array to empty it
        controller.$doCheck();
        expect(controller.klasses['chat-bottom-padding']).toBe(false);
      });
    });

    afterEach(() => {
      resultsList.splice(0, resultsList.length);
      resultsList.push(null, null, null);
    });
  });
});
