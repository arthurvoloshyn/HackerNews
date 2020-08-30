import React from 'react';

import {
  BASE_PATH,
  SEARCH_PATH,
  SEARCH_PARAM,
  PAGE_HITS,
  PAGE_PARAM,
  NEXT_PAGE,
  PREV_PAGE,
} from '../../constants/constants';
import Posts from '../../containers/posts/posts';

import { NEWS } from '../stubs/stubs';

const mockJsonPromise = Promise.resolve({ hits: NEWS, page: 1, nbPages: 10 });
const mockFetchPromise = Promise.resolve({ json: () => mockJsonPromise });
global.fetch = jest.fn().mockImplementation(() => mockFetchPromise);

const setUp = () => shallow(<Posts />);

describe('Posts component', () => {
  const DEFAULT_PAGE = 10;

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

  describe('updatePage method', () => {
    it("should update state 'page' value", () => {
      instance.updatePage(DEFAULT_PAGE);
      expect(component.state().page).toBe(DEFAULT_PAGE);
    });

    it('should call fetch with given argument', () => {
      const SEARCH_PARAMS = `${SEARCH_PARAM}${defaultSearchQuery}&${PAGE_HITS}${defaultHitsPerPage}&${PAGE_PARAM}${DEFAULT_PAGE}`;

      instance.updatePage(DEFAULT_PAGE);
      expect(global.fetch).toHaveBeenCalledWith(`${BASE_PATH}${SEARCH_PATH}?${SEARCH_PARAMS}`);
    });
  });

  describe('handlePageChange method', () => {
    it("should call 'updatePage' with given argument", () => {
      instance.updatePage = jest.fn();
      instance.setState({ page: DEFAULT_PAGE });
      instance.handlePageChange({
        target: { getAttribute: jest.fn().mockReturnValue('1') },
      });
      expect(instance.updatePage).toHaveBeenCalledWith(1);
    });

    it("should call 'updatePage' with increased value", () => {
      instance.updatePage = jest.fn();
      instance.setState({ page: DEFAULT_PAGE });
      instance.handlePageChange({
        target: { getAttribute: jest.fn().mockReturnValue(PREV_PAGE) },
      });
      expect(instance.updatePage).toHaveBeenCalledWith(DEFAULT_PAGE - 1);
    });

    it("should call 'updatePage' with decreased value", () => {
      instance.updatePage = jest.fn();
      instance.setState({ page: DEFAULT_PAGE });
      instance.handlePageChange({
        target: { getAttribute: jest.fn().mockReturnValue(NEXT_PAGE) },
      });
      expect(instance.updatePage).toHaveBeenCalledWith(DEFAULT_PAGE + 1);
    });

    it("should call 'updatePage' with incorrect value", () => {
      instance.updatePage = jest.fn();
      instance.setState({ page: DEFAULT_PAGE });
      instance.handlePageChange({
        target: { getAttribute: jest.fn().mockReturnValue('Test') },
      });
      expect(instance.updatePage).toHaveBeenCalledTimes(0);
    });
  });

  describe('Posts handlers', () => {
    it('should handle search input value', () => {
      expect(component.state().searchQuery).toBe(defaultSearchQuery);
      instance.handleInputChange({ target: { value: 'test' } });
      expect(component.state().searchQuery).toBe('test');
    });

    it('should handle change of hits per page', () => {
      expect(component.state().hitsPerPage).toBe(defaultHitsPerPage);
      instance.handleHitsChange({ target: { value: String(DEFAULT_PAGE) } });
      expect(component.state().hitsPerPage).toBe(DEFAULT_PAGE);
    });

    it("should handle change page if 'Enter' clicked", () => {
      instance.setState({ page: DEFAULT_PAGE });
      instance.getSearch({ key: 'Enter' });
      expect(component.state().page).toBe(defaultPage);
    });

    it("should not change page if 'a' button clicked", () => {
      instance.setState({ page: DEFAULT_PAGE });
      instance.getSearch({ key: 'a' });
      expect(component.state().page).toBe(DEFAULT_PAGE);
    });
  });
});
