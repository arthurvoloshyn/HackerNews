import React from 'react';
import PropTypes from 'prop-types';

import './post.css';

const Post = ({ author, createdAt, numComments, title, points, url }) => (
  <li className="post">
    <a className="description" href={url} rel="noreferrer" target="_blank">
      <h2 className="smTitle">{title}</h2>
      <span className="text">{`${points} points`}</span>
      <span className="comments">{`${numComments} comments`}</span>
      <span className="date">
        {createdAt ? new Date(createdAt).toLocaleDateString() : 'No date'}
      </span>
      <span className="author">{author}</span>
    </a>
  </li>
);

Post.propTypes = {
  author: PropTypes.string,
  createdAt: PropTypes.string,
  numComments: PropTypes.number,
  title: PropTypes.string,
  points: PropTypes.number,
  url: PropTypes.string,
};

Post.defaultProps = {
  author: 'Artur',
  createdAt: '',
  numComments: 0,
  title: 'Here should be a title',
  points: 0,
  url: '#',
};

export default Post;
