import { motion, useInView, useAnimation } from 'framer-motion';
import Image from 'next/image';
import { useEffect, useRef, useState, useCallback } from 'react';
import { isInViewport } from '@/utils/scrollAnimation';

interface AboutText {
  intro: string;
  experience: string;
}

const mobileText: AboutText = {
  intro:
    `
    Im an Engineering Physics student with a deep passion for Control Systems, Energy Systems, and Robotics.
    I specialize in embedded systems, focusing on building robust and efficient solutions. I'm driven by a fascination with the technology that powers the future,
    from smart robotics to sustainable energy grids, and I'm committed to bringing these complex ideas to life through innovative design and problem-solving.
    `,
  experience:
    `
    My hands-on experience includes working with FTC and FRC robots, where I served as the programming lead for two years and led my team to a BC provincial championship.
    I've also contributed to professional research environments, including a position at UVic CFAR where I developed an emissions analyzer for the sustainable air fuel program.
    At UOttawa, I implemented L1 adaptive control on a nanoquadrotor, and my work on the firmware,
    control systems, and circuitry of a robot for the UBC Engineering Physics robot summer competition earned our team first place.
    `,
};

const desktopText: AboutText = {
  intro:
    `
    Im an Engineering Physics student with a deep passion for Control Systems, Energy Systems, and Robotics.
    I specialize in embedded systems, focusing on building robust and efficient solutions. I'm driven by a fascination with the technology that powers the future,
    from smart robotics to sustainable energy grids, and I'm committed to bringing these complex ideas to life through innovative design and problem-solving.
    `,
  experience:
    `
    My hands-on experience includes working with FTC and FRC robots, where I served as the programming lead for two years and led my team to a BC provincial championship.
    I've also contributed to professional research environments, including a position at UVic CFAR where I developed an emissions analyzer for the sustainable air fuel program.
    At UOttawa, I implemented L1 adaptive control on a nanoquadrotor, and my work on the firmware,
    control systems, and circuitry of a robot for the UBC Engineering Physics robot summer competition earned our team first place.
    `,
};

// Skill definitions with icons from Simple Icons CDN
interface Skill {
  name: string;
  icon: string;
}

const technologiesLine1: Skill[] = [
  { name: 'C++', icon: 'https://cdn.simpleicons.org/gnu/white'},
  { name: 'Python', icon: 'https://cdn.simpleicons.org/python/white' },
  { name: 'Shell Scripting', icon: 'https://cdn.simpleicons.org/gnubash/white' },
  { name: 'Java', icon:   'https://cdn.simpleicons.org/intellijidea/white'  },
  { name: 'Rust', icon: 'https://cdn.simpleicons.org/rust/white'  },
  { name: 'Tmux', icon: 'https://cdn.simpleicons.org/tmux/white'  },
  { name: 'TensorFlow', icon: 'https://cdn.simpleicons.org/tensorflow/white' },
];

const technologiesLine2: Skill[] = [
  { name: 'TensorFlow', icon: 'https://cdn.simpleicons.org/tensorflow/white' },
  { name: 'ROS',  icon: 'https://cdn.simpleicons.org/ros/white' },
  { name: 'SolidWorks', icon: 'https://cdn.simpleicons.org/dassaultsystemes/white' },
  { name: 'KiCad', icon:  'https://cdn.simpleicons.org/kicad/white'  },
  { name: 'Neovim', icon:  'https://cdn.simpleicons.org/neovim/white'  },
  { name: 'MatLab', icon: 'https://cdn.simpleicons.org/monster/white' },
  { name: 'STM32',  icon: 'https://cdn.simpleicons.org/stmicroelectronics/white' },
  { name: 'ESP32',  icon: 'https://cdn.simpleicons.org/espressif/white' },

];

const variants = {
  visible: { opacity: 1, y: -50 },
  hidden: { opacity: 0, y: 0 },
};

