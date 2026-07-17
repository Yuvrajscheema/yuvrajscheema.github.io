import { motion } from 'framer-motion';
import Image from 'next/image';

const aboutParagraphs = [
  `I'm an Engineering Physics student at UBC (Class of 2028). The work I've found most rewarding
    has always been the projects where I had to build the whole system myself, from the firmware
    and the control loops up to the circuit boards they run on. Right now that means
    reverse-engineering marine radar protocols and laying out rigid-flex PCBs as an embedded
    systems co-op at Reach Technologies.`,
  `Outside of work, I'm building a racing drone from scratch: a custom three-phase ESC running
    sensorless field-oriented control, written in Rust on an ARM Cortex-M33. I chose Rust because
    I wanted to deepen my low-level systems programming with a language that enforces safe memory
    management. When I'm not on that, I'm writing dashboard firmware for UBC Thunderbikes' electric
    motorcycle or refining my Arch Linux and Neovim setup. The theme across all of it is the same:
    real-time systems that stay reliable, deterministic, and fast under real-world constraints.`,
];

function About() {
  return (
    <motion.div
      className="about section-transition"
      id="about"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.6, ease: 'easeInOut' }}
    >
      <div className="title">
        <h2>About Me</h2>
      </div>
      <div className="about-grid">
        <div className="about-grid-info">
          {aboutParagraphs.map((paragraph) => (
            <p className="about-grid-info-text" key={paragraph.slice(0, 24)}>
              {paragraph}
            </p>
          ))}
        </div>

        <div className="about-grid-photo">
          <div className="overlay"></div>
          <div className="overlay-border"></div>
          <div className="about-grid-photo-container">
            <Image
              src="/etc/profilePicture.webp"
              alt="Yuvraj Cheema - Engineering Physics Student"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
              style={{ objectFit: 'cover' }}
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default About;
