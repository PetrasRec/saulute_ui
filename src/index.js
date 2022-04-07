import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import store from "./redux/store";
import { ChakraProvider } from '@chakra-ui/react'
import "bootstrap/dist/css/bootstrap.min.css";
import "./global.scss";
import "react-toastify/dist/ReactToastify.css";

import App from "./App";

ReactDOM.render(
  <Provider store={store}>
    <ChakraProvider>
      <App />
    </ChakraProvider>
  </Provider>,
  document.getElementById("root")
);
