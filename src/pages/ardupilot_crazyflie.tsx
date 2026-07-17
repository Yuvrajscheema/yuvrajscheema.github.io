import ProjectLayout from '@/components/ProjectLayout';

/**
 * Project page: /ardupilot_crazyflie
 * See src/pages/untitled_spacecraft.tsx for the template documentation.
 */
function ArdupilotCrazyflie() {
  return (
    <ProjectLayout
      title="ArduPilot Crazyflie"
      description="A port of the ArduPilot flight stack to the Crazyflie 2.1 nano-drone, using an ESP32 serial bridge for wireless MAVLink — bringing a stable, open-source flight stack and its research ecosystem to palm-sized hardware."
      image="/projects/cf2.webp"
      tech={['C', 'C++', 'Python', 'UART']}
      github="https://github.com/Yuvrajscheema/crazyflie-arducopter-setup"
      resource={{
        label: 'Setup Guide (PDF)',
        href: 'https://github.com/Yuvrajscheema/crazyflie-arducopter-setup/blob/main/guide_to_ardupilot_on_crazyflie.pdf',
      }}
      timeframe="2025"
    >
      <section>
        <h2>Overview</h2>
        <p>
          The Crazyflie 2.1 is a palm-sized quadrotor found in research labs everywhere,
          but its stock firmware keeps it walled off from the wider open-source autopilot
          ecosystem. During my co-op at the University of Ottawa, I ported ArduPilot to
          it — giving a widely used research platform access to a mature flight stack,
          its tooling, and its community of packages.
        </p>
      </section>

      <section>
        <h2>How It Works</h2>
        <ul>
          <li>
            The ArduPilot firmware was ported and customized in C++ to run on the
            Crazyflie&apos;s STM32 flight controller.
          </li>
          <li>
            An ESP32 acts as a serial bridge over UART, carrying MAVLink wirelessly
            between the drone and its ground station.
          </li>
          <li>
            The full setup process is documented in a step-by-step guide (linked above)
            so other researchers can reproduce it.
          </li>
        </ul>
      </section>
    </ProjectLayout>
  );
}

export default ArdupilotCrazyflie;
