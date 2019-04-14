import React from 'react';
import ReactDOM from "react-dom";
import App from './components/App';

const wrapper = document.getElementById("react-app");
wrapper ? ReactDOM.render(<App />, wrapper) : false;
