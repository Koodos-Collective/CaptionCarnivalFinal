import Head from "next/head";
import styled from "styled-components";

import Footer from "./Footer";

const ContentWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    z-index: 0;
    padding: 10vh 7.5vw;

    @media (max-width: 768px) {
        padding: 7.5vh 7.5vw;
    }
`;

const Layout = ({ children, pageTitle, description, ...props }) => {
    return (
        <>
            <Head>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <meta charSet="utf-8" />
                <title>{pageTitle}</title>
                <meta name="description" content={description} />
            </Head>
            <ContentWrapper>
                {children}
                <Footer />
            </ContentWrapper>
        </>
    );
};

export default Layout;
