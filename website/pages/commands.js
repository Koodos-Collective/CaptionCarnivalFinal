import styled from "styled-components";

import Layout from "@components/Layout";
import { StyledTitle } from "@components/Headings";
import { CommandsCard } from "@components/Cards";

const CommandWrapper = styled.div`
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;

    padding: 0 12.5vw;

    @media (max-width: 768px) {
        padding: 0;
    }
`;

const CommandsList = () => {
    return (
        <CommandWrapper>
            <CommandsCard
                name="++help"
                description="Responds with this help menu for all players"
                type="all"
            />
            <CommandsCard
                name="++about"
                description="Lets you learn about Capt. Shon and the people behind this game."
                type="all"
            />
            <CommandsCard
                name="++caption <caption>"
                description="Creates a new image for an ongoing Caption Circus."
                type="all"
            />
            <CommandsCard
                name="++create <channel_name> <image_url>"
                description="Creates a new Caption Circus with the given Image URL, and creates a separate channel with the given name to hold the carnival."
                type="admin"
            />
            <CommandsCard
                name="++setup"
                description="Allows you to setup roles before the Caption Circus starts."
                type="admin"
            />
            <CommandsCard
                name="++cancel"
                description="Cancels the current Caption Circus. It's gone!"
                type="admin"
            />
        </CommandWrapper>
    );
};

const Commands = () => {
    return (
        <Layout pageTitle="commands" description="commands">
            <StyledTitle>commands</StyledTitle>
            <CommandsList />
        </Layout>
    );
};

export default Commands;
