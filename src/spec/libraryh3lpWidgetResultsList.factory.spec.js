describe('libraryh3lpWidgetResultsList factory', () => {
  let libraryh3lpWidgetResultsList;
  beforeEach(() => {
    module('libraryh3lpWidget');
    inject(function (_libraryh3lpWidgetResultsList_) {
      libraryh3lpWidgetResultsList = _libraryh3lpWidgetResultsList_;
    });
  });

  describe('getLength', () => {
    it('has the function', () => {
      expect(libraryh3lpWidgetResultsList.getLength).toBeDefined();
    });

    it('initialized to 0', () => {
      expect(libraryh3lpWidgetResultsList.getLength()).toEqual(0);
    });
  });

  describe('updateLength', () => {
    it('has the function', () => {
      expect(libraryh3lpWidgetResultsList.updateLength).toBeDefined();
    });

    it('updates the length', () => {
      libraryh3lpWidgetResultsList.updateLength(100);

      expect(libraryh3lpWidgetResultsList.getLength()).toEqual(100);
    });
  });
});