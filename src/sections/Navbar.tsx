import { motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import Button from '../components/Button';

const sectionLinks = [
  { name: 'About', link: '/#about' },
  { name: 'Experience', link: '/#experience' },
  { name: 'Projects', link: '/#work' },
];

function Navbar() {
  const [navbarVisible, setNavbarVisible] = useState(false);
  const [responsiveNavVisible, setResponsiveNavVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => setNavbarVisible(window.scrollY > 100);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close the responsive menu when clicking anywhere outside it.
  useEffect(() => {
    const closeMenu = () => setResponsiveNavVisible(false);
    document.documentElement.addEventListener('click', closeMenu);
    return () => document.documentElement.removeEventListener('click', closeMenu);
  }, []);

  // Blur the page content while the responsive menu is open.
  useEffect(() => {
    const main = document.querySelector('main');
    if (responsiveNavVisible) {
      main?.classList.add('blur');
    } else {
      main?.classList.remove('blur');
    }
  }, [responsiveNavVisible]);

  return (
    <nav role="navigation" aria-label="Main navigation">
      <div className={`wrapper ${navbarVisible ? 'blur-nav' : ''}`}>
        <motion.div
          className="brand"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 0.5,
            ease: 'easeInOut',
          }}
        >
          <Link href="/" aria-label="Homepage">
            YC
          </Link>
        </motion.div>
        <motion.div
          className="nav-responsive-toggle"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 0.3,
            ease: 'easeInOut',
          }}
        >
          {responsiveNavVisible ? (
            <X
              onClick={(e) => {
                e.stopPropagation();
                setResponsiveNavVisible(false);
              }}
              size={24}
              aria-label="Close navigation menu"
              role="button"
              tabIndex={0}
            />
          ) : (
            <Menu
              onClick={(e) => {
                e.stopPropagation();
                setResponsiveNavVisible(true);
              }}
              size={24}
              aria-label="Open navigation menu"
              role="button"
              tabIndex={0}
              aria-expanded={responsiveNavVisible}
              aria-controls="nav-menu"
            />
          )}
        </motion.div>
        <motion.div
          id="nav-menu"
          className={`${responsiveNavVisible ? 'nav-responsive' : ''} nav-items`}
          onClick={(e) => e.stopPropagation()}
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 100 }}
          transition={{
            duration: 0.3,
            ease: 'easeInOut',
          }}
          aria-hidden={!responsiveNavVisible}
        >
          <ul className="nav-items-list">
            {sectionLinks.map(({ name, link }, index) => (
              <motion.li
                key={name}
                className="nav-items-list-item"
                initial={{ opacity: 0, y: -25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.3,
                  ease: 'easeInOut',
                  delay: 0.1 + index * 0.1,
                }}
              >
                <Link
                  href={link}
                  className="nav-items-list-item-link"
                  onClick={() => setResponsiveNavVisible(false)}
                  aria-label={`Navigate to ${name}`}
                >
                  {name}
                </Link>
              </motion.li>
            ))}
          </ul>
          <motion.div
            className="nav-items-button"
            initial={{ opacity: 0, y: -25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.3,
              ease: 'easeInOut',
              delay: 0.6,
            }}
          >
            <Button
              text="Resume"
              link="https://codeberg.org/Yuvraj/Resume/src/branch/main/resume.pdf"
              variant="outline"
              size="sm"
              showExternalIcon={true}
              className="resume-btn"
            />
          </motion.div>
        </motion.div>
      </div>
    </nav>
  );
}

export default Navbar;
