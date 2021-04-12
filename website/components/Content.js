import styled from "styled-components";
import Link from "next/link";

import { DiscordButton } from "./Buttons";
import { rainbow } from "./Links";

const Description = styled.div`
    display: flex;
    flex-direction: row;
    padding: 1.5em 0;
    margin-bottom: 1.5em;

    & .mascot {
        width: 5em;
        height: 5.25em;
        padding: 1em;
        transform: scale(0.85);
    }

    & p {
        font-size: 1.75em;
        padding: 1em;
        width: 65vw;
        text-align: justify;
        font-weight: 500;

        & .highlight {
            background: var(--darkPrimary);
            animation: ${rainbow} 2s ease-in-out infinite;
            font-weight: 700;
        }
    }

    @media (max-width: 768px) {
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding: 1em;

        p {
            font-size: 1.25em;
            width: 90vw;
        }
        .mascot {
            transform: scale(0.75);
        }
    }
`;

const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const ButtonLayout = styled.div`
    display: flex;
    flex-direction: row;
    @media (max-width: 800px) {
        flex-direction: column;
    }
`;

const ColoredLink = styled.a`
    color: var(--text);
    text-decoration: none;
    & :hover {
        animation: ${rainbow} 2s ease-in-out infinite;
    }
`;

const Content = () => {
    return (
        <Description>
            <Container>
                <p>
                    led by the great ol' capt. shon, this is a discord game that allows you to have
                    a <span className="highlight">🎡 caption carnival 🎪</span> in your puny lil'
                    discord server [coming soon]
                </p>
                <ButtonLayout>
                    <DiscordButton>
                        <Link to="/discord" href="/discord" className="link">
                            <ColoredLink
                                href="https://discord.com/oauth2/authorize?client_id=805755365258035252&scope=bot&permissions=8"
                                target="_blank"
                                rel="noopener noreferrer">
                                add to discord
                            </ColoredLink>
                        </Link>
                    </DiscordButton>
                </ButtonLayout>
            </Container>
        </Description>
    );
};

export default Content;
