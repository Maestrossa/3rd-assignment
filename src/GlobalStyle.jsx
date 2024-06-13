import { createGlobalStyle } from 'styled-components';
import './font.css';
import reset from 'styled-reset';

const GlobalStyle = createGlobalStyle`
    ${reset}
    * {
        background-color: #161616;
        color: #d6d6d6;
        font-family: 'Sunflower', sans-serif;
        line-height: 1.5;
    };

    #root {
  
    margin: 0 auto;
    text-align: center;
}
`;

export default GlobalStyle;
