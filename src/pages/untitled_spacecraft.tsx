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
      description="A robot built from scratch over the span of six weeks to compete in the UBC ENPH robot summer, a competition between 15 Engineering Physics student teams."
      image="/projects/robot.webp"
      tech={['KiCad', 'C++', 'Rust', 'Onshape', '3D printing']}
      github="https://github.com/enphx/firmware"
      timeframe="2025"
      accolades="First place in the annual UBC ENPH robot summer competition"
    >
      <section>
        <h2>Overview</h2>
        <p>
          A full write-up of this project — the design process, firmware architecture,
          control systems, and competition results — is coming soon.
        </p>
      </section>
    </ProjectLayout>
  );
}

export default UntitledSpacecraft;
