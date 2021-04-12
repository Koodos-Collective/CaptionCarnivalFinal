import Layout from "@components/Layout";
import { StyledTitle } from "@components/Headings";

const Clown = () => {
    return (
        <Layout pageTitle="index" description="this is the index">
            <StyledTitle>🤡</StyledTitle>
            <p>hey there 👀 it looks like you've found a secret page. congratulations!</p>
        </Layout>
    );
};

export default Clown;
