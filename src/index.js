import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap-icons/font/bootstrap-icons.css'
import "./App.css"
// import '../src/pages/pagestyles/Pages.css'
// import "../src/components/style/Form.css"
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min';
import 'font-awesome/css/font-awesome.min.css'
import { ProSidebarProvider } from 'react-pro-sidebar';

import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './redux';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={ store }>
    <BrowserRouter>
      <ProSidebarProvider>      
        <App/>
      </ProSidebarProvider>
    </BrowserRouter>
  </Provider>
);
