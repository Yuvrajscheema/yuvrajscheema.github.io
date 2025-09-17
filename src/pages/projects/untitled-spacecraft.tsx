import { motion } from 'framer-motion';
import Button3D from '@/components/Button3D';
import Image from 'next/image';
import { Star, Award } from 'lucide-react';

const UntitledSpacecraft = () => {
  return (
    <div className="project-detail-page p-8 md:p-16 bg-[#0f0f0f] text-white">
      {/* Header / Hero */}
      <section className="project-hero mb-12 flex flex-col md:flex-row gap-8">
        <div className="flex-1">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Untitled Spacecraft</h1>
          <p className="mb-4 text-lg md:text-xl">
            A robot built from scratch for the UBC ENPH Robot Summer competition.
          </p>
          <div className="flex gap-4">
            <Button3D
              text="View on GitHub"
              link="https://github.com/enphx/firmware"
              color="secondary"
              icon={<Star size={16} />}
            />
          </div>
        </div>
      </section>

      {/* Introduction */}
      <section className="project-section mb-12">
        <h2 className="text-3xl font-semibold mb-4">Introduction</h2>
        <p>
          The Untitled Spacecraft project is a collaborative robotic arm built for precision tasks
          and real-time WiFi-based feedback. This project was developed as part of the UBC ENPH253
          Robot Summer competition, involving 15 Engineering Physics student teams.
        </p>
      </section>

      {/* Goal */}
      <section className="project-section mb-12">
        <h2 className="text-3xl font-semibold mb-4">Goal</h2>
        <p>
          The primary goal was to design and implement a robotic arm capable of autonomous
          navigation and object manipulation, with accurate feedback for control system validation.
        </p>
      </section>

      {/* Work / Implementation */}
      <section className="project-section mb-12">
        <h2 className="text-3xl font-semibold mb-4">Work</h2>
        <ul className="list-disc pl-6">
          <li>Designed hardware using Onshape and 3D-printed key components.</li>
          <li>Programmed motion control with C++ and Rust for precision actuation.</li>
          <li>Implemented WiFi-based real-time monitoring for sensor feedback.</li>
          <li>Optimized performance to handle complex tasks autonomously.</li>
        </ul>
      </section>

      {/* Results / Accolades */}
      <section className="project-section mb-12">
        <h2 className="text-3xl font-semibold mb-4">Results</h2>
        <p>
          Achieved first place in the annual UBC ENPH Robot Summer competition. The robot
          demonstrated stable and precise motion, and the team successfully completed all
          challenge objectives.
        </p>
        <div className="flex items-center gap-2 mt-4">
          <Award size={16} />
          <span>First Place - UBC ENPH Robot Summer 2025</span>
        </div>
      </section>

      {/* Tech Stack */}
      <section className="project-section mb-12">
        <h2 className="text-3xl font-semibold mb-4">Tech Stack</h2>
        <div className="flex flex-wrap gap-2">
          {['C++', 'Rust', 'Onshape', '3D Printing', 'ESP32', 'WiFi'].map((tech) => (
            <span
              key={tech}
              className="px-3 py-1 bg-purple-800 rounded-full text-sm font-medium"
            >
              {tech}
            </span>
          ))}
        </div>
      </section>
    </div>
  );
};

export default UntitledSpacecraft;

