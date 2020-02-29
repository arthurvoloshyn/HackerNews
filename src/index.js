import React from 'react';
import ReactDOM from 'react-dom';

import registerServiceWorker from './registerServiceWorker';

import App from './containers/news/news';

import './index.css';

ReactDOM.render(<App />, document.getElementById('root'));

registerServiceWorker();
