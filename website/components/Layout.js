import Head from 'next/head';
import GlobalStyles from '../styles/GlobalStyles';

//🤡 Caption 🎡 Carnival 🎠

export default function Layout({ children, pageTitle, description, ...props }) {
    return (
        <div>
            <Head>
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1"
                />
                <meta charSet="utf-8" />
                <title>{pageTitle}</title>
                <meta name="description" content={description} />
            </Head>
            <GlobalStyles />
            <div className="content">{children}</div>
        </div>
    );
}
