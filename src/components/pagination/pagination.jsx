import React from 'react';
import PropTypes from 'prop-types';

import './pagination.css';

const renderPaginationBtns = (onClick, page, lastPage) => {
  const startBtns = [page, page + 1, page + 2];
  const gapBtns = [page - 2, page - 1, page];
  const middleBtn = ['...'];
  const lastBtns = [lastPage - 3, lastPage - 2, lastPage - 1];

  let btnsArr = [];

  if (page < lastPage - 6) {
    btnsArr = [...startBtns, ...middleBtn, ...lastBtns];
  } else if (page < lastPage - 4) {
    btnsArr = [...gapBtns, ...middleBtn, ...lastBtns];
  } else if (page < lastPage - 3) {
    btnsArr = [...gapBtns, ...lastBtns]; // last 6 pages
  } else if (page === 0 && lastPage === 0) {
    btnsArr = [];
  } else {
    btnsArr = [...middleBtn, ...lastBtns]; // last 3 pages
  }

  return btnsArr.map(num => {
    return num === '...' ? (
      num
    ) : (
      <button key={num} className={num === page ? 'active' : ''} data-name={num} onClick={onClick}>
        {num}
      </button>
    );
  });
};

const Pagination = ({ onClick, page, lastPage }) => (
  <div className="paginationWrapper">
    {page !== 0 && (
      <button data-name="prev" onClick={onClick}>
        {'<<'}
      </button>
    )}
    {renderPaginationBtns(onClick, page, lastPage)}
    {page !== lastPage - 1 && (
      <button data-name="next" onClick={onClick}>
        {'>>'}
      </button>
    )}
  </div>
);

Pagination.propTypes = {
  onClick: PropTypes.func,
  page: PropTypes.number,
  lastPage: PropTypes.number,
};

Pagination.defaultProps = {
  onClick: () => {},
  page: 0,
  lastPage: 0,
};

export default Pagination;
