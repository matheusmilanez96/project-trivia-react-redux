import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import store from './redux';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={ store }>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
);

localStorage.setItem(
  'token',
  '84f967ef4b37629687c60bf11da4c83bd9478ac3b1fcc5fb79ca6d69240ca4c0',
);
