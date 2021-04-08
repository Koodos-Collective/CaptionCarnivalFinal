import styled from 'styled-components';

const StyledButton = styled.button`
    padding: 0.5em 1em;
    margin: 0 0.5em;
    text-align: center;
    font-size: 1.25em;
    font-weight: 500;
    border-radius: 5em;
    color: black;
    border: 1px solid rgba(0, 0, 0, 0);
    font-family: DM Sans, sans-serif;

    &:hover {
        cursor: pointer;
        filter: brightness(120%);
    }
`;

export default function Button({ colour, description }) {
    return (
        <StyledButton style={{ backgroundColor: colour }}>
            {description}
        </StyledButton>
    );
}
