import { NextSeo } from 'next-seo';
import Contact from '../components/Contact';
import Rocketeers from '../components/Rocketeers';
import type { NextPage } from 'next';

const Home: NextPage = () => {
  return (
    <>
      <NextSeo
        canonical="https://saifbechan.me"
        description="Main website of Saif Bechan showcasing some awesome web development skills. Using a genetic algorithm these rocketeers will find their path across the galaxy."
        openGraph={{
          url: 'https://saifbechan.me',
          title: 'saifbechan.me :: rocketeer 🚀',
          description:
            'Using a genetic algorithm these rocketeers will find their way across the galaxy.',
          images: [
            {
              url: 'https://saifbechan.me/images/preview.webp',
              width: 1280,
              height: 640,
              alt: 'saifbechan.me website preview',
            },
          ],
          site_name: 'Rocketeers',
          type: 'website',
        }}
        title="saifbechan.me :: rocketeers 🚀"
        twitter={{
          handle: '@saifbechan',
          site: '@saifbechan',
          cardType: 'summary_large_image',
        }}
      />
      <main>
        <Rocketeers />
      </main>
      <footer>
        <Contact />
      </footer>
    </>
  );
};

export default Home;
