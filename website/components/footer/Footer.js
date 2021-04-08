import styled from 'styled-components';

const StyledFooter = styled.footer`
    display: flex;
    justify-content: space-around;
    align-items: center;
    justify-content: center;
    flex-direction: row;
    margin: 2em;
    curson: auto;
`;

const StyledLink = styled.a`
    color: white;
    text-decoration: none;
    font-size: 1.3em;
    margin: 0 1em;

    & .highlight {
        color: #6feed0;
        border-bottom: 2px solid white;
        cursor: pointer;

        :hover {
            background: rgba(255, 255, 255, 0.5);
            border-bottom: 0px;
        }
    }
`;

export default function Footer() {
    return (
        <StyledFooter>
            <StyledLink
                href="https://koodos.com"
                target="_blank"
                rel="noopener noreferrer">
                from the <span className="highlight">koodos collective</span>
                <br />
                subscribe to the substack!
            </StyledLink>
            <iframe
                src="https://kcollective.substack.com/embed"
                className="koodos"
                frameBorder="0"
                scrolling="no"></iframe>
        </StyledFooter>
    );
}
