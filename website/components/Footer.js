import styled from "styled-components";
import { AnimLink } from "./Links";

const FooterWrapper = styled.div`
    display: flex;
    flex-wrap: wrap;
    align-self: flex-end;
    align-items: center;
    justify-content: center;
    position: fixed;

    font-size: 1.25em;
    margin: 0;
    padding: 0;
    left: 0;
    right: 0;
    bottom: 0;

    height: 7.5vh;
    width: 100vw;
    z-index: 0;

    color: var(--light0);
    background: var(--darkPrimary);

    & a {
        color: #6feed0;
        padding: 0.05em 0.15em;

        & :hover {
            transform: rotate(30deg);
            cursor: pointer;
        }
    }
`;

const Footer = () => {
    return (
        <FooterWrapper>
            <p>
                from the{" "}
                <AnimLink href="https://koodos.com" target="_blank" rel="noopener noreferrer">
                    koodos collective
                </AnimLink>
            </p>
        </FooterWrapper>
    );
};

export default Footer;
