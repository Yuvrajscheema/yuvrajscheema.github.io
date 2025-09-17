import { motion } from 'framer-motion';
import Link from 'next/link';
import { useEffect, useState, useRef } from 'react';

function Experience() {
  const [selected, setSelected] = useState(0);
  const [mounted, setMounted] = useState(false);
  const timelineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    
    // Scroll timeline to selected item on mobile
    if (timelineRef.current && window.innerWidth <= 768) {
      const container = timelineRef.current;
      const selectedItem = container.querySelector(`.timeline-item-${selected}`);
      if (selectedItem) {
        container.scrollTo({
          left: (selectedItem as HTMLElement).offsetLeft - 20,
          behavior: 'smooth'
        });
      }
    }
  }, [selected, mounted]);

  const experiences = [
    {
      name: 'UOttawa Mechanical Engineering ',
      role: 'Constrols Reasearch Co-op',
      url: 'https://www.uottawa.ca/faculty-engineering/department-mechanical-engineering',
      start: 'January 2025',
      end: 'May 2025',
      color: '#bb86fc', // Primary color
      icon: 'O',
      shortDescription: [
        'Successfully implemented and tuned an L1 adaptive controller on a Crazyflie nanodrone, significantly enhancing its resilience and stability against external disturbances.',
        'Worked alongside a PhD student to develop novel reinforcement learning models for drone swarms, with the goal of optimizing performance for satellite reflection panels.',
        'Provided an excellent platform by porting and adapting the ArduPilot firmware to the Crazyflie, enabling the use of a robust, open-source flight stack on a widely-used research and educational quadrotor',
        'Integrated an ESP32 as a serial bridge to enable wireless MAVLINK communication for seamless drone-to-ground station connectivity.',
      ],
    },
    {
      name: 'UBC Thunderbikes',
      role: 'Battery Engineer',
      url: 'https://ubcthunderbikes.com/index.html',
      start: 'September 2024',
      end: 'Present',
      color: '#03dac6', // Secondary color
      icon: 'T',
      shortDescription: [
        'Designed and developed a new charging solution for an electric motorbike\'s 36-cell battery pack, improving user experience by eliminating the need for disassembly.',
        'Assembled and tested a Battery Management System (BMS) for a 100V motorcycle battery pack, ensuring safe and optimal performance.',
        'Conducted thermal analysis using MATLAB on high-voltage battery packs to validate safety parameters and ensure the motorcycle\'s, power system operates reliably under all conditions.',
        'Contributed to design reviews for key motorbike subsystems, including battery cooling, control systems, frame, and custom electronic designs'

      ],
    },
    {
      name: 'UVic CFAR',
      role: 'Intern',
      url: 'https://www.uvic-cfar.com/',
      start: 'June 2023',
      end: 'October 2024',
      color: '#cf6679', // Error color
      icon: 'V',
      shortDescription: [
        'Led a team of five researchers in the development of an emissions analyzer system for small jet engines (Corvid50), overseeing the project from concept to final presentation.',
        'Designed a reliable prototype based on extensive literature review and an iterative, data-driven design methodology.',
        'Utilized Excel and MATLAB for data analysis, performing stoichiometric and gas flow calculations to validate engine test results and ensure design accuracy.',
        'Presented final designs and project outcomes to a group of three senior engineers, effectively communicating technical results.',

      ],
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  return (
    <motion.div
      className="experience"
      id="experience"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      variants={{
        visible: { opacity: 1, y: -50 },
        hidden: { opacity: 0, y: 0 },
      }}
    >
      <div className="title">
        <h2>Where I&apos;ve Worked</h2>
      </div>

      <div className="experience-content-container">
        {/* Tabbed Navigation */}
        <div className="experience-tabs" ref={timelineRef}>
          {experiences.map((experience, index) => (
            <button
              key={`tab-${index}`}
              className={`experience-tab ${index === selected ? 'experience-tab-selected' : ''}`}
              onClick={() => setSelected(index)}
              style={{ borderColor: index === selected ? experience.color : 'transparent' }}
            >
              {experience.name}
            </button>
          ))}
        </div>

        {/* Experience Card */}
        <motion.div
          className="experience-card md-card"
          key={selected}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.4 }}
        >
          <motion.div
            className="experience-header"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div className="experience-title-container" variants={itemVariants}>
              <div className="experience-title-badge" style={{ backgroundColor: experiences[selected].color }}>
                {experiences[selected].icon}
              </div>
              <div>
                <h3 className="experience-title">
                  {experiences[selected].role}
                  <span className="experience-company">
                    &nbsp;@&nbsp;
                    <Link href={experiences[selected].url} legacyBehavior>
                      <a target="_blank" rel="noopener noreferrer" className="link">
                        {experiences[selected].name}
                      </a>
                    </Link>
                  </span>
                </h3>
                <p className="experience-date">
                  {experiences[selected].start} - {experiences[selected].end}
                </p>
              </div>
            </motion.div>

            <motion.div className="experience-description" variants={containerVariants}>
              {experiences[selected].shortDescription.map((description, index) => (
                <motion.div
                  key={index}
                  className="experience-item"
                  variants={itemVariants}
                  custom={index}
                  whileHover={{ x: 5 }}
                >
                  <div className="experience-item-bullet" style={{ backgroundColor: experiences[selected].color }}></div>
                  <p>{description}</p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
}

export default Experience;
