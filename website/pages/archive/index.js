import Layout from "@components/Layout";
import styled from "styled-components";
import Link from "next/link";

import { StyledTitle } from "@components/Headings";

const TempP = styled.div`
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    width: 90%;
    word-break: break-word;
    margin: 1em 0;
`;

const Archive = () => {
    return (
        <Layout pageTitle="archive" description="archive">
            <StyledTitle>archive</StyledTitle>
            <TempP>
                <p>Coming soon. An archive of all Caption Carnivals ever played.</p>
            </TempP>
            <Link href="/clown">🤡</Link>
        </Layout>
    );
};

export default Archive;
