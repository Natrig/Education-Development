import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { ConfigProvider as AntdConfigProvider } from 'antd';
import { BrowserRouter } from 'react-router-dom';

import ruRu from 'antd/es/locale/ru_RU';
import { ConfigProviderProps } from 'antd/es/config-provider';
import ErrorBoundary from './components/ErrorBoundary';

const antdConfig: ConfigProviderProps = {
  locale: ruRu,
  componentSize: 'middle',
  space: { size: 'middle' },
};

ReactDOM.render(
  <BrowserRouter>
    <AntdConfigProvider {...antdConfig}>
      <ErrorBoundary>
        <App/>
      </ErrorBoundary>
    </AntdConfigProvider>
  </BrowserRouter>
  , document.getElementById('root'));
