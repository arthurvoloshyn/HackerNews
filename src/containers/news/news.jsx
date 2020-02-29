import React, { Component } from 'react';

import { BASE_PATH, SEARCH_PATH, SEARCH_PARAM, PAGE_HITS, PAGE_PARAM, HITS } from '../../constants/constants';

import Title from '../../components/title/title';
import NewsPost from '../../components/news/news';
import Input from '../../components/input/input';
import Select from '../../components/select/select';
import Pagination from '../../components/pagination/pagination';

class News extends Component {
  state = {
    searchQuery: '',
    result: {},
    hitsPerPage: 20,
    page: 0
  };

  componentDidMount() {
    const { searchQuery, hitsPerPage, page } = this.state;
    this.fetchData(searchQuery, hitsPerPage, page);
  }

  fetchData = (searchQuery, hitsPerPage, page) => {
    fetch(`${BASE_PATH}${SEARCH_PATH}?${SEARCH_PARAM}${searchQuery}&${PAGE_HITS}${hitsPerPage}&${PAGE_PARAM}${page}`)
      .then(res => res.json())
      .then(result => this.setNews(result))
      .catch(error => error);
  };

  handleInputChange = ({ target: { value } }) => {
    this.setState({
      searchQuery: value
    });
  };

  getSearch = ({ key }) => {
    if (key === 'Enter') {
      const { searchQuery, hitsPerPage } = this.state;
      const page = 0;
      this.setState({
        page
      });
      this.fetchData(searchQuery, hitsPerPage, page);
    }
  };

  setNews = result => {
    this.setState({ result });
  };

  handleHitsChange = ({ target: { value } }) => {
    const { searchQuery } = this.state;
    const page = 0;

    this.setState(
      {
        hitsPerPage: +value,
        page
      },
      () => {
        const { hitsPerPage } = this.state;

        this.fetchData(searchQuery, hitsPerPage, page);
      }
    );
  };

  handlePageChange = ({ target }) => {
    const btnType = target.getAttribute('data-name');
    let { page } = this.state;

    if (!isNaN(btnType)) {
      this.updatePage(+btnType);
    } else {
      switch (btnType) {
        case 'next':
          this.updatePage(page + 1);
          break;
        case 'prev':
          this.updatePage(page - 1);
          break;
        default:
          return null;
      }
    }
  };

  updatePage = number => {
    const { searchQuery, hitsPerPage } = this.state;
    this.setState(
      {
        page: number
      },
      () => {
        this.fetchData(searchQuery, hitsPerPage, number);
      }
    );
  };

  render() {
    const { searchQuery, result, hitsPerPage } = this.state;
    const { hits = [], page, nbPages } = result;

    return (
      <div className="wrapper">
        <Title title="Hacker News" />
        <Select options={HITS} handleChange={this.handleHitsChange} value={hitsPerPage} />
        <Pagination onClick={this.handlePageChange} page={page} lastPage={nbPages} />
        <Input onKeyPress={this.getSearch} onChange={this.handleInputChange} value={searchQuery} />
        <ul className="newsList">
          {hits.map(({ author, created_at, num_comments, objectID, title, points, url }) => (
            <NewsPost key={objectID} author={author} created_at={created_at} num_comments={num_comments} title={title} points={points} url={url} />
          ))}
        </ul>
      </div>
    );
  }
}

export default News;
