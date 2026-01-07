import '@/scss/globals.css';
import '@/scss/index.scss';
import { AppProvider } from '@/utils/ThemeContext';
import { AnimatePresence, motion } from 'framer-motion';
import type { AppProps } from 'next/app';
import dynamic from 'next/dynamic';
import { Fira_Code, Raleway } from 'next/font/google';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { FC, useEffect, useState } from 'react';

// Import the Mosaic Loader component (adjust path as needed)
import MosaicLoader from '@/components/Loader';

// Fonts
const raleway = Raleway({ subsets: ['latin'] });
const firaCode = Fira_Code({ subsets: ['latin'], weight: ['300', '400', '500', '600', '700'] });

// Animated cursor (disabled on mobile)
const AnimatedCursor = dynamic(() => import('react-animated-cursor'), { ssr: false });

// Mosaic Loader Wrapper
const Loader = () => (
  <div className="loader-wrapper">
    <MosaicLoader size={80} color="#bb86fc" gap={4} />
  </div>
);

const App: FC<AppProps> = ({ Component, pageProps }) => {
  const [isMobile, setIsMobile] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // Handle mount, window resizing, and router events
  useEffect(() => {
    console.log('App mounted');
    setMounted(true);

    // Check if mobile
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);

    // Smooth scroll
    document.documentElement.style.scrollBehavior = 'smooth';

    // Handle loading state
    const handleRouteChangeStart = () => {
      console.log('Route change started:', router.asPath);
      setLoading(true);
    };
    const handleRouteChangeComplete = () => {
      console.log('Route change complete, isReady:', router.isReady);
      if (router.isReady) {
        setLoading(false);
      }
    };
    const handleRouteChangeError = () => {
      console.log('Route change error');
      setLoading(false);
    };

    // Fallback timeout to ensure loader displays for ~1s
    const timeout = setTimeout(() => {
      console.log('Fallback timeout triggered, hiding loader');
      setLoading(false);
    }, 1000); // 1000ms to match 1s SCSS animation

    // Listen for router events
    router.events.on('routeChangeStart', handleRouteChangeStart);
    router.events.on('routeChangeComplete', handleRouteChangeComplete);
    router.events.on('routeChangeError', handleRouteChangeError);

    return () => {
      clearTimeout(timeout);
      window.removeEventListener('resize', checkMobile);
      router.events.off('routeChangeStart', handleRouteChangeStart);
      router.events.off('routeChangeComplete', handleRouteChangeComplete);
      router.events.off('routeChangeError', handleRouteChangeError);
    };
  }, [router]);

  // Log when Component mounts
  useEffect(() => {
    console.log('Page component mounted:', Component.displayName || Component.name || 'Unknown');
  }, [Component]);

  // Don’t render until mounted (avoids hydration mismatch)
  if (!mounted) return null;

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

      {loading ? (
        <Loader />
      ) : (
        <AppProvider>
          <AnimatePresence mode="sync">
            <motion.div
              key={router.route}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.1 }}
            >
              <Component {...pageProps} />
            </motion.div>
          </AnimatePresence>

          {!isMobile && (
            <AnimatedCursor
              innerSize={8}
              outerSize={35}
              color="187, 134, 252"
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
        </AppProvider>
      )}
    </>
  );
};

export default App;
