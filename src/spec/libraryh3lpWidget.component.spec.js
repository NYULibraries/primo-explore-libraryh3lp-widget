const libraryh3lpWidgetConfig = __fixtures__['libraryh3lpWidgetConfig'];

describe('libraryh3lpWidget component', () => {
  beforeEach(module('libraryh3lpWidget', ($provide) => {
    $provide.constant("libraryh3lpWidgetConfig", libraryh3lpWidgetConfig);
  }));

  let element, scope;
  const data = [null, null, null]
  beforeEach(inject(function (_$compile_, _$rootScope_) {
    const $compile = _$compile_;
    const $rootScope = _$rootScope_;
    scope = $rootScope.$new();

    const parentCtrl = {
      userSessionManagerService: {
        searchStateService: {
          resultObject: {
            data,
          }
        }
      }
    };

    scope.parentCtrl = parentCtrl;

    element = angular.element(`<prm-silent-login-after parent-ctrl="parentCtrl" />`);
    element = $compile(element)(scope);
    scope.$digest();
  }));

  describe('buttons', () => {
    let btns;
    beforeEach(() => {
      btns = element.find('button');
    });
    it('should have two', () => {
      expect(btns.length).toEqual(2);
    });

    describe('open button', () => {
      let btn;
      beforeEach(() => {
        btn = btns[0];
      });

      describe('dynamic classes', () => {
        it('should have ng-class directive', () => {
          const ngClass = btn.getAttribute('ng-class');
          expect(ngClass).toBeTruthy();
        });

        it('should have chat-bottom-padding class', () => {
          const hasClass = btn.className.indexOf('chat-bottom-padding') > -1;
          expect(hasClass).toBe(true);
        });

        it('shouuld not have chat-bottom-padding class if search data empty', () => {
          data.splice(0, data.length); // empty data
          scope.$digest();
          const hasClass = btn.className.indexOf('chat-bottom-padding') > -1;
          expect(hasClass).toBe(false);
        });

        afterEach(() => {
          data.splice(0, data.length);
          data.push(null, null, null);
        });
      });

      it('should have ng-click directive', () => {
        const ngClick = btn.getAttribute('ng-click');
        expect(ngClick).toBeTruthy();
      });

      it('should have ng-init directive', () => {
        const ngInit = btn.getAttribute('ng-init');
        expect(ngInit).toBeTruthy();
      });
    });

    describe('close button', () => {
      let btn;
      beforeEach(() => {
        btn = btns[0];
      });

      it('should have ng-click directive', () => {
        const ngClick = btn.getAttribute('ng-click');
        expect(ngClick).toBeTruthy();
      });
    });

  });

  describe('chat window frame', () => {
    let chatFrame;
    beforeEach(() => {
      chatFrame = element.find('div')[0];
    });

    it('should have ng-class directive', () => {
      const ngClass = chatFrame.getAttribute('ng-class');
      expect(ngClass).toBeTruthy();
    });

    it('should have ng-show directive, and ng-hide class', () => {
      const ngShow = chatFrame.getAttribute('ng-show');
      expect(ngShow).toBeTruthy();
    });

    it('should contain a single iframe', () => {
      const iframe = chatFrame.getElementsByTagName('iframe');
      expect(iframe.length).toEqual(1);
    });

    describe('iframe', () => {
      let iframe;
      beforeEach(() => {
        iframe = chatFrame.getElementsByTagName('iframe')[0];
      });

      it('should use ng-src directive based on config url', () => {
        const ngSrc = iframe.getAttribute('ng-src');
        expect(ngSrc).toEqual(libraryh3lpWidgetConfig.url);
      });
    });
  });
});
