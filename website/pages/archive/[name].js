import styled from "styled-components";
import { useRouter } from "next/router";
import Layout from "@components/Layout";
import { StyledTitle } from "@components/Headings";

const StyledName = styled(StyledTitle)`
    & span {
        text-transform: capitalize;
    }
`;

const ArchiveName = () => {
    const router = useRouter();
    const { name } = router.query;

    return (
        <Layout>
            <StyledName>
                Hello, <span>{name}</span>!
            </StyledName>
        </Layout>
    );
};

export default ArchiveName;
