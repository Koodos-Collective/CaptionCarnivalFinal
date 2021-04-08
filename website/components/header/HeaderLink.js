import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';

import rainbow from '../../styles/RainbowAnimation';

const StyledLink = styled.div`
    cursor: pointer;
    --anim: ${rainbow} 1.5s ease-in-out infinite;
    color: white;
    text-decoration: none;
    padding-left: 2.5em;

    & .linkName:hover {
        font-style: oblique;
        text-decoration: underline wavy white;
        filter: brightness(150%);
        animation: var(--anim);
        -webkit-animation: var(--anim);
        -moz-animation: var(--anim);
        -o-animation: var(--anim);
        -ms-animation: var(--anim);
    }
`;

function HeaderLink({ emoji, linkName, as, href }) {
    return (
        <Link as={as} href={href} className="aLink">
            <StyledLink>
                {emoji}/<span className="linkName">{linkName}</span>
            </StyledLink>
        </Link>
    );
}

export default HeaderLink;
