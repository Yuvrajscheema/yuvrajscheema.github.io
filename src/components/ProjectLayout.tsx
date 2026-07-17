import { motion } from 'framer-motion';
import { ArrowLeft, Award, Calendar, ExternalLink, Github } from 'lucide-react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { FC, ReactNode } from 'react';

interface ProjectLayoutProps {
  /** Project name — used for the page heading and the <title>. */
  title: string;
  /** One-to-two sentence summary — used for the intro paragraph and meta description. */
  description: string;
  /** Hero image path under public/, e.g. '/projects/robot.webp'. */
  image: string;
  /** Technologies used — rendered as chips. */
  tech: string[];
  /** GitHub repository URL. */
  github?: string;
  /** Optional extra external resource (demo, paper, guide, ...). */
  resource?: { label: string; href: string };
  /** e.g. '2025'. */
  timeframe?: string;
  /** Optional award / result line. */
  accolades?: string;
  /** Page body — write-up sections go here. */
  children: ReactNode;
}

/**
 * Shared layout for individual project pages (e.g. /untitled_spacecraft).
 * Pages under src/pages/ compose this with their content sections —
 * see src/pages/untitled_spacecraft.tsx for the canonical example.
 */
const ProjectLayout: FC<ProjectLayoutProps> = ({
  title,
  description,
  image,
  tech,
  github,
  resource,
  timeframe,
  accolades,
  children,
}) => {
  return (
    <div className="project-page">
      <Head>
        <title>{`${title} — Yuvraj Cheema`}</title>
        <meta name="description" content={description} />
      </Head>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      >
        <Link href="/#work" className="project-page-back">
          <ArrowLeft size={16} />
          <span>Back to all projects</span>
        </Link>

        <header className="project-page-header">
          <h1>{title}</h1>

          <div className="project-page-meta">
            {timeframe && (
              <span className="meta-item">
                <Calendar size={14} />
                {timeframe}
              </span>
            )}
            {accolades && (
              <span className="meta-item accolades">
                <Award size={14} />
                {accolades}
              </span>
            )}
          </div>

          <ul className="project-page-tech">
            {tech.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>

          <div className="project-page-links">
            {github && (
              <a href={github} target="_blank" rel="noopener noreferrer" className="md-btn">
                <Github size={16} />
                <span>GitHub</span>
              </a>
            )}
            {resource && (
              <a
                href={resource.href}
                target="_blank"
                rel="noopener noreferrer"
                className="md-btn md-btn-outlined"
              >
                <ExternalLink size={16} />
                <span>{resource.label}</span>
              </a>
            )}
          </div>
        </header>

        <div className="project-page-image">
          <Image src={image} alt={title} fill priority style={{ objectFit: 'cover' }} />
        </div>

        <p className="project-page-description">{description}</p>

        <article className="project-page-content">{children}</article>
      </motion.div>
    </div>
  );
};

export default ProjectLayout;
