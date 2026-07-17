import { motion } from 'framer-motion';
import { Award, Github, Star } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import Button3D from '@/components/Button3D';

// Featured projects. `pagePath` is the internal write-up page under src/pages/
// (e.g. '/untitled_spacecraft' → src/pages/untitled_spacecraft.tsx);
// `github` is the repository link.
const projectsData = [
  {
    image: '/projects/robot.webp',
    projectName: 'Untitled Spacecraft',
    projectDescription:
      'A robot built from scratch over the span of six weeks to compete in the UBC ENPH robot summer composing of 15 Engineering Physics student teams to compete in a robot competition',
    projectTech: ['KiCad', 'C++', 'Rust', 'Onshape', '3D printing'],
    pagePath: '/untitled_spacecraft',
    github: 'https://github.com/enphx/firmware',
    featured: true,
    timeframe: '2025',
    accolades: 'Achieved first place in the annual UBC ENPH robot summer competition',
  },
  {
    image: '/projects/cf2.webp',
    projectName: 'Ardupilot Crazyflie',
    projectDescription:
      'A modification to the Crazyflie porting the Ardupilot flight stack utilizing a serial bridge between the flight controller and an ESP32 allowing a more stable flight and access to a large community of open source packages to be used for research',
    projectTech: ['C', 'C++', 'Python', 'UART'],
    pagePath: '/ardupilot_crazyflie',
    github: 'https://github.com/Yuvrajscheema/crazyflie-arducopter-setup',
    featured: true,
    timeframe: '2025',
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
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
    },
  },
};

function Projects() {
  const [hoveredProject, setHoveredProject] = useState<string | null>(null);

  return (
    <div id="work" className="projects" style={{ paddingTop: '170px' }}>
      <motion.div
        className="title"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        variants={{
          visible: { opacity: 1, y: -50 },
          hidden: { opacity: 0, y: 0 },
        }}
      >
        <h2>Some Things I&apos;ve Built</h2>
      </motion.div>

      <motion.div
        className="projects-container"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
      >
        {projectsData.map(
          (
            {
              image,
              projectDescription,
              projectName,
              projectTech,
              pagePath,
              github,
              featured,
              accolades,
            },
            index
          ) => {
            const isEven = index % 2 === 1;

            return (
              <motion.div
                className={`project ${hoveredProject === projectName ? 'is-hovered' : ''} ${
                  isEven ? 'even-project' : 'odd-project'
                }`}
                key={projectName}
                variants={itemVariants}
                onMouseEnter={() => setHoveredProject(projectName)}
                onMouseLeave={() => setHoveredProject(null)}
              >
                <div className="project-inner">
                  <div className="project-image">
                    <div className="project-image-overlay"></div>
                    <Link href={pagePath} aria-label={`Read about ${projectName}`}>
                      <div className="project-image-container">
                        <Image src={image} fill loading="lazy" alt={projectName} />
                      </div>
                    </Link>
                    {featured && (
                      <motion.div
                        className="featured-badge"
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3, duration: 0.4 }}
                      >
                        <Star size={14} />
                        <span>Top Project</span>
                      </motion.div>
                    )}
                  </div>
                  <motion.div
                    className="project-info"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    <h3 className="project-info-title">
                      <Link href={pagePath}>{projectName}</Link>
                    </h3>
                    <motion.div
                      className="project-info-description"
                      whileHover={{
                        boxShadow: '0 15px 30px -15px rgba(0, 0, 0, 0.8)',
                        y: -5,
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      <p>{projectDescription}</p>
                      {accolades && (
                        <div className="project-accolades">
                          <Award size={14} />
                          <span>{accolades}</span>
                        </div>
                      )}
                    </motion.div>
                    <ul className="project-info-tech-list">
                      {projectTech.map((tech) => (
                        <motion.li
                          className="project-info-tech-list-item"
                          key={tech}
                          whileHover={{ y: -2, color: 'var(--theme-color)' }}
                          transition={{ duration: 0.2 }}
                        >
                          {tech}
                        </motion.li>
                      ))}
                    </ul>
                    <div className="project-info-links">
                      <Button3D
                        text="View Project"
                        link={pagePath}
                        color="primary"
                        className="mr-3"
                      />
                      <Button3D
                        text="GitHub"
                        link={github}
                        color="secondary"
                        icon={<Github size={16} />}
                      />
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            );
          }
        )}
      </motion.div>
    </div>
  );
}

export default Projects;