function About() {
  const ref = useRef<HTMLDivElement>(null);
  const techSectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref);
  const [isMobile, setIsMobile] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const controls = useAnimation();

  const checkMobile = useCallback(() => {
    setIsMobile(window.innerWidth <= 768);
  }, []);

  useEffect(() => {
    // Initial check
    checkMobile();

    // Add resize listener
    window.addEventListener('resize', checkMobile);

    return () => window.removeEventListener('resize', checkMobile);
  }, [checkMobile]);

  useEffect(() => {
    console.log('Element is in view: ', isInView);
  }, [isInView]);

  useEffect(() => {
    // Check visibility for scroll animations
    const handleScroll = () => {
      const section = document.querySelector('.about');
      if (section && isInViewport(section) && !isVisible) {
        setIsVisible(true);
        controls.start({ opacity: 1, y: 0 });
      }
    };

    window.addEventListener('scroll', handleScroll);

    // Initial checks
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isVisible, controls]);

  // Create a larger array for truly seamless scrolling
  const generateSkillList = (technologies: Skill[]) => {
    // Create enough duplicates to ensure continuous scrolling
    // Triple the items to guarantee smooth looping
    return [...technologies, ...technologies, ...technologies];
  };

  const skillsRow1 = generateSkillList(technologiesLine1);
  const skillsRow2 = generateSkillList(technologiesLine2);

  return (
    <motion.div
      className={`about fade-in-section ${isVisible ? 'is-visible' : ''} section-transition`}
      id="about"
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={controls}
      transition={{ duration: 0.6, ease: 'easeInOut' }}
    >
      <div className="title">
        <h2>About Me</h2>
      </div>
      <div className="about-grid">
        <div className="about-grid-info">
          <p className="about-grid-info-text text-justify text-base md:text-lg leading-relaxed">
            {isMobile ? mobileText.intro : desktopText.intro}
          </p>
          <p className="about-grid-info-text text-justify text-base md:text-lg leading-relaxed indent-4">
            {isMobile ? mobileText.experience : desktopText.experience}
          </p>

          <div className="tech-section" ref={techSectionRef}>
            <div className="tech-carousel">
              <div className="tech-container right-to-left">
                {skillsRow1.map((skill, index) => (
                  <motion.div
                    key={`line1-${skill.name}-${index}`}
                    className="tech-badge"
                    whileHover={{ y: -5 }}
                    transition={{ duration: 0.2 }}
                    initial={{ opacity: 0 }}
                    animate={{
                      opacity: 1,
                      transition: {
                        duration: 0.5,
                        delay: Math.min(index * 0.01, 0.2)
                      }
                    }}
                  >
                    <div className="tech-icon">
                      <img src={skill.icon} alt={`${skill.name} icon`} />
                    </div>
                    {skill.name}
                  </motion.div>
                ))}
              </div>

              <div className="tech-container left-to-right">
                {skillsRow2.map((skill, index) => (
                  <motion.div
                    key={`line2-${skill.name}-${index}`}
                    className="tech-badge"
                    whileHover={{ y: -5 }}
                    transition={{ duration: 0.2 }}
                    initial={{ opacity: 0 }}
                    animate={{
                      opacity: 1,
                      transition: {
                        duration: 0.5,
                        delay: Math.min(index * 0.01, 0.2)
                      }
                    }}
                  >
                    <div className="tech-icon">
                      <img src={skill.icon} alt={`${skill.name} icon`} />
                    </div>
                    {skill.name}
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="about-grid-photo">
          <div className="overlay"></div>
          <div className="overlay-border"></div>
          <div className="about-grid-photo-container">
            {!imageError ? (
              <Image
                src="/etc/profilePicture.jpg"
                alt="Lohit Kolluri - DevOps & Cloud Solutions Engineer"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
                style={{ objectFit: 'cover' }}
                className="rounded-lg"
                aria-label="Profile picture of Lohit Kolluri"
                onError={() => setImageError(true)}
              />
            ) : (
              <Image
                src="/etc/profilePicture.jpg"
                alt="Lohit Kolluri - DevOps & Cloud Solutions Engineer"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
                style={{ objectFit: 'cover' }}
                className="rounded-lg"
                aria-label="Profile picture of Lohit Kolluri"
              />
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default About;
