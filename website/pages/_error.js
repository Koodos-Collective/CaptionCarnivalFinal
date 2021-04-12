import Layout from "@components/Layout";
import { StyledTitle } from "@components/Headings";

const Error = ({ statusCode }) => {
    return (
        <Layout pageTitle="500" description="500 - Page Error">
            <StyledTitle>error 500 - oops!</StyledTitle>
            <p>
                {statusCode
                    ? `It seems like an error, ${statusCode}, occurred on our side (the server)`
                    : "It seems like an error has occured on your side. Reload this page or check your connection!"}
            </p>
        </Layout>
    );
};

Error.getInitialProps = ({ res, err }) => {
    const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
    return { statusCode };
};

export default Error;
