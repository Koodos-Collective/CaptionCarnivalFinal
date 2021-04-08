import Layout from '../components/Layout';
// import CaptionedMeme from '../components/CaptionedMeme';

import dynamic from 'next/dynamic';

const CaptionedNoSSR = dynamic(() => import('../components/CaptionedMeme'), {
    ssr: false,
}); // captioned meme will get dynamically rendered

// will be shifted to the slug /caption/[id]

export default function Caption() {
    // fetch text and url using firebase
    const text = `no one:
    not even a single person:
    my brain:`;
    // const url = 'https://i.insider.com/5abb9e6a3216741c008b462d';
    const url = 'https://media.giphy.com/media/SKGo6OYe24EBG/giphy.gif';

    return (
        <Layout
            pageTitle="Captioned Meme"
            description="this is the meme you made! good job 🤠👍">
            <CaptionedNoSSR caption={text} imageUrl={url} />
        </Layout>
    );
}
