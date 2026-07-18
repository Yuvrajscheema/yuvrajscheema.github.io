import Image from 'next/image';

import CadViewer from '@/components/CadViewer';
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
      tech={['ESP32', 'FreeRTOS', 'C++', 'Rust', 'KiCad', 'Onshape', '3D printing']}
      github="https://github.com/enphx/firmware"
      resource={{ label: 'WIFITuner', href: 'https://github.com/Yuvrajscheema/wifiTuning' }}
      timeframe="2025"
      accolades="First place in the annual UBC ENPH robot summer competition"
    >
      <section>
        <h2>Overview</h2>
        <p>
          Every summer, UBC Engineering Physics runs ENPH 253, better known as{' '}
          <em>robot summer</em>: teams get six weeks to design, machine, and program a fully
          autonomous robot from scratch. The 2025 challenge was fire rescue: follow a black
          tape line through a door, up a ramp, and around two turns, drive over two-inch
          debris, and rescue seven pets scattered through the building — behind debris,
          tucked into corners, one inside a chute — then carry them back to the safe zone.
        </p>
        <p>
          Our strategy was to score the first two pets without stopping, then collect the
          next four in a basket while the claw held a fifth. That made six pets a
          consistent run, with seven possible on a good day (the seventh meant driving
          over the debris). We settled on the reliable six for competition, and{' '}
          <em>Untitled Spacecraft</em> won first place out of 15 teams.
        </p>
        <p>
          I built it with{' '}
          <a href="https://248nonny.github.io/about/" target="_blank" rel="noopener noreferrer">
            Ronny
          </a>
          ,{' '}
          <a href="https://ca.linkedin.com/in/taiga-momose" target="_blank" rel="noopener noreferrer">
            Taiga
          </a>
          , and{' '}
          <a
            href="https://ca.linkedin.com/in/ari-mesrob-cholakian"
            target="_blank"
            rel="noopener noreferrer"
          >
            Ari
          </a>{' '}
          — Taiga and Ari carried the mechanical design and Ronny designed our PCBs, while
          I focused on the firmware and control systems.
        </p>
        <figure className="figure-narrow">
          <Image
            src="/projects/robot/map.webp"
            alt="3D render of the competition course showing the ramp, debris, and pet locations"
            width={512}
            height={348}
          />
          <figcaption>The course: through the door, up the ramp, over the debris.</figcaption>
        </figure>
      </section>

      <section>
        <h2>My Role</h2>
        <p>
          I led embedded development for the team, writing the MCU firmware and the drivers
          behind the sensor interfaces and actuator control. A few of the pieces I&apos;m most
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

      <section>
        <h2>The Robot in 3D</h2>
        <p>
          This is the full CAD assembly of the robot — chassis, arm, claw, and electronics
          mounts. Nothing downloads until you click, and the model itself is a 1 MB
          compressed version of the original 35 MB CAD file.
        </p>
        <CadViewer
          src="/models/robot.glb"
          alt="Interactive 3D CAD model of the Untitled Spacecraft fire-rescue robot"
          downloadSize="~1 MB"
          orientation="0deg -90deg 0deg"
        />
      </section>

      <section>
        <h2>Mechanical Design</h2>
        <p>
          The robot was built on a machined aluminum chassis with a 3D-printed PLA arm
          reinforced with carbon-fiber rods. The arm had three axes: a stepper motor
          driving a lazy susan at the base, a DC motor with a potentiometer on the
          shoulder, and a servo at the elbow. At the end sat a Delrin claw with TPU ridges
          for grip, mounted on a four-bar linkage so it stayed level with the ground no
          matter where the arm moved — which made grabbing pets far more forgiving.
        </p>
        <p>
          The drivebase used two rear traction wheels driven by motors with encoders and
          two front omni wheels, letting the robot pivot cleanly while following the line.
        </p>
      </section>

      <section>
        <h2>Electrical Design</h2>
        <p>
          Power came from two LiPo batteries: one for the actuators and a separate one for
          the ESP32 and sensors, with the H-bridges opto-isolated from the ESP32 so motor
          transients could never brown out the chip. Everything ran on three custom PCBs —
          a main board carrying the ESP32 with its status LEDs and program-select switches,
          and two boards each carrying two H-bridges.
        </p>
        <figure className="figure-narrow">
          <Image
            src="/projects/robot/pd.webp"
            alt="Power distribution diagram: two LiPo batteries feeding the ESP32 and sensors on one side and the H-bridges, stepper driver, and servos on the other, joined only through optocouplers"
            width={512}
            height={246}
          />
          <figcaption>Power distribution — logic and actuators meet only through optocouplers.</figcaption>
        </figure>
        <p>
          Where most teams bought pre-built digital line-following modules, we designed our
          own analog IR sensors. Continuous analog readings instead of on/off thresholds is
          what made the smooth line-following control described below possible.
        </p>
        <div className="figure-grid">
          <figure>
            <Image
              src="/projects/robot/breakout-layout.webp"
              alt="KiCad layout of the ESP32 breakout board"
              width={1100}
              height={881}
            />
            <figcaption>ESP32 breakout board layout.</figcaption>
          </figure>
          <figure>
            <Image
              src="/projects/robot/hbridge-layout.webp"
              alt="KiCad layout of the dual H-bridge board"
              width={1400}
              height={525}
            />
            <figcaption>Dual H-bridge board layout.</figcaption>
          </figure>
        </div>
        <figure>
          <Image
            src="/projects/robot/pcbs.webp"
            alt="The fabricated purple PCBs: ESP32 breakout board with a brain silkscreen, the H-bridge boards, and a board with a bridge silkscreen"
            width={1400}
            height={457}
          />
          <figcaption>The boards as fabricated.</figcaption>
        </figure>
      </section>

      <section>
        <h2>Firmware</h2>
        <p>
          The firmware ran FreeRTOS tasks on the ESP32 through PlatformIO. Early on we hit
          a wall: we wanted the ADCs in continuous mode with DMA for far faster sampling
          than the standard polled approach, which needed ESP-IDF 5 — but PlatformIO only
          shipped ESP-IDF 3.{' '}
          <a
            href="https://github.com/pioarduino/platform-espressif32"
            target="_blank"
            rel="noopener noreferrer"
          >
            PIOArduino
          </a>{' '}
          solved it, giving us ESP-IDF 5 with the Arduino libraries we needed for fast
          iteration on a six-week timeline. The ADCs ran on their own core and shared
          readings with the control loops through atomic u16s.
        </p>
        <p>
          The drive motors were speed-controlled — a PID loop turned a target speed into
          motor power — which gave us the flexibility to leave the tape when a pet demanded
          it. The stepper used an ESP-IDF 5 alarm that re-arms itself inside its own
          interrupt, giving the arm smooth motion. A LiDAR rangefinder for pet detection
          talked over I2C, and with pins running out, a shift register took over the on/off
          signals like motor direction bits.
        </p>
        <p>
          For tuning, our professor recommended potentiometers. I thought that was insane —
          no precision, no data — so on the ferry I wrote{' '}
          <a
            href="https://github.com/Yuvrajscheema/wifiTuning"
            target="_blank"
            rel="noopener noreferrer"
          >
            WIFITuner
          </a>
          , a tool that tunes PID values wirelessly and plots target vs. actual in real
          time so you can watch the robot&apos;s behavior as you tune. I open-sourced it to the
          class, and within a week almost every team was using it.
        </p>
      </section>

      <section>
        <h2>Control Systems</h2>
        <p>
          The line follower read the two analog IR sensors, placed exactly half a tape
          width apart. Sweeping across the tape, the readings trace two overlapping U
          shapes — which splits the problem into two zones. In zone 1, the error fed to
          the PID is simply the difference between the two sensors. In zone 2, where one
          sensor has left the tape, the controller holds the error from the zone boundary
          and adds double the change in the still-varying reading, keeping the error
          roughly linear. That doubling made a dramatic difference in tracking. If the
          robot left the line entirely, it grew the error from wheel odometry until the
          sensors found something decipherable again.
        </p>
        <figure>
          <Image
            src="/projects/robot/ir-zones.webp"
            alt="Plot of the two IR sensor readings while crossing the tape: two overlapping U-shaped dips, annotated with zone 1 between the minima and zone 2 outside them"
            width={1400}
            height={756}
          />
          <figcaption>
            The two sensor readings crossing the tape — zone 1 between the dips, zone 2
            outside them.
          </figcaption>
        </figure>
        <p>
          The arm used inverse kinematics to reach positions in space, with trajectory
          planning so it moved through smooth continuous curves instead of straight lines,
          which made every rescue noticeably quicker. The trig inside the IK ran on cubic-spline
          approximations to keep it fast. Pet detection watched the LiDAR for readings
          that briefly spiked and settled, found the middle of the spike, and drove the
          claw to that bearing and distance. It grabbed the pet almost every single time.
        </p>
      </section>

      <section>
        <h2>War Stories</h2>
        <p>
          <strong>Spin the wheel to boot.</strong> After finishing the drivebase, the robot
          sometimes refused to boot. After a long stretch of debugging I shoved the robot in
          frustration — and it came to life. It turned out a pin the ESP32 needs pulled low
          at boot was tied to a wheel encoder. Hence the official pre-run procedure: spin
          the wheel until the LED lights.
        </p>
        <p>
          <strong>The 1:58 AM run.</strong> The night before time trials we were chasing
          our first full scoring run, with the lab closing at 2:00 AM. At 1:35 the claw
          servos died — the small ones were prone to failure. Taiga and Ari rebuilt the
          claw, and two attempts later we completed our first successful run at 1:58 AM.
        </p>
        <p>
          <strong>The ghost.</strong> A couple of days before competition the robot started
          crashing at random — driving, moving the arm, closing the claw, it made no
          difference. By competition day we were losing hope, so we ran it until it crashed,
          over and over, collecting stack traces. Staring at them long enough revealed a
          pattern: they almost always ended in a PWM call on specific pins. The ESP32
          datasheet confirmed it — those pins are tied to flash memory, and the robot was
          corrupting its own memory in real time. The fix, on the day of competition, was to
          cut the traces and rewire the board by hand. The ghost left, the robot ran
          consistently, and we won. Building a complete system under pressure and debugging
          it down to the hardware level is exactly the work I want to keep doing.
        </p>
      </section>
    </ProjectLayout>
  );
}

export default UntitledSpacecraft;
