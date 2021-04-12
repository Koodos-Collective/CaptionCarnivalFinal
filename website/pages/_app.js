import { useState } from "react";
import { ThemeProvider } from "styled-components";
import { lightTheme, darkTheme, GlobalStyle } from "@styles/themeConfig";
import { BiSun, BiMoon } from "react-icons/bi";

import { ThemeButton } from "../components/Buttons";
import Navbar from "../components/Navbar";

const MyApp = ({ Component, pageProps }) => {
    const [theme, setTheme] = useState("dark");

    const toggleTheme = () => {
        theme == "dark" ? setTheme("light") : setTheme("dark");
    };

    return (
        <ThemeProvider theme={theme == "dark" ? darkTheme : lightTheme}>
            <GlobalStyle />
            <Navbar>
                <ThemeButton onClick={toggleTheme} aria-label="Toggle to Switch Theme">
                    {theme == "dark" ? <BiSun /> : <BiMoon />}
                </ThemeButton>
            </Navbar>
            <Component {...pageProps} />
        </ThemeProvider>
    );
};

export default MyApp;
