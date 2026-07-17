import { motion, useScroll, useTransform, Variants } from 'framer-motion';
import { FC, useMemo } from 'react';
import Button from '../components/Button';

// Define variants for animations
const containerVariants: Variants = {
  hidden: { opacity: 0, y: 5, scale: 0.9 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: 'easeInOut', delay: 0.6 },
  },
};

const titleVariants: Variants = {
  hidden: { opacity: 0, y: 5, rotate: -10 },
  visible: {
    opacity: 1,
    y: 0,
    rotate: 0,
    transition: { duration: 0.5, ease: 'easeInOut', delay: 0.6 },
  },
};

const textVariants: Variants = {
  hidden: { opacity: 0, y: 5 },
  visible: (custom: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: 'easeInOut', delay: 0.8 + custom * 0.2 },
  }),
};

// Keywords for floating background
const keywords = [
  'ArduPilot', 'C++', 'CAN bus', 'FreeRTOS', 'KiCad', 'MATLAB', 'Onshape', 'Python', 'Rust', 'STM32',
];

// Floating keyword: random position/size are memoized so they are picked once
// per mount, and the parallax offset is a Framer motion value — scrolling never
// triggers a React re-render here.
const FloatingKeyword: FC<{ text: string; index: number }> = ({ text, index }) => {
  const { scrollY } = useScroll();

  const { x, y, size, opacity } = useMemo(
    () => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: 12 + Math.random() * 6, // between 12-18px
      opacity: 0.02 + Math.random() * 0.03, // very subtle
    }),
    []
  );

  // Each keyword drifts at a slightly different rate; alternate direction by index.
  const scrollFactor = (0.005 + (index % 5) * 0.002) * (index % 2 === 0 ? 1 : -1);
  const offsetY = useTransform(scrollY, (value) => value * scrollFactor);

  return (
    <motion.div
      className="floating-keyword"
      style={{
        position: 'absolute',
        left: `${x}%`,
        top: `${y}%`,
        y: offsetY,
        fontSize: `${size}px`,
        color: 'var(--theme-color)',
        opacity,
        zIndex: 0,
        fontFamily: 'var(--fira-code)',
        pointerEvents: 'none',
        fontWeight: 'bold',
      }}
    >
      {text}
    </motion.div>
  );
};

const Hero: FC = () => {
  // Parallax for the hero background, driven by motion values (no re-renders).
  const { scrollY } = useScroll();
  const backgroundPositionY = useTransform(scrollY, (value) => `${value * 0.03}px`);

  return (
    <section className="hero-container" aria-labelledby="hero-heading">
      <div className="floating-keywords-container">
        {keywords.map((keyword, index) => (
          <FloatingKeyword key={keyword} text={keyword} index={index} />
        ))}
      </div>
      <motion.div
        className="hero section-transition"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="hero-background-wrapper">
          <motion.div className="hero-background" style={{ backgroundPositionY }} />
        </div>
        <motion.h1
          id="hero-heading"
          className="hero-title"
          variants={titleVariants}
          initial="hidden"
          animate="visible"
        >
          Hello, I&apos;m
        </motion.h1>
        <motion.h2
          className="hero-title-large"
          variants={textVariants}
          custom={0}
          initial="hidden"
          animate="visible"
        >
          Yuvraj Cheema.
        </motion.h2>
        <motion.p
          className="hero-text"
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: 'easeInOut', delay: 1.4 }}
        >
          I&apos;m an <span className="highlight">Engineering Physics student</span> at UBC. I build{' '}
          <span className="highlight">robots</span>, <span className="highlight">drones</span>, and the{' '}
          <span className="highlight">embedded systems</span> that run them, working from the firmware and
          control loops down to the circuit boards underneath.
        </motion.p>
        <motion.div
          className="hero-button"
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: 'easeInOut', delay: 1.4 }}
        >
          <Button
            text="Connect on LinkedIn"
            link="https://linkedin.com/in/yuvrajscheema"
            aria-label="LinkedIn profile of Yuvraj Cheema"
            variant="primary"
            size="lg"
            showExternalIcon={true}
          />
          <Button
            text="View Projects"
            link="/#work"
            aria-label="View my projects"
            variant="outline"
            size="lg"
            className="ml-4"
          />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
