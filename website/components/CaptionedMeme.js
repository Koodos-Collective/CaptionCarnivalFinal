import Image from 'next/image';
import styled from 'styled-components';
import { Fragment, useRef, forwardRef } from 'react';
// import {
//    exportComponentAsPNG,
//    exportComponentAsJPEG,
//} from 'react-component-export-image';

// styles
const StyledContainer = styled.div`
    margin: auto;
    background: white;
    display: flex;
    flex-direction: column;
    font-family: Arial, sans-serif;
    color: #2a2a2a;
    width: 570px;

    & .text {
        margin: 10px 10px 0 10px;
        font-size: 24px;
        font-align: left;
        width: 550px;
    }

    & .img {
        border-radius: 10px;
    }

    & .watermark {
        position: relative;
        font-size: 16px;
        background: white;
        padding: 5px 0 5px 5px;
        width: 140px;
        margin: auto -15px 15px auto;
        right: 10px;
        bottom: 30px;
        border-radius: 5px 0 0 0;
    }
`;

const Button = styled.button`
    color: white;
    background: black;
    padding: 10px;
    border-radius: 2px;
`;

// replace newline with <br />
const FixedCaption = ({ text }) =>
    text.split('\n').map((value, index) => {
        return (
            <Fragment key={index}>
                {value}
                <br />
            </Fragment>
        );
    });

export default function CaptionedMeme({ caption, imageUrl }) {
    return (
        <StyledContainer>
            <div className="text">
                <FixedCaption text={caption} />
            </div>
            <div
                style={{
                    margin: '10px',
                    width: '550px',
                    height: '350px',
                }}>
                <Image
                    className="img"
                    src={imageUrl}
                    alt="meme image"
                    width={550}
                    height={350}
                />
                <div className="watermark">created by 🤡.fm</div>
            </div>
        </StyledContainer>
    );
}

/*
const Meme = forwardRef(({ caption, imageUrl }, ref) => (
    <div ref={ref}>
        <StyledContainer>
            <div className="text">
                <FixedCaption text={caption} />
            </div>
            <div
                style={{
                    margin: '10px',
                    width: '550px',
                    height: '350px',
                }}>
                <Image
                    className="img"
                    src={imageUrl}
                    alt="meme image"
                    width={550}
                    height={350}
                />
                <div className="watermark">created by 🤡.fm</div>
            </div>
        </StyledContainer>
    </div>
));

// export component
export default function CaptionedMeme() {
    const componentRef = useRef();

    return (
        <Fragment>
            <Meme ref={componentRef} />
            {
                // download component as image
                // https://github.com/salman-monetate/react-component-export-image
            }
            <Button onClick={() => exportComponentAsPNG(componentRef)}>
                Export as PNG
            </Button>
            <Button onClick={() => exportComponentAsJPEG(componentRef)}>
                Export as JPEG
            </Button>
        </Fragment>
    );
}
*/
