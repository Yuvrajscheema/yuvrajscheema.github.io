import '@/scss/globals.css';
import '@/scss/index.scss';
import type { AppProps } from 'next/app';
import dynamic from 'next/dynamic';
import { Fira_Code, Raleway } from 'next/font/google';
import Head from 'next/head';
import { FC, useEffect, useState } from 'react';

// Fonts — Raleway is a variable font (all weights); Fira Code is only used for
// small mono labels, so load just the weights the stylesheets reference.
const raleway = Raleway({ subsets: ['latin'] });
const firaCode = Fira_Code({ subsets: ['latin'], weight: ['400', '500'] });

// Client-only; never pre-rendered, so it cannot cause hydration mismatches.
const AnimatedCursor = dynamic(() => import('react-animated-cursor'), { ssr: false });

const App: FC<AppProps> = ({ Component, pageProps }) => {
  // Start as "mobile" so the custom cursor never flashes on touch devices;
  // flips to desktop after the first client-side measurement.
  const [isMobile, setIsMobile] = useState(true);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>

      <style jsx global>{`
        :root {
          --raleway: ${raleway.style.fontFamily};
          --fira-code: ${firaCode.style.fontFamily};
        }
      `}</style>

      <Component {...pageProps} />

        {!isMobile && (
          <AnimatedCursor
            innerSize={8}
            outerSize={35}
            color="167, 192, 128"
            outerAlpha={0.2}
            innerScale={1}
            outerScale={1.7}
            trailingSpeed={5}
            showSystemCursor={false}
            outerStyle={{ mixBlendMode: 'difference' }}
            clickables={[
              'a',
              'button',
              'input',
              '.link',
              '.hover-this',
              '.timeline-item',
              '.md-btn',
            ]}
          />
        )}
    </>
  );
};

export default App;
