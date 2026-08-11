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
      name: 'Reach Technologies',
      role: 'Embedded Systems Engineering Co-op',
      url: 'https://www.reachtest.com/',
      start: 'May 2026',
      end: 'December 2026',
      color: '#dbbc7f', // Everforest yellow
      icon: 'R',
      shortDescription: [
        'Reverse-engineered the network protocol of a Lowrance marine radar, enabling raw data capture over UDP without the OEM chartplotter.',
        'Built a C# async/await client that ingests over 4 Mbps of radar data via multicast and records it in the IRIG 106 Chapter 10 format.',
        'Developed a live and playback radar display processor with size normalization, markers, and a lead line, plus command and control over a separate multicast channel — the radar can be operated entirely from a laptop.',
        'Designed a rigid-flex IMU PCB (4-layer rigid, 2-layer flex) packing an IMU, an LTC4332 transceiver, and supporting passives into a 2 cm × 1 cm footprint with impedance-matched differential pairs.',
        'Updated the VHDL on a Xilinx Kria SoM to support a new IMU board, accounting for an added SPI word delay and a revised clock rate, and reworked the testbench to validate the new timing.',
        'Ported the Yocto C++ sensor layer to the new IMU part, and containerized the whole Yocto build in Docker so the rest of the team could skip a notoriously painful manual setup.',
        'Brought up the new IMU boards on an oscilloscope: the MISO lines were dead because unconstrained FPGA pins were holding SS2 and SS3 low. Cutting those pins brought every board to life.',
        'Wrote a real-time 3D orientation viewer in Odin with OpenGL, modelling the product as three coupled rotating assemblies lit with surface normals, launched from the existing C# application and fed live IMU attitude over UDP.',
      ],
    },
    {
      name: 'UOttawa Mechanical Engineering',
      role: 'Control Systems Engineer Co-op',
      url: 'https://www.uottawa.ca/faculty-engineering/department-mechanical-engineering',
      start: 'January 2025',
      end: 'May 2025',
      color: '#a7c080', // Everforest green (primary)
      icon: 'O',
      shortDescription: [
        'Implemented and tuned an L1 adaptive controller on a Crazyflie nano-drone, significantly improving its resilience and stability against external disturbances.',
        'Worked alongside a PhD student to develop novel reinforcement learning models for satellite-tracking drone swarms.',
        'Ported and adapted the ArduPilot firmware to the Crazyflie 2.1 in C++, bringing a robust, open-source flight stack to a widely used research and educational quadrotor.',
        'Integrated an ESP32 as a serial bridge over UART, enabling wireless MAVLink communication between the drone and its ground station.',
      ],
    },
    {
      name: 'UBC Thunderbikes',
      role: 'Firmware Engineer',
      url: 'https://ubcthunderbikes.com/index.html',
      start: 'September 2024',
      end: 'Present',
      color: '#83c092', // Everforest aqua (secondary)
      icon: 'T',
      shortDescription: [
        'Streamed LVGL frames directly to display memory over LTDC DMA for the bike\'s dashboard, cutting CPU usage from 40% to 12%, while ensuring DMA-cache coherency on the STM32 to keep display data intact.',
        'Integrated a CAN bus network carrying status messages between the dashboard, VCU, BMS, and charger.',
        'Assembled and tested a Battery Management System for a 100V motorcycle battery, with cell-level monitoring across 24 series cells.',
        'Designed a charging solution that removed the need to disassemble the bike, and contributed to design reviews spanning battery cooling, control systems, and custom electronics.',
      ],
    },
    {
      name: 'UVic CFAR',
      role: 'Intern',
      url: 'https://www.uvic-cfar.com/',
      start: 'June 2023',
      end: 'October 2024',
      color: '#e67e80', // Everforest red
      icon: 'V',
      shortDescription: [
        'Led a team of five researchers developing an emissions analyzer system for small jet engines, overseeing the project from concept to final presentation.',
        'Designed a reliable prototype grounded in an extensive literature review and an iterative, data-driven design methodology.',
        'Performed stoichiometric and gas flow calculations in Excel and MATLAB to validate engine test results and confirm design accuracy.',
        'Presented final designs and project outcomes to a panel of three senior engineers.',
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
