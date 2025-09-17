import { motion, useScroll, useTransform } from 'framer-motion';
import { ExternalLink, Github, Star, Award } from 'lucide-react';
import Image from 'next/image';
import { useRef, useState } from 'react';
import Button3D from '@/components/Button3D';

function Projects() {
  const [hoveredProject, setHoveredProject] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2], [0, 1]);

  const projectsData = [
    {
      image: '/projects/robot.webp',
      projectName: 'Untitled Spacecraft',
      projectLink: '/projects/untitled-spacecraft',
      projectDescription:
        'A robot built from scratch over the span of six weeks to compete in the UBC ENPH robot summer composing of 15 Engineering Physics student teams to compete in a robot competition',
      projectTech: ['KiCad', 'C++', 'Rust', 'Onshape', '3D printing'],
      projectExternalLinks: {
        github: 'https://github.com/enphx/firmware',
        externalLink: 'https://github.com/enphx/firmware',
      },
      featured: true,
      timeframe: '2025',
      accolades:
        'Achieved first place in the anual UBC ENPH robot summer competition',
    },
    // {
    //   video: 'https://www.youtube.com/embed/_zZ1Ndt5diU',
    //   projectName: 'QueryLens',
    //   projectLink: 'https://trynlp2sql.streamlit.app/',
    //   projectDescription:
    //     'QueryLens converts natural language to SQL queries, streamlining database interactions through intuitive processing.',
    //   projectTech: ['Streamlit', 'Azure OpenAI', 'SQLite3', 'Altair'],
    //   projectExternalLinks: {
    //     github: 'https://github.com/lohitkolluri/NLP2SQL',
    //     externalLink: 'https://trynlp2sql.streamlit.app/',
    //   },
    //   featured: true,
    //   timeframe: '2024',
    //   accolades:
    //     '2nd Runner Up at SEED Global Education Hackathon among 700+ teams',
    // },
    // {
    //   image: '/projects/project2.webp',
    //   projectName: 'FlaskPost',
    //   projectLink: 'https://flask-post.vercel.app/',
    //   projectDescription:
    //     'A FastAPI-powered mass email platform featuring SMTP configuration, CSV recipient management, and HTML template customization with live preview functionality.',
    //   projectTech: ['FastAPI', 'REST API', 'Jinja2', 'Fast Mail'],
    //   projectExternalLinks: {
    //     github: 'https://github.com/lohitkolluri/FlaskPost',
    //     externalLink: 'https://github.com/lohitkolluri/FlaskPost',
    //   },
    //   featured: false,
    //   timeframe: '2024',
    // },
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

  return (
    <div
      id="work"
      className="projects"
      style={{ paddingTop: '170px' }}
      ref={containerRef}
    >
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
        style={{ opacity }}
      >
        {projectsData.map(
          (
            {
              image = '/projects/default-project.webp',
              projectDescription,
              projectLink,
              projectExternalLinks,
              projectName,
              projectTech,
              featured,
              accolades,
            },
            index
          ) => {
            const hasVideo = false;

            const isEven = index % 2 === 1;

            return (
              <motion.div
                className={`project bg-gradient-to-tr from-purple-600/20 via-indigo-500/10 to-pink-500/20 p-[1px] rounded-xl transition-transform transform hover:scale-[1.02] duration-300 hover:shadow-2xl hover:shadow-indigo-500/30 ${
                  hoveredProject === projectName ? 'is-hovered' : ''
                } ${isEven ? 'even-project' : 'odd-project'}`}
                key={projectName}
                variants={itemVariants}
                onMouseEnter={() => setHoveredProject(projectName)}
                onMouseLeave={() => setHoveredProject(null)}
                whileHover={{
                  boxShadow: '0 10px 30px -15px rgba(100, 255, 218, 0.2)',
                  borderColor: 'rgba(100, 255, 218, 0.3)',
                }}
              >
                <div className="project-inner bg-[#0f0f0f] rounded-[inherit]">
                  <div
                    className={`project-image ${hasVideo ? 'has-video' : ''}`}
                    onClick={
                      hasVideo ? undefined : () => window.open(projectLink, '_blank')
                    }
                  >
                    <div className="project-image-overlay"></div>
                    <div className="project-image-container">
                      {hasVideo ? (
                        <iframe
                        ></iframe>
                      ) : (
                        <Image
                          src={image}
                          fill
                          loading="lazy"
                          alt={projectName}
                          quality={100}
                        />
                      )}
                    </div>
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
                      <motion.span
                        className="cursor-pointer"
                        onClick={() => window.open(projectLink, '_blank')}
                        whileHover={{ color: 'var(--theme-color)' }}
                      >
                        {projectName}
                      </motion.span>
                    </h3>
                    <motion.div
                      className="project-info-description"
                      whileHover={{
                        boxShadow: '0 15px 30px -15px rgba(2,12,27,0.8)',
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
                    <div className="project-info-links mt-4">
                      <Button3D
                        text="View Project"
                        link={projectLink}
                        color="primary"
                        className="mr-3"
                      />
                      <Button3D
                        text="GitHub"
                        link={projectExternalLinks.github}
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

