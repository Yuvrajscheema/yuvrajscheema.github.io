import { motion } from 'framer-motion';
import Image from 'next/image';

const aboutParagraphs = [
  `I'm an Engineering Physics student at UBC (Class of 2028) who likes building things that
    move. My favourite place to work is the boundary between hardware and software — writing
    firmware, tuning control loops, and designing the circuit boards they run on. Right now
    that means reverse-engineering radar protocols and laying out rigid-flex PCBs as an
    embedded systems co-op at Reach Technologies.`,
  `Outside of work, you'll usually find me building a drone completely from scratch — custom
    motor controller, sensorless field-oriented control written in Rust, and all — developing
    dashboard firmware for UBC Thunderbikes' electric motorcycle, or tinkering with my Arch
    Linux and Neovim setup. Whatever the project, the theme is the same: real-time systems
    that stay reliable, deterministic, and fast under real-world constraints.`,
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
            <p className="about-grid-info-text text-justify" key={paragraph.slice(0, 24)}>
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
