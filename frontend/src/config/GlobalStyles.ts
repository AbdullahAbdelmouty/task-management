
import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  * {
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    -webkit-box-shadow: border-box;
    -moz-box-shadow: border-box;
    box-shadow: border-box;
  }

  html {
    scroll-behavior: smooth;
  }

  body {
    background: #E5E5E5;
    color: black;
    font-family: 'Cairo', sans-serif;
    transition: all 0.25s linear;
    margin: 0;
  }

  :lang(ar) {
    font-family: 'Cairo', sans-serif;
  }

  :lang(en) {
    font-family: 'Poppins', sans-serif;
  }

  input:focus {
    outline: none;
    box-shadow: none !important;
  }
`;
