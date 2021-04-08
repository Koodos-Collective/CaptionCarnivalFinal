import styled from 'styled-components';
import Image from 'next/image';

const Div = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: row;

    @media (max-width: 768px) {
        flex-direction: column;
        padding: 3.5em 0;
    }
`;

const StyledText = styled.h1`
    color: #fff;
    font-weight: 500;
    font-size: 5em;
    text-align: center;
    padding: 1em 0;

    & .gif {
        height: 5em !important;
        width: 5em !important;
        z-index: 2;
    }

    @media (max-width: 768px) {
        padding: 0 1em;
        line-height: 10%;
    }
`;

export default function Title() {
    return (
        <Div>
            <StyledText>caption</StyledText>
            <Image
                className="gif"
                src="/clown.gif"
                alt="image of a rotating clown"
                width={200}
                height={200}
            />
            <StyledText>carnival</StyledText>
        </Div>
    );
}
