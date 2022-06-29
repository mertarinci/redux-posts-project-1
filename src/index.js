import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { Provider } from 'react-redux';
import store from "./reduxStore/store";
import 'sweetalert2/src/sweetalert2.scss';
import {CookiesProvider} from "react-cookie"


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    
    <Provider store={store} > <CookiesProvider> <App /> </CookiesProvider>  </Provider>

  </React.StrictMode>
);
