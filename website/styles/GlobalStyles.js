import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
    html, body {
        overflow-x: hidden;
    }

    * {
        box-sizing: border-box;
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        margin: 0;
        padding: 0;
        --pink: #FF66A6;
        --orange: #FF944C;
        --yellow: #FFEE4C;
        --green: #80FF66;
        --blue: #5BB8FF;
        --purple: #6861FF;
    }

    body {
        margin: 0;
        padding: 0;
        font-family: 'DM Sans', Helvetica, Arial, sans-serif;
        color: white;
        background: #0F0F0F;
    }

    .content {
      width: 100%;
      height: 100%;
      margin: 0;
      padding: 0;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }
`;

export default GlobalStyles;
