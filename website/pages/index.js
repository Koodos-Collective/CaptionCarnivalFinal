import Layout from "@components/Layout";

import { StyledTitle, MainTitle } from "@components/Headings";
import Content from "@components/Content";

const Home = () => {
    return (
        <Layout pageTitle="index" description="this is the index">
            {/* <StyledTitle>caption carnival</StyledTitle> */}
            <MainTitle />
            <Content />
        </Layout>
    );
};

export default Home;
