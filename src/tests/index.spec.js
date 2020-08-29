import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom';

import App from '../containers/posts/posts';

jest.mock('react-dom', () => ({ render: jest.fn() }));

describe('Application root', () => {
  beforeAll(() => {
    process.env.NODE_ENV = 'production';
  });

  afterAll(() => {
    process.env.NODE_ENV = 'test';
  });

  it('should have mounted the app', () => {
    const div = document.createElement('div');

    div.id = 'root';
    document.body.appendChild(div);

    require('../index');

    expect(ReactDOM.render).toHaveBeenCalledWith(
      <StrictMode>
        <App />
      </StrictMode>,
      div,
    );
  });
});
