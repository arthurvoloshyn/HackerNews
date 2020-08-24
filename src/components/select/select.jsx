import React from 'react';
import PropTypes from 'prop-types';

import './select.css';

const Input = ({ handleChange, options, value }) => (
  <div className="selectWrapper">
    {options.length > 0 ? (
      <>
        <select defaultValue={value} onBlur={handleChange} onChange={handleChange}>
          {options.map(({ value, label }) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </select>
        <span className="selectText">per page</span>
      </>
    ) : (
      <div className="placeholder">&quot;No items&quot;</div>
    )}
  </div>
);

Input.propTypes = {
  handleChange: PropTypes.func,
  options: PropTypes.array,
  value: PropTypes.number,
};

Input.defaultProps = {
  handleChange: () => {},
  options: [],
  value: 0,
};

export default Input;
