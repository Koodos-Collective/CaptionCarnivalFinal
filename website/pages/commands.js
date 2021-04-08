import Image from 'next/image';
import Link from 'next/link';
import styled from 'styled-components';

import Layout from '../components/Layout';
import rainbow from '../styles/RainbowAnimation';

const Div = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;

    & h1 {
        font-size: 4em;
        padding-top: 1.5em;
    }

    & Image {
        padding: 0.5em;
    }

    & .link {
        cursor: pointer;
        --anim: ${rainbow} 1.5s ease-in-out infinite;
        color: white !important;
        text-decoration: none !important;
        text-size: 1.5em !important;

        & :hover,
        :visited {
            font-style: oblique;
            text-decoration: underline wavy white;
            filter: brightness(150%);
            animation: var(--anim);
            -webkit-animation: var(--anim);
            -moz-animation: var(--anim);
            -o-animation: var(--anim);
            -ms-animation: var(--anim);
        }
    }
`;

export default function Commands() {
    return (
        <Layout
            pageTitle="Commands"
            description="Commands for the Caption Carnival discord bot">
            <Div>
                <h1>Coming soon!</h1>
                <Image
                    src="/mascot.png"
                    alt="mascot"
                    width={225}
                    height={250}
                    layout="fixed"
                />
                <div className="link">
                    <Link as="/" href="/">
                        Go back
                    </Link>
                </div>
            </Div>
        </Layout>
    );
}
