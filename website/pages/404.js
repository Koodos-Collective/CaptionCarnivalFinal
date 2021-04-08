import Image from 'next/image';
import styled from 'styled-components';

import Layout from '../components/Layout';

const Div = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;

    & h1 {
        font-size: 4em;
        padding: 1.5em 0 0.5em 0;
    }
`;

export default function Commands() {
    return (
        <Layout
            pageTitle="page not found :("
            description="Error 404 - Page Not Found">
            <Div>
                <h1>Oops! Error 404 - Page Not Found</h1>
                <Image
                    src="/clown.gif"
                    alt="oof"
                    width={250}
                    height={250}
                    layout="fixed"
                />
            </Div>
        </Layout>
    );
}
