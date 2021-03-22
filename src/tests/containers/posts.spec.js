import React from 'react';

import { PAGES, PATHS } from '../../constants/constants';
import Posts from '../../containers/posts/posts';

import { NEWS } from '../stubs/stubs';

const mockJsonPromise = Promise.resolve({ hits: NEWS, page: 1, nbPages: 10 });
const mockFetchPromise = Promise.resolve({ json: () => mockJsonPromise });
global.fetch = jest.fn().mockImplementation(() => mockFetchPromise);

const setUp = () => shallow(<Posts />);

describe('Posts component', () => {
  const { BASE_PATH, SEARCH_PATH, SEARCH_PARAM, PAGE_HITS, PAGE_PARAM } = PATHS;

  const INIT_PAGE = 10;

  const defaultSearchQuery = '';
  const defaultHitsPerPage = 20;
  const defaultPage = 0;

  let component;
  let instance;

  beforeEach(() => {
    component = setUp();
    instance = component.instance();
  });

  it('should render Posts component', () => {
    expect(component).toMatchSnapshot();
  });

  it('should call fetch in componentDidMount', () => {
    const SEARCH_PARAMS = `${SEARCH_PARAM}${defaultSearchQuery}&${PAGE_HITS}${defaultHitsPerPage}&${PAGE_PARAM}${defaultPage}`;

    expect(global.fetch).toHaveBeenCalledWith(`${BASE_PATH}${SEARCH_PATH}?${SEARCH_PARAMS}`);
  });

  describe('should call fetch and reject', () => {
    beforeAll(() => {
      global.fetch = jest.fn().mockImplementationOnce(() => Promise.reject(new Error()));
    });

    afterAll(() => {
      global.fetch = jest.fn().mockImplementation(() => mockFetchPromise);
    });

    it('fetches news from an API and reject', () => {
      const wrapper = component.find('.error');
      expect(wrapper.length).toBe(1);
    });
  });

  describe('updatePage method', () => {
    beforeEach(() => {
      instance.updatePage(INIT_PAGE);
    });

    it("should update state 'page' value", () => {
      expect(component.state().page).toBe(INIT_PAGE);
    });

    it('should call fetch with given argument', () => {
      const SEARCH_PARAMS = `${SEARCH_PARAM}${defaultSearchQuery}&${PAGE_HITS}${defaultHitsPerPage}&${PAGE_PARAM}${INIT_PAGE}`;

      expect(global.fetch).toHaveBeenCalledWith(`${BASE_PATH}${SEARCH_PATH}?${SEARCH_PARAMS}`);
    });
  });

  describe('handlePageChange method', () => {
    beforeEach(() => {
      instance.updatePage = jest.fn();
      instance.setState({ page: INIT_PAGE });
    });

    const handlePageChange = dataName =>
      instance.handlePageChange({
        target: { getAttribute: jest.fn().mockReturnValue(dataName) },
      });

    it("should call 'updatePage' with given argument", () => {
      handlePageChange('1');
      expect(instance.updatePage).toHaveBeenCalledWith(1);
    });

    it("should call 'updatePage' with increased value", () => {
      handlePageChange(PAGES.PREV);
      expect(instance.updatePage).toHaveBeenCalledWith(INIT_PAGE - 1);
    });

    it("should call 'updatePage' with decreased value", () => {
      handlePageChange(PAGES.NEXT);
      expect(instance.updatePage).toHaveBeenCalledWith(INIT_PAGE + 1);
    });

    it("should call 'updatePage' with incorrect value", () => {
      handlePageChange('Test');
      expect(instance.updatePage).toHaveBeenCalledTimes(0);
    });
  });

  describe('Posts handlers', () => {
    describe('should handle search input value', () => {
      it('before handling the search input value', () => {
        expect(component.state().searchQuery).toBe(defaultSearchQuery);
      });

      it('after handling the search input value', () => {
        instance.handleInputChange({ target: { value: 'test' } });
        expect(component.state().searchQuery).toBe('test');
      });
    });

    describe('should handle change of hits per page', () => {
      it('before handling the change of hits per page', () => {
        expect(component.state().hitsPerPage).toBe(defaultHitsPerPage);
      });

      it('after handling the change of hits per page', () => {
        instance.handleHitsChange({ target: { value: String(INIT_PAGE) } });
        expect(component.state().hitsPerPage).toBe(INIT_PAGE);
      });
    });

    describe('should handle change page if key clicked', () => {
      beforeEach(() => {
        instance.setState({ page: INIT_PAGE });
      });

      const getSearch = key => instance.getSearch({ key });

      it("should handle change page if 'Enter' clicked", () => {
        getSearch('Enter');
        expect(component.state().page).toBe(defaultPage);
      });

      it("should not change page if 'a' button clicked", () => {
        getSearch('a');
        expect(component.state().page).toBe(INIT_PAGE);
      });
    });
  });
});
