import Layout from '../components/Layout';
import Title from '../components/title/Title';
import HomePage from '../components/body/Content';
import Footer from '../components/footer/Footer';

export default function Main() {
    return (
        <Layout
            pageTitle="Caption Carnival"
            description="create a caption carnival in your discord server today!!!">
            <Title />
            <HomePage />
            <Footer />
        </Layout>
    );
}
