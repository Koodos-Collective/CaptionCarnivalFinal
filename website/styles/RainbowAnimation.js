import { keyframes } from 'styled-components';

const rainbow = keyframes`
    0%,
    100% {
      color: var(--pink);
      fill: var(--pink);
    }
    16% {
      color: var(--orange);
      fill: var(--orange);
    }
    32% {
      color: var(--yellow);
      fill: var(--yellow);
    }
    48% {
      color: var(--green);
      fill: var(--green);
    }
    64% {
      color: var(--blue);
      fill: var(--blue);
    }
    75% {
      color: var(--purple);
      fill: var(--purple);
    }
`;

export default rainbow;
