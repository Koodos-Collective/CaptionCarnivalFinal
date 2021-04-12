import styled, { keyframes } from "styled-components";

export const ThemeButton = styled.button`
    border: 1px solid rgba(0, 0, 0, 0);
    border-radius: 10px;
    background: rgba(150, 150, 150, 0.15);
    font-size: 1.5em;
    padding: 0.25em 0.25em 0 0.25em;
    cursor: pointer;
    margin: 0.5em 0;
    transition: all 0.25s linear;
`;

// add to discord
const rainbowBorder = keyframes`
0%, 100% {
    color: var(--purple);
    box-shadow: 0 0 10px var(--purple);
}
16% {
    color: var(--blue);
    box-shadow: 0 0 10px var(--blue);
}
33% {
    color: var(--green);
    box-shadow: 0 0 10px var(--green);
}
49% {
    color: var(--yellow);
    box-shadow: 0 0 10px var(--yellow);
}
66% {
    color: var(--orange);
    box-shadow: 0 0 10px var(--orange);
}
82% {
    color: var(--red);
    box-shadow: 0 0 10px var(--red);
}
`;

const StyledDiscordButton = styled.button`
    text-align: center;
    font-size: 1.25em;
    font-weight: 700;
    border-radius: 5em;
    padding: 0.5em 1em;
    margin: 0 0.5em;

    color: ${({ theme }) => theme.button.color} !important;
    background: ${({ theme }) => theme.body} !important;
    border: 2px solid ${({ theme }) => theme.button.color};
    animation: ${rainbowBorder} 2s ease-in-out infinite !important;
    transition: all 0.25s linear;

    font-family: DM Sans, sans-serif;
    & :hover,
    a:hover {
        color: ${({ theme }) => theme.button.color} !important;
        cursor: pointer;
        transform: scale(1.05);
    }
    @media (max-width: 800px) {
        margin: 0.5em 0;
    }
`;

export function DiscordButton({ children }) {
    return <StyledDiscordButton>{children}</StyledDiscordButton>;
}
