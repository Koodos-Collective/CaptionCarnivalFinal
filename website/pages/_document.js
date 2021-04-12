import Document, { Html, Head, Main, NextScript } from "next/document";
import { ServerStyleSheet } from "styled-components";

class MyDocument extends Document {
    static async getInitialProps(ctx) {
        const sheet = new ServerStyleSheet();
        const originalRenderPage = ctx.renderPage;

        try {
            ctx.renderPage = () =>
                originalRenderPage({
                    enhanceApp: App => props => sheet.collectStyles(<App {...props} />),
                });

            const initialProps = await Document.getInitialProps(ctx);
            return {
                ...initialProps,
                styles: (
                    <>
                        {initialProps.styles}
                        {sheet.getStyleElement()}
                    </>
                ),
            };
        } finally {
            sheet.seal();
        }
    }

    render() {
        return (
            <Html lang="en">
                <Head>
                    <link rel="manifest" href="/manifest.json" />
                    <meta name="theme-color" content="#0f0f0f" />
                    <link rel="icon" type="image/png" sizes="32x32" href="/icons/logo-32x32.png" />
                    <link rel="icon" type="image/png" sizes="16x16" href="/icons/logo-16x16.png" />
                    <link rel="apple-touch-icon" href="/icons/logo-96x96.png" />
                    <link
                        rel="mask-icon"
                        href="/icons/logo-safari-pinned-tab.svg"
                        color="#0f0f0f"
                    />
                    <meta name="msapplication-TileColor" content="#0f0f0f" />
                    <meta name="apple-mobile-web-app-status-bar" content="#0f0f0f" />
                    <link
                        rel="preload"
                        href="/fonts/Karrik-Regular/Karrik-Regular.woff"
                        as="font"
                        crossOrigin=""
                    />
                    <link
                        rel="preload"
                        href="/fonts/Karrik-Regular/Karrik-Regular.woff2"
                        as="font"
                        crossOrigin=""
                    />
                    <link
                        rel="preload"
                        href="/fonts/Karrik-Italic/Karrik-Italic.woff"
                        as="font"
                        crossOrigin=""
                    />
                    <link
                        rel="preload"
                        href="/fonts/Karrik-Italic/Karrik-Italic.woff2"
                        as="font"
                        crossOrigin=""
                    />
                </Head>
                <body>
                    <Main />
                    <NextScript />
                    <style jsx global>{`
                        /* global style override */
                        #__next {
                            height: 100%;
                        }
                    `}</style>
                </body>
            </Html>
        );
    }
}

export default MyDocument;
