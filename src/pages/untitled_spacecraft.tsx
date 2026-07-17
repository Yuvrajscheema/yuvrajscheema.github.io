import ProjectLayout from '@/components/ProjectLayout';

/**
 * Project page: /untitled_spacecraft
 *
 * This file is the canonical template for project pages. To add a new project
 * page, copy this file to src/pages/<slug>.tsx, update the ProjectLayout props,
 * and write the content sections. Then point the matching entry in
 * `projectsData` (src/sections/Projects.tsx) at `pagePath: '/<slug>'` and add
 * the URL to public/sitemap.xml.
 */
function UntitledSpacecraft() {
  return (
    <ProjectLayout
      title="Untitled Spacecraft"
      description="An autonomous fire-rescue robot designed and built from scratch in six weeks for UBC Engineering Physics' annual robot competition, where it took first place against 15 teams."
      image="/projects/robot.webp"
      tech={['KiCad', 'C++', 'Rust', 'Onshape', '3D printing']}
      github="https://github.com/enphx/firmware"
      timeframe="2025"
      accolades="First place in the annual UBC ENPH robot summer competition"
    >
      <section>
        <h2>Overview</h2>
        <p>
          Every summer, UBC Engineering Physics runs ENPH 253, better known as{' '}
          <em>robot summer</em>: teams get six weeks to design, machine, and program a fully
          autonomous robot from scratch. The 2025 challenge was fire rescue, navigating a
          hazard-filled course to find the victims and carry them to safety faster than any
          other team. Our robot, <em>Untitled Spacecraft</em>, won first place out of 15 teams.
        </p>
      </section>

      <section>
        <h2>My Role</h2>
        <p>
          I led embedded development for the team, writing the MCU firmware and the drivers
          behind the sensor interfaces and actuator control. A few of the pieces I'm most
          proud of:
        </p>
        <ul>
          <li>
            PID control for the stepper motors and actuators, integrated with LiDAR and
            IR-based navigation.
          </li>
          <li>
            Analog IR sampling over DMA at 2 MHz, feeding a real-time convolution that
            let the robot lock onto the course&apos;s IR beacons.
          </li>
          <li>
            Cubic-spline inverse kinematics for the 3-axis arm, cutting trajectory
            calculations from roughly 2 µs down to 350 ns.
          </li>
        </ul>
      </section>
    </ProjectLayout>
  );
}

export default UntitledSpacecraft;
