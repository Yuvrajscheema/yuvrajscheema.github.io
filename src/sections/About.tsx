import { motion } from 'framer-motion';
import Image from 'next/image';

const aboutText = `
    Im an Engineering Physics student with a passion for Robotics, Control Systems and Embedded Systems.
    I enjoy designing robust, real-time systems for time-critical applications,
    with an emphasis on reliability, determinism, and performance under real-world constraints.
`;

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
          <p className="about-grid-info-text text-justify">{aboutText}</p>
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
