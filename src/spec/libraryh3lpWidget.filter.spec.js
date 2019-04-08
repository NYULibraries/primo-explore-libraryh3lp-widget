const libraryh3lpWidgetConfig = require('./fixtures/libraryh3lpWidgetConfig.iframe.json');

describe('trustUrl filter', () => {

  let trustUrl, $sce;
  beforeEach(() => {
    module('libraryh3lpWidget');
    inject(function(_trustUrlFilter_, _$sce_) {
      trustUrl = _trustUrlFilter_;
      $sce = _$sce_;
    });
  });

  const validUrls = [
    'https://us.libraryh3lp.com/chat/ask@chat.libraryh3lp.com?skin=1',
    'http://libraryh3lp.com/chat/'
  ];
  describe('if the url is valid', () => {
    it('should call $sce.trustAsResourceUrl with valid URL', () => {
      spyOn($sce, 'trustAsResourceUrl');

      validUrls.forEach(url => {
        trustUrl(url);
        expect($sce.trustAsResourceUrl).toHaveBeenCalledWith(url);
      });
    });
  });

  const invalidUrls = [
    'http://invalid.url',
    'http://libraryhelp.com/chat/',
    'https://libraryh3lp.net/chat/',
    'ftp://libraryh3lp.com/chat/',
  ];
  describe('if the url is invalid', () => {
    it('should return undefined', () => {
      invalidUrls.forEach(url => {
        const filtered = trustUrl(url);
        expect(filtered).toBe(undefined);
      });

    });

    it('should not call $sce.trustAsResourceURL', () => {
      spyOn($sce, 'trustAsResourceUrl');

      invalidUrls.forEach(url => {
        trustUrl(url);
        expect($sce.trustAsResourceUrl).not.toHaveBeenCalled();
      });
    });
  });
});
