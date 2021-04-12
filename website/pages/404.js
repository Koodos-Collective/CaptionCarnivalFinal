import Layout from "@components/Layout";
import { StyledTitle } from "@components/Headings";

const Custom404 = props => {
    return (
        <Layout pageTitle="404" description="404 - Page Not Found">
            <StyledTitle>404 - page not found</StyledTitle>
        </Layout>
    );
};

export default Custom404;
