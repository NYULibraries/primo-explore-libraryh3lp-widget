const libraryh3lpWidgetConfigIframe = require('./fixtures/libraryh3lpWidgetConfig.iframe.json');
const libraryh3lpWidgetConfigScript = require('./fixtures/libraryh3lpWidgetConfig.script.json');

let libraryh3lpWidgetConfig = {};
describe('libraryh3lpInjectionService', () => {
  beforeEach(module('libraryh3lpWidget', $provide => {
    $provide.constant('libraryh3lpWidgetConfig', libraryh3lpWidgetConfig);
  }));

  describe('injectScript', () => {
    describe('without mode defined', () => {
      let libraryh3lpInjectionService;
      beforeEach(() => {
        Object.assign(libraryh3lpWidgetConfig, libraryh3lpWidgetConfigIframe);
        inject(function (_libraryh3lpInjectionService_) {
          libraryh3lpInjectionService = _libraryh3lpInjectionService_;
        });
      });

      it(`should warn the user that injectScript requires 'script' mode`, () => {
        spyOn(console, 'warn');
        libraryh3lpInjectionService.injectScript();

        expect(console.warn).toHaveBeenCalledWith(`library-h3lp configuration 'mode' must be set to 'script' for 'injectScript' function to run`);
        expect(console.warn).toHaveBeenCalledTimes(1);
      });
    });

    describe('script mode, url undefined', () => {
      let libraryh3lpInjectionService;
      beforeEach(() => {
        Object.assign(libraryh3lpWidgetConfig, libraryh3lpWidgetConfigScript, { url: undefined });
        inject(function (_libraryh3lpInjectionService_) {
          libraryh3lpInjectionService = _libraryh3lpInjectionService_;
        });
      });

      it(`should warn the user that injectScript requires 'url' parameter`, () => {
        spyOn(console, 'warn');
        libraryh3lpInjectionService.injectScript();

        expect(console.warn).toHaveBeenCalledWith(`library-h3lp configuration has set mode to 'script', but no 'url' paramater has been defined`);
        expect(console.warn).toHaveBeenCalledTimes(1);
      });
    });

    describe('script mode', () => {
      let libraryh3lpInjectionService;
      let createElementSpy, insertBeforeSpy;
      beforeEach(() => {
        Object.assign(libraryh3lpWidgetConfig, libraryh3lpWidgetConfigScript);
        inject(function (_libraryh3lpInjectionService_) {
          libraryh3lpInjectionService = _libraryh3lpInjectionService_;
        });
        createElementSpy = spyOn(document, 'createElement').and.callThrough();
        insertBeforeSpy = spyOn(document.getElementsByTagName("script")[0].parentNode, 'insertBefore').and.callThrough();
        libraryh3lpInjectionService.injectScript();
      });

      it(`should call createElement`, () => {
        expect(document.createElement).toHaveBeenCalledWith(`script`);
        expect(document.createElement).toHaveBeenCalledTimes(1);
      });

      it('should assign type, async, and src attributes', () => {
        const script = document.getElementsByTagName("script")[0];

        expect(script.type).toEqual('text/javascript');
        expect(script.async).toBe(true);
        expect(script.src).toEqual('http://libraryh3lp.com/js/libraryh3lp.js?7516');
      });

      it('should use insertBefore function on the parentNode', () => {
        expect(insertBeforeSpy).toHaveBeenCalledTimes(1);
      });

      afterEach(() => {
        createElementSpy.calls.reset();
        insertBeforeSpy.calls.reset();
      });
    });
  });

  afterEach(() => {
    libraryh3lpWidgetConfig = {};
  });
});