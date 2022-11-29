import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { ChakraProvider } from "@chakra-ui/react";
import reportWebVitals from './reportWebVitals';
import { QuizProvider, AuthProvider } from "./context/index";
import { extendTheme, ThemeConfig, ColorModeScript } from "@chakra-ui/react";
import { BrowserRouter as Router } from "react-router-dom";



const config : ThemeConfig = {
  useSystemColorMode: false,
  initialColorMode: "dark",
}

const theme = extendTheme({ config });




ReactDOM.render(
  <React.StrictMode>
    <Router>
      <ChakraProvider theme={theme}>
        <ColorModeScript initialColorMode={theme.config.initialColorMode} />
        <AuthProvider>
          <QuizProvider>
            <App />
          </QuizProvider>
        </AuthProvider>
      </ChakraProvider>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
