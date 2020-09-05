import React, { Component } from 'react';

import { PATHS, HITS, PAGES } from '../../constants/constants';
import { getIsValidNumber } from '../../utils/utils';
import Title from '../../components/title/title';
import Post from '../../components/post/post';
import Input from '../../components/input/input';
import Select from '../../components/select/select';
import Pagination from '../../components/pagination/pagination';

import './posts.css';

class Posts extends Component {
  state = {
    searchQuery: '',
    result: {},
    hitsPerPage: 20,
    page: 0,
  };

  componentDidMount() {
    const { searchQuery, hitsPerPage, page } = this.state;
    this.fetchData(searchQuery, hitsPerPage, page);
  }

  fetchData = (searchQuery, hitsPerPage, page) => {
    const { BASE_PATH, SEARCH_PATH, SEARCH_PARAM, PAGE_HITS, PAGE_PARAM } = PATHS;
    const PARAMS = `${SEARCH_PARAM}${searchQuery}&${PAGE_HITS}${hitsPerPage}&${PAGE_PARAM}${page}`;

    fetch(`${BASE_PATH}${SEARCH_PATH}?${PARAMS}`)
      .then(res => res.json())
      .then(result => this.setNews(result));
  };

  handleInputChange = ({ target: { value } }) => {
    this.setState({
      searchQuery: value,
    });
  };

  handleHitsChange = ({ target: { value } }) => {
    const { searchQuery } = this.state;
    const page = 0;

    this.setState(
      {
        hitsPerPage: +value,
        page,
      },
      () => {
        const { hitsPerPage } = this.state;

        this.fetchData(searchQuery, hitsPerPage, page);
      },
    );
  };

  getSearch = ({ key }) => {
    if (key === 'Enter') {
      const { searchQuery, hitsPerPage } = this.state;
      const page = 0;
      this.setState({
        page,
      });
      this.fetchData(searchQuery, hitsPerPage, page);
    }
  };

  setNews = result => {
    this.setState({ result });
  };

  handlePageChange = ({ target }) => {
    const btnType = target.getAttribute('data-name');

    getIsValidNumber(btnType) ? this.updatePage(+btnType) : this.handleSpecificBtnType(btnType);
  };

  handleSpecificBtnType = btnType => {
    const { page } = this.state;

    switch (btnType) {
      case PAGES.PREV:
        this.updatePage(page - 1);
        break;
      case PAGES.NEXT:
        this.updatePage(page + 1);
        break;
      default:
        break;
    }
  };

  updatePage = page => {
    const { searchQuery, hitsPerPage } = this.state;
    this.setState(
      {
        page,
      },
      () => {
        this.fetchData(searchQuery, hitsPerPage, page);
      },
    );
  };

  render() {
    const { searchQuery, result, hitsPerPage } = this.state;
    const { hits = [], page, nbPages } = result;
    const isHitsExist = hits.length > 0;

    return (
      <div className="wrapper">
        <Title title="Hacker News" />
        <Select handleChange={this.handleHitsChange} options={HITS} value={hitsPerPage} />
        {isHitsExist && (
          <Pagination lastPage={nbPages} onClick={this.handlePageChange} page={page} />
        )}
        <Input onChange={this.handleInputChange} onKeyPress={this.getSearch} value={searchQuery} />
        <ul className="newsList">
          {hits.map(
            ({
              author,
              objectID,
              title,
              points,
              url,
              created_at: createdAt,
              num_comments: numComments,
            }) => (
              <Post
                key={objectID}
                author={author}
                createdAt={createdAt}
                numComments={numComments}
                points={points}
                title={title}
                url={url}
              />
            ),
          )}
        </ul>
      </div>
    );
  }
}

export default Posts;
