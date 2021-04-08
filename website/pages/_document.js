import Document, { Html, Head, Main, NextScript } from 'next/document';
import React from 'react';
import { ServerStyleSheet } from 'styled-components';

export default class MyDocument extends Document {
    static getInitialProps({ renderPage }) {
        const sheet = new ServerStyleSheet();

        const page = renderPage(App => props =>
            sheet.collectStyles(<App {...props} />),
        );

        const styleTags = sheet.getStyleElement();

        return { ...page, styleTags };
    }

    render() {
        return (
            <Html lang="en">
                <Head>
                    {this.props.styleTags}
                    <meta
                        name="author"
                        content="Sirat Baweja and Hannah Guo (from koodos)"
                    />
                    <meta
                        name="keywords"
                        content="Caption Carnival, discord bot, meme, caption, carnival, discord, game, clown.fm, 🤡.fm"
                    />
                    <meta name="theme-color" content="#0f0f0f" />

                    <meta name="next-head-count" content="21" />
                    <link rel="icon" href="/favicon.ico" />
                    <link rel="shortcut icon" href="/favicon.ico" />
                    <link rel="preconnect" href="https://fonts.gstatic.com" />
                    <link
                        href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,wght@0,400;0,500;0,700;1,400;1,500;1,700&display=swap"
                        rel="stylesheet"
                    />
                </Head>
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        );
    }
}
