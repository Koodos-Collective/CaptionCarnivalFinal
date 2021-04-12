import styled, { keyframes } from "styled-components";

export const rainbow = keyframes`
    0%, 100% {
        color: var(--purple);
    }
    16% {
        color: var(--blue);
    }
    33% {
        color: var(--green);
    }
    49% {
        color: var(--yellow);
    }
    66% {
        color: var(--orange);
    }
    82% {
        color: var(--red);
    }
`;

export const AnimLink = styled.a`
    cursor: pointer;
    font-weight: 500;
    transition: all 0.25s ease;

    :hover {
        animation: ${rainbow} 2s ease-in infinite;
        font-weight: 700;
    }
`; // animated link
