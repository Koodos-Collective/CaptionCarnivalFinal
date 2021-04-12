import styled from "styled-components";

const StyledWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: left;
    justify-content: space-around;

    color: ${({ theme }) => theme.text};
    border: 2px solid ${({ theme }) => theme.text};
    border-radius: 10px;
    padding: 0.35em 1em 0.5em 1em;
    margin: 1em 0;
    font-size: 1.5em;
    box-shadow: 0 0 0;
    transition: box-shadow 0.25s ease-out;
    height: 100%;
    width: 85%;

    :hover {
        transform: translateX(-0.25em) translateY(-0.25em);
        box-shadow: 0.25em 0.25em 0 ${({ theme }) => theme.text};
    }

    & h1 {
        margin-bottom: 0.25em;
        font-size: 1.5em;
    }

    & p {
        margin-bottom: 0.5em;
        font-size: 0.85em;
    }

    @media (max-width: 768px) {
        font-size: 1.15em;
    }
`;

export const CommandsCard = ({ name, description, type }) => {
    return (
        <StyledWrapper>
            <h1>{name}</h1>
            <p>{description}</p>
        </StyledWrapper>
    );
};
