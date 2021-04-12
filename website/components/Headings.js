import Image from "next/image";
import styled, { keyframes } from "styled-components";

const rotate = keyframes`
    from {
        transform: rotate(0deg);
    }

    to {
        transform: rotate(359deg);
    }
`;

const TitleWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: row;
    position: relative;

    & h1 {
        line-height: 50%;
    }

    & .top {
        margin: 0.3em 0 0.35em 0;
    }

    @media (max-width: 768px) {
        flex-direction: column;
    }
`;

export const StyledTitle = styled.h1`
    color: ${({ theme }) => theme.text};
    font-weight: 400;
    font-size: 5em;
    text-align: center;
    margin: 0;
    padding: 0;

    @media (max-width: 768px) {
        font-size: 10vw;
    }
`;

const ImageWrapper = styled.div`
    animation: ${rotate} 4s linear infinite;
    filter: hue-rotate(-15deg) saturate(1.25) brightness(0.95)
        drop-shadow(0 0 10px ${({ theme }) => theme.shadow});
    z-index: 1;

    & img {
        width: 50%;
    }
`;

export const MainTitle = props => {
    return (
        <TitleWrapper>
            <StyledTitle className="top">caption</StyledTitle>
            <ImageWrapper>
                <Image
                    src="/icons/logo-130x130.png"
                    alt="a rotating clown face"
                    layout="fixed"
                    width={130}
                    height={130}
                />
            </ImageWrapper>
            <StyledTitle>carnival</StyledTitle>
        </TitleWrapper>
    );
};
