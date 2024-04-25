/**
=========================================================
* Material Dashboard 2 React - v2.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "App";
import './Printmedia.css'
import './App.css'

// Material Dashboard 2 React Context Provider
import { MaterialUIControllerProvider } from "context";
const styles = {
    backgroundImage: 'url("")',
    backgroundSize: '100%', // Cover the entire component
    backgroundPosition: 'center',
    color: 'white',
   
    justifyContent: 'center',
    alignItems: 'center',
   
  };
const container = document.getElementById("app");
const root = createRoot(container);

root.render(
     <div style={styles}>
  <BrowserRouter>
    <MaterialUIControllerProvider>
      <App />
    </MaterialUIControllerProvider>
  </BrowserRouter>
  </div>
);
