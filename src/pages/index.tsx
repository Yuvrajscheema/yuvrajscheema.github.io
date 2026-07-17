import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';
import Head from 'next/head';

// Rendered immediately — above the fold.
import Hero from '../sections/Hero';
import Navbar from '../sections/Navbar';

// Below-the-fold sections load as separate chunks.
const Email = dynamic(() => import('../components/Email'), { ssr: false });
const SocialIcons = dynamic(() => import('../components/SocialIcons'), { ssr: false });
const FloatingButton = dynamic(() => import('../components/FloatingButton'), { ssr: false });
const About = dynamic(() => import('../sections/About'), {
  loading: () => <div className="section-loader" />,
});
const Experience = dynamic(() => import('../sections/Experience'), {
  loading: () => <div className="section-loader" />,
});
const Projects = dynamic(() => import('../sections/Projects'), {
  loading: () => <div className="section-loader" />,
});
const OtherProjects = dynamic(() => import('@/sections/OtherProjects'), {
  loading: () => <div className="section-loader" />,
});
const Footer = dynamic(() => import('../sections/Footer'), { ssr: false });

function Index() {
  return (
    <div className="app">
      <Head>
        <title>Yuvraj&apos;s Portfolio</title>
        <meta
          name="description"
          content="Yuvraj Cheema - Engineering Physics student specializing in control systems and embedded systems"
        />
        <link rel="canonical" href="https://yuvrajscheema.github.io" />

        <meta
          name="google-site-verification"
          content="DgzOS3oNMuUQ4Y1sU7x860SgyvsYvnd1BCWQLFu0KT8"
        />

        {/* Structured Data for Rich Search Results */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Person',
              name: 'Yuvraj Cheema',
              url: 'https://yuvrajscheema.github.io',
              jobTitle: 'Control Systems and Embedded Systems Engineer',
              worksFor: {
                '@type': 'Organization',
                name: 'Self-employed',
              },
              sameAs: [
                'https://linkedin.com/in/yuvrajscheema',
                'https://github.com/yuvrajscheema',
              ],
              knowsAbout: ['AWS', 'Docker', 'Cpp', 'Low level programming'],
            }),
          }}
        />
      </Head>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      >
        <Navbar />
        <SocialIcons />
        <Email />
        <main>
          <Hero />
          <About />
          <Experience />
          <Projects />
          <OtherProjects />
        </main>
        <Footer />
        <FloatingButton showAt={400} />
      </motion.div>
    </div>
  );
}

export default Index;
