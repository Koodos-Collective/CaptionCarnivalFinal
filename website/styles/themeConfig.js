import { createGlobalStyle } from "styled-components";

export const lightTheme = {
    body: "var(--lightPrimary)",
    text: "var(--dark0)",
    shadow: "var(--darkTransparent1)",
    button: {
        color: "var(--dark0)",
        svgColor: "var(--dark0)",
    },
    nav: {
        bg: "var(--light0)",
        text: "var(--dark0)",
        ham: "var(--dark1)",
    },
};

export const darkTheme = {
    body: "var(--darkPrimary)",
    text: "var(--light0)",
    shadow: "var(--lightTransparent1)",
    button: {
        color: "var(--light0)",
        svgColor: "var(--light0)",
    },
    nav: {
        bg: "var(--dark0)",
        text: "var(--light0)",
        ham: "var(--1)",
    },
};

export const GlobalStyle = createGlobalStyle`
/* fonts */

@font-face {
  font-family: "Karrik";
  src: url("/fonts/Karrik-Regular/Karrik-Regular.woff") format("woff"),
      url("/fonts/Karrik-Regular/Karrik-Regular.woff2") format("woff2");
  font-style: normal;
  font-weight: 600;
  font-display: swap;
}

@font-face {
  font-family: "Karrik";
  src: url("/fonts/Karrik-Italic/Karrik-Italic.woff") format("woff"),
      url("/fonts/Karrik-Italic/Karrik-Italic.woff2") format("woff2");
  font-style: italic;
  font-weight: 600;
  font-display: swap;
}

@font-face {
  font-family: "AUTHENTIC Sans";
  src: url("/fonts/AUTHENTIC-Sans/AUTHENTICSans-60.woff") format("woff"),
      url("/fonts/AUTHENTIC-Sans/AUTHENTICSans-60.woff2") format("woff2");
  font-style: normal;
  font-weight: 300;
  font-display: swap;
}

@font-face {
  font-family: "AUTHENTIC Sans";
  src: url("/fonts/AUTHENTIC-Sans/AUTHENTICSans-90.woff") format("woff"),
      url("/fonts/AUTHENTIC-Sans/AUTHENTICSans-90.woff2") format("woff2");
  font-style: normal;
  font-weight: 500;
  font-display: swap;
}

@font-face {
  font-family: "AUTHENTIC Sans";
  src: url("/fonts/AUTHENTIC-Sans/AUTHENTICSans-130.woff") format("woff"),
      url("/fonts/AUTHENTIC-Sans/AUTHENTICSans-130.woff2") format("woff2");
  font-style: normal;
  font-weight: 700;
  font-display: swap;
}

@font-face {
  font-family: "AUTHENTIC Sans";
  src: url("/fonts/AUTHENTIC-Sans/AUTHENTICSans-150.woff") format("woff"),
      url("/fonts/AUTHENTIC-Sans/AUTHENTICSans-150.woff2") format("woff2");
  font-style: normal;
  font-weight: 900;
  font-display: swap;
}

/* styles */

*, ::before, ::after {
  box-sizing: border-box;
  margin: 0;
}

* {
  --red: #e32987;
  --orange: #fd7218;
  --yellow: #ffd300;
  --green: #7bfe40;
  --blue: #15dfff;
  --purple: #a42fff;
  --transparentPurple: #a42fff50;

  --lightPrimary: #f0f0f0;
  --light0: #fff;
  --light1: #eee;
  --lightTransparent1: #fff5;

  --darkPrimary: #0f0f0f;
  --dark0: #000;
  --dark1: #111;
  --darkTransparent1: #0005;

  --scrollbarBG: #0000;
  --thumbBG: ${({ theme }) => theme.text};
}

html {
  scrollbar-width: 5px;
  scrollbar-color: var(--thumbBG) var(--scrollbarBG);
}

html,
body {
  height: 100%;
  width: 100%;
  padding: 0;
  margin: 0;
  overflow-x: hidden;
  scroll-behavior: smooth;
  font-family: "AUTHENTIC Sans", Arial, Helvetica, sans-serif;
}

body {
  -webkit-font-smoothing: antialiased;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;

  background: ${({ theme }) => theme.body};
  color: ${({ theme }) => theme.text};
  transition: all 0.25s linear;

  text-rendering: optimizeSpeed;
  line-height: 1.2;

  overflow-wrap: break-word;
  word-break: break-word;
}

body::-webkit-scrollbar {
  width: 5px;
}

body::-webkit-scrollbar-track {
  background: var(--scrollbarBG);
}

body::-webkit-scrollbar-thumb {
  background-color: var(--thumbBG) ;
  border-radius: 3px;
  border: 1px solid var(--scrollbarBG);
}

h1, h2, h3, h4, h5, h6 {
  font-family: "Karrik", "AUTHENTIC Sans", Arial, Helvetica, sans-serif;
}

img {
  max-width: 100%;
  display: block;
}

input, button, textarea, select {
  font: inherit;
}

svg {
  color: ${({ theme }) => theme.button.svgColor};
}

a, button {
  cursor: pointer;
  font-family: "AUTHENTIC Sans", Arial, Helvetica, sans-serif;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
}

a {
  color: inherit;
  text-decoration: none;
}

a:active {
  transform: scale(0.8);
  background: #0000;
}

button:focus {
  outline: 1px solid #00000001;
  outline-offset: -4px;
}

button:active {
  transform: scale(0.9);
}

@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms;
    animation-iteration-count: 1;
    transition-duration: 0.01ms;
    scroll-behavior: auto;
  }
}

::selection {
  background: var(--transparentPurple);
  color: var(--purple);
}
`;
