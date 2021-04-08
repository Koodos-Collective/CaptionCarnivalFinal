import styled from 'styled-components';
import HeaderLink from './HeaderLink';
import Image from 'next/image';

const StyledNavBar = styled.header`
    color: white;
    font-weight: 600;
    font-size: 1.5em;

    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 0 1em;

    width: 100vw;

    @media (max-width: 768px) {
        flex-direction: column;
        justify-content: space-between;
        padding: 1em 0;
        z-index: 30;
        height: 100vh;
    }
`;

const StyledLogo = styled.div`
    font-size: 1.5em;
    text-align: left;
    margin: 0;
    padding: 0;
    align-items: left;

    & Image {
        height: 2.5em !important;
    }

    @media (max-width: 768px) {
        font-size: 2em !important;

        & Image {
            height: 3em;
        }
    }
`;

const Links = styled.span`
    display: flex;
    flex-direction: row;
    justify-content: flex-end;

    @media (max-width: 768px) {
        font-size: 1.5em;
        height: 90vh;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
    }
`;

export default function NavBar() {
    return (
        <StyledNavBar>
            <StyledLogo>
                <Image
                    src="/mascot.png"
                    alt="mascot"
                    layout="intrinsic"
                    width={84}
                    height={96}
                />
            </StyledLogo>
            <Links>
                <HeaderLink
                    emoji="🏡"
                    linkName="home"
                    as="/"
                    href="/"></HeaderLink>
                <HeaderLink
                    emoji="📘"
                    linkName="about"
                    as="/"
                    href="/"></HeaderLink>
                <HeaderLink
                    emoji="🤖"
                    linkName="commands"
                    as="/commands"
                    href="/commands"></HeaderLink>
                <HeaderLink
                    emoji="🖥️"
                    linkName="demo"
                    as="/demo"
                    href="/demo"></HeaderLink>
            </Links>
        </StyledNavBar>
    );
}
