import { Metadata } from 'next';

import Contact from '@/components/Contact';
import dynamic from 'next/dynamic';

const RocketeersComponent = dynamic(() => import('@/components/Rocketeers'), {
  ssr: false,
});

export const metadata: Metadata = {
  title: 'saifbechan.me :: rocketeers 🚀',
  metadataBase: new URL('https://saifbechan.me'),
  description:
    'Main website of Saif Bechan showcasing some awesome web development skills. Using a genetic algorithm these rocketeers will find their path across the galaxy.',
  twitter: {
    card: 'summary_large_image',
    title: 'saifbechan.me :: rocketeers 🚀',
    description:
      'Using a genetic algorithm these rocketeers will find their way across the galaxy.',
    creator: '@saifbechan',
    images: [
      {
        url: 'https://saifbechan.me/images/preview.webp',
        width: 1280,
        height: 640,
        alt: 'saifbechan.me website preview',
      },
    ],
  },
  openGraph: {
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
    type: 'website',
  },
};

export default function Page() {
  return (
    <>
      <main>
        <RocketeersComponent />
      </main>
      <footer>
        <Contact />
      </footer>
    </>
  );
}
