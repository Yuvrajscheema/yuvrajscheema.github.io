import ProjectLayout from '@/components/ProjectLayout';

/**
 * Project page: /ardupilot_crazyflie
 * See src/pages/untitled_spacecraft.tsx for the template documentation.
 */
function ArdupilotCrazyflie() {
  return (
    <ProjectLayout
      title="Ardupilot Crazyflie"
      description="A modification to the Crazyflie porting the Ardupilot flight stack, using a serial bridge between the flight controller and an ESP32 for more stable flight and access to a large ecosystem of open-source research packages."
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
          A full write-up of this project — the porting process, the ESP32 serial bridge,
          and flight results — is coming soon.
        </p>
      </section>
    </ProjectLayout>
  );
}

export default ArdupilotCrazyflie;
