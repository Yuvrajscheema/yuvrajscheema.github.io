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
          <em>robot summer</em>, where teams get six weeks to design, machine, and program a
          fully autonomous robot from scratch. The 2025 competition was a fire rescue game.
          Robots had to follow a black tape line through a door, up a ramp, and around two
          turns, drive over two inch high debris, and rescue seven pets from the building.
          The pets were hidden in various places, such as behind debris, tucked in a corner,
          and one inside a chute. After collecting them, the pets had to be carried out of
          the building and back to the safe zone.
        </p>
        <p>
          Our strategy was to score the first two pets while moving, then grab the next five
          while keeping four in the basket and one in the claw. This proved to be a working
          strategy; we could consistently get six pets and sometimes seven. For competition
          we settled on the consistent six, since the seventh meant driving over the debris,
          and <em>Untitled Spacecraft</em> won first place out of 15 teams.
        </p>
        <p>
          I built this robot with{' '}
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
          </a>
          . Taiga and Ari carried the mechanical design, and Ronny designed our PCBs and
          also worked on the software and firmware. I focused on the firmware and control
          systems.
        </p>
        <figure className="figure-narrow">
          <Image
            src="/projects/robot/map.webp"
            alt="3D render of the competition course showing the ramp, debris, and pet locations"
            width={512}
            height={348}
          />
          <figcaption>The game map: through the door, up the ramp, and over the debris.</figcaption>
        </figure>
      </section>

      <section>
        <h2>My Role</h2>
        <p>
          I led the embedded development for the team, writing the MCU firmware and the
          drivers behind the sensor interfaces and actuator control. A few of the pieces
          I&apos;m most proud of:
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
            Cubic spline inverse kinematics for the three axis arm, cutting trajectory
            calculations from roughly 2 µs down to 350 ns.
          </li>
        </ul>
      </section>

      <section>
        <h2>The Robot in 3D</h2>
        <p>
          This is the full CAD assembly of the robot: the chassis, arm, claw, and
          electronics mounts. Nothing downloads until you click, and the model is a 1 MB
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
          The mechanical design was a machined aluminum chassis with a PLA printed arm
          reinforced with carbon fiber rods. The arm had three axes: a stepper driving a
          lazy susan at the base, a motor with a potentiometer controlling the shoulder,
          and a servo controlling the elbow. The claw at the end was made of Delrin with
          TPU ridges to act like claws, and it was attached with a four bar linkage so it
          stayed level to the ground, which made grabbing pets much easier.
        </p>
        <p>
          The drivebase had two traction wheels at the back driven by motors with encoders
          and two omni wheels at the front to allow for better line following.
        </p>
      </section>

      <section>
        <h2>Electrical Design</h2>
        <p>
          The robot ran on two LiPo batteries, a 12V battery for the actuators and a 5V
          battery for the ESP32 and sensors. There were three custom PCBs: a main board
          with the ESP32, a few status LEDs, and switches to select programs, and two
          boards each carrying two H-bridges. The H-bridges were opto-isolated from the
          ESP32 to prevent motor transients from browning out the chip.
        </p>
        <figure className="figure-narrow">
          <Image
            src="/projects/robot/pd.webp"
            alt="Power distribution diagram: two LiPo batteries feeding the ESP32 and sensors on one side and the H-bridges, stepper driver, and servos on the other, joined only through optocouplers"
            width={512}
            height={246}
          />
          <figcaption>How power was distributed across the robot.</figcaption>
        </figure>
        <p>
          Most teams used pre-built digital line following modules, but we made our own
          analog sensors. Reading continuous analog values instead of on/off thresholds is
          what made the smoother line following control described below possible.
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
          <figcaption>The physical boards.</figcaption>
        </figure>
      </section>

      <section>
        <h2>Firmware</h2>
        <p>
          The firmware ran FreeRTOS tasks on the ESP32 through PlatformIO, but very early
          on we hit an issue. We wanted to run the ADCs in continuous mode with DMA for
          much faster sampling than the standard polled approach, which needed ESP-IDF 5,
          and PlatformIO only shipped ESP-IDF 3. We were on PlatformIO in the first place
          because six weeks is not much time and we wanted Arduino libraries for faster
          iteration. The solution was{' '}
          <a
            href="https://github.com/pioarduino/platform-espressif32"
            target="_blank"
            rel="noopener noreferrer"
          >
            PIOArduino
          </a>
          , which gave us ESP-IDF 5 along with all the libraries we wanted. The ADCs ran
          on their own core and shared readings with the control loops through atomic u16s.
        </p>
        <p>
          The drive motors were speed controlled, with a PID loop turning a desired speed
          into motor power. The point of this was flexibility, and it let us leave the tape
          when a rescue needed it. The stepper motor used an ESP-IDF 5 alarm that re-arms
          itself inside its own interrupt, which gave the arm smooth motion. A LiDAR
          rangefinder for pet detection communicated over I2C, and since we were running
          low on pins, a shift register handled on/off signals like motor direction bits.
        </p>
        <p>
          For tuning, our professor recommended potentiometers. I thought this was insane;
          it lacked the precision and data collection I wanted. So on the ferry I wrote{' '}
          <a
            href="https://github.com/Yuvrajscheema/wifiTuning"
            target="_blank"
            rel="noopener noreferrer"
          >
            WIFITuner
          </a>
          , a tool that tunes PID values wirelessly and plots target vs actual values in
          real time so you can watch the robot&apos;s behaviour as you tune. I open sourced
          it to the class because I did not enjoy watching people tune with potentiometers,
          and a week later almost every team was using it.
        </p>
      </section>

      <section>
        <h2>Control Systems</h2>
        <p>
          The line following used the analog values from two IR sensors placed exactly
          half a tape width apart. The more a sensor sat on the tape the lower its
          reading, and sweeping across the tape the two readings look like two overlapping
          U shapes. That split the problem into two zones. In zone 1 the error fed into
          the PID was simply the difference between the two readings. In zone 2, where one
          sensor had left the tape, the controller took the error from the zone boundary
          and added double the change in the still varying reading to keep the error
          roughly linear. Before that doubling the line following was significantly worse.
          If the robot went off the line entirely, it grew the error using odometry from
          the wheels until the sensor readings were decipherable again.
        </p>
        <figure>
          <Image
            src="/projects/robot/ir-zones.webp"
            alt="Plot of the two IR sensor readings while crossing the tape: two overlapping U-shaped dips, annotated with zone 1 between the minima and zone 2 outside them"
            width={1400}
            height={756}
          />
          <figcaption>
            The two sensor readings while crossing the tape: zone 1 between the dips,
            zone 2 outside them.
          </figcaption>
        </figure>
        <p>
          The arm used inverse kinematics to move to positions in space, with trajectory
          planning so it moved in smooth, continuous curves rather than straight lines,
          which made every rescue noticeably quicker. The trig inside the IK ran on cubic
          spline approximations to keep the calculations fast. Pet detection watched the
          LiDAR for readings that briefly shot up and came back down, found the middle of
          that spike, and drove the claw to that bearing and distance. It grabbed the pet
          almost every single time.
        </p>
      </section>

      <section>
        <h2>War Stories</h2>
        <p>
          <strong>Spin the wheel to boot.</strong> After we finished the drivebase, the
          robot sometimes refused to boot. We spent a very long time debugging it, and out
          of frustration I pushed the robot and it started working again. It turned out a
          pin the ESP32 needs pulled low at boot was tied to a wheel encoder. This led to
          our official pre-run procedure: spin the wheel until the LED lights up.
        </p>
        <p>
          <strong>The 1:58 AM run.</strong> The night before time trials we were chasing
          our first full scoring run, and the lab closed at 2:00 AM. At 1:35 the claw
          servos died; the small servos we were using were prone to failure. Taiga and Ari
          put the claw back together, and two attempts later we completed our first
          successful run at 1:58 AM.
        </p>
        <p>
          <strong>The ghost.</strong> A couple of days before competition the robot
          started crashing at seemingly random moments. Driving, moving the arm, closing
          the claw, it made no difference. By competition day we were losing hope, so we
          ran the robot until it crashed, over and over, and collected the stack traces.
          After staring at them long enough I noticed a pattern: they almost always led to
          a PWM call on specific pins. The ESP32 datasheet confirmed those pins were tied
          directly to flash memory, so the robot was corrupting its own memory in real
          time. Since it was the day of competition, the fix was to cut the traces and
          rewire the board by hand. After the rework the ghost was gone, the robot ran
          consistently, and we won. Building a complete system under pressure and
          debugging it down to the hardware level is exactly the work I want to keep
          doing.
        </p>
      </section>
    </ProjectLayout>
  );
}

export default UntitledSpacecraft;
