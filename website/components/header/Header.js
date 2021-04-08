import styled from 'styled-components';
import NavBar from './NavBar';

const StyledHeader = styled.div`
    margin: 0;
    padding: 0;
    height: 100%;
    border-bottom: 0.15em solid white;
`;

export default function Header() {
    return (
        <StyledHeader>
            <NavBar />
        </StyledHeader>
    );
}
