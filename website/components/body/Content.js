import Button from './Button';
import styled from 'styled-components';
import Image from 'next/image';

import rainbow from '../../styles/RainbowAnimation';

const Description = styled.div`
    --anim: ${rainbow} 1.5s ease-in-out infinite;
    display: flex;
    flex-direction: row;

    & .mascot {
        width: 5em;
        height: 5.25em;
        padding: 1em;
        transform: scale(0.85);
    }

    & p {
        font-size: 1.75em;
        padding: 1em;
        max-width: 575px;

        & .highlight {
            filter: brightness(150%);
            animation: var(--anim);
            -webkit-animation: var(--anim);
            -moz-animation: var(--anim);
            -o-animation: var(--anim);
            -ms-animation: var(--anim);
            font-weight: 500;
        }

        & .underline:hover {
                text-decoration: underline wavy white;
                font-style: italic
            }
        }
    }

    @media (max-width: 768px) {
            flex-direction: column-reverse;
            align-items: center;
            justify-content: center;
            padding: 1em;

            p {
                font-size: 1.25em;
            }

            .mascot {
                transform: scale(0.75);
            }
        }
    }
`;

const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const ButtonLayout = styled.div`
    display: flex;
    flex-direction: row;
`;

export default function HomePage() {
    return (
        <Description>
            <Image
                src="/mascot.png"
                alt="your mascot, capt. shon"
                className="mascot"
                layout="fixed"
                width={224}
                height={258}
            />
            <Container>
                <p>
                    led by the great ol' capt. shon, this is a discord game that
                    allows you to have a{' '}
                    <span className="highlight">
                        🎡 <span className="underline">caption carnival</span>{' '}
                        🎪
                    </span>{' '}
                    in your puny lil' discord server [coming soon]
                </p>
                <ButtonLayout>
                    <Button description="add to discord" colour="#7189DA" />
                    <Button description="commands" colour="#ff944c" />
                </ButtonLayout>
            </Container>
        </Description>
    );
}
