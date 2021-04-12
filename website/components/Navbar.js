import { useState } from "react";
import styled from "styled-components";
import Link from "next/link";

import { AnimLink } from "./Links";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";

const Logo = styled.div`
    text-decoration: none;
`;

const Hamburger = styled.button`
    background: #0000;
    border: solid 1px #0000;
    display: none;
    cursor: pointer;
    font-size: 1.5em;
    transition: all 0.25s linear;

    @media (max-width: 768px) {
        display: flex;
        flex-direction: column;
    }
`;

const Menu = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: relative;

    @media (max-width: 768px) {
        overflow: hidden;
        flex-direction: column;
        width: 100%;
        max-height: ${({ isOpen }) => (isOpen ? "500px" : "0")};
        transition: max-height 0.25s ease-in;
    }
`;

const MenuLink = styled.span`
    padding: 1em 2em;
    cursor: pointer;
    text-align: center;
    text-decoration: none;
    font-size: 1.25em;
`;

const Nav = styled.div`
    padding: 0 2em;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    border-bottom: 2px solid ${({ theme }) => theme.nav.text};

    background: ${({ theme }) => theme.nav.bg};
    color: ${({ theme }) => theme.nav.text};
    transition: all 0.25s linear;
`;

const Navbar = ({ children }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <Nav>
            <Logo>{children}</Logo>
            <Hamburger onClick={() => setIsOpen(!isOpen)} aria-label="Toggle to view Menu">
                {isOpen ? <AiOutlineClose /> : <AiOutlineMenu />}
            </Hamburger>
            <Menu isOpen={isOpen}>
                <MenuLink>
                    <Link href="/">
                        <AnimLink>home</AnimLink>
                    </Link>
                </MenuLink>
                <MenuLink>
                    <Link href="/about">
                        <AnimLink>about</AnimLink>
                    </Link>
                </MenuLink>
                <MenuLink>
                    <Link href="/commands">
                        <AnimLink>commands</AnimLink>
                    </Link>
                </MenuLink>
                <MenuLink>
                    <Link href="/archive">
                        <AnimLink>archive</AnimLink>
                    </Link>
                </MenuLink>
            </Menu>
        </Nav>
    );
};

export default Navbar;
