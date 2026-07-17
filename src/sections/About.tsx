import { motion } from 'framer-motion';
import Image from 'next/image';

const aboutParagraphs = [
  `I'm an Engineering Physics student at UBC (Class of 2028), and I've been hooked on building
    things that move for about as long as I can remember. The work I love most lives right at the
    seam between hardware and software — writing the firmware, tuning the control loops, and laying
    out the circuit boards it all runs on. These days that looks like reverse-engineering marine
    radar protocols and squeezing rigid-flex PCBs into centimetre-scale footprints as an embedded
    systems co-op at Reach Technologies.`,
  `When I'm off the clock, I'm usually buried in a project of my own: building a racing drone from
    absolute scratch — custom motor controller, sensorless field-oriented control written in Rust,
    the works — writing dashboard firmware for UBC Thunderbikes' electric motorcycle, or endlessly
    refining my Arch Linux and Neovim setup. Different projects, same obsession: real-time systems
    that stay reliable, deterministic, and fast when the real world pushes back.`,
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
