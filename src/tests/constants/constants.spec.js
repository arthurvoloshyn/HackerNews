import { PATHS, PAGES, HITS } from '../../constants/constants';

describe('Constants', () => {
  describe('PATHS constant', () => {
    it('should match the snapshot', () => {
      expect(PATHS).toMatchSnapshot();
    });
  });

  describe('PAGES constant', () => {
    it('should match the snapshot', () => {
      expect(PAGES).toMatchSnapshot();
    });
  });

  describe('HITS constant', () => {
    it('should match the snapshot', () => {
      expect(HITS).toMatchSnapshot();
    });
  });
});
