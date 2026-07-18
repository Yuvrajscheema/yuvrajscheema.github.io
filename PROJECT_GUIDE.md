# Portfolio Website — Project Guide

A portfolio site for Yuvraj Cheema, built with **Next.js 14 (Pages Router)** and deployed as a **fully static export** to **GitHub Pages** at [yuvrajscheema.github.io](https://yuvrajscheema.github.io).

**This guide is the primary documentation for anyone (human or AI agent) working on this codebase. Read the Hard Rules (§2) before changing anything.** For common changes, jump straight to the Recipes (§7) — each one is a self-contained, copy-paste set of steps. Last major revision: July 2026.

---

## 1. What this project is, in plain words

- It is a **one-page personal website** (plus a few project write-up pages) that shows who Yuvraj is, where he has worked, and what he has built.
- There is **no database, no CMS, no server**. All text and data live directly in the source files as strings and arrays. Changing content means editing a file and re-deploying.
- `npm run build` turns the source into plain HTML/CSS/JS files in the `out/` folder. GitHub Pages simply serves those files. That is the entire production system.

## 2. Hard Rules (violating these breaks the site in non-obvious ways)

1. **This is a static export. There is no server.** Never add to `next.config.js` or the code: `headers()`, `redirects()`, `rewrites()`, API routes (`src/pages/api/`), middleware, `getServerSideProps`, or Next.js image optimization. They silently do nothing (or break the build) under `output: 'export'`.
2. **Tailwind is NOT installed.** Class strings like `text-lg hover:scale-105 bg-gray-900` do nothing here — they are inert text. All styling is SCSS partials in `src/scss/` using the CSS variables from `globals.css`. (This bit the project once already: cards shipped with dozens of Tailwind classes that never rendered.)
3. **Images are served exactly as committed.** Nothing compresses them for you. Before adding any image to `public/`, compress it to **under 200 KB** (see Recipe 7.7).
4. **Branch layout:** the source code lives on `master`. `npm run deploy` force-pushes the *built output* to the `main` branch, which GitHub Pages serves. **Never merge `main` into `master`, never edit files on `main`.** `main` is a build artifact.
5. **Never gate the whole app on client-side state.** No `if (!mounted) return null` in `_app.tsx`, no "show content after a timer". During the build there is no browser, so such guards export **empty HTML** — the deployed site becomes a blank page for search engines and slow connections. This exact bug shipped once.
6. **Secrets cannot be hidden.** Any `NEXT_PUBLIC_*` env var or API key ends up readable in the public JS bundle. Do not add API keys to this project.
7. **When you add a page, update `public/sitemap.xml` and this guide.**

## 3. Commands

| Command | What it does |
|---|---|
| `npm install` | Install dependencies (needed once, and after dependency changes) |
| `npm run dev` | Dev server at http://localhost:3000 with hot reload — use while editing |
| `npm run build` | Static export to `out/` (also type-checks and lints; this is the "does it work" gate) |
| `npm run deploy` | Runs build, then force-pushes `out/` to the `main` branch → site goes live |
| `npm run lint` | ESLint only |
| `python3 -m http.server 8080 -d out` | Preview the built site exactly as GitHub Pages serves it |

There is no test suite. §8 explains how to verify changes.

## 4. Codebase map

Every file you might touch, with what it is for:

```
next.config.js                  Build config (static export, trailingSlash). Rarely touched — see Hard Rule 1.
package.json                    Scripts + dependencies.
public/                         Files copied to the site root verbatim.
  favicon.svg                   Browser tab icon.
  manifest.json                 PWA metadata (name, colors). Plain JSON — no trailing commas!
  robots.txt / sitemap.xml      SEO. Add new pages to sitemap.xml.
  etc/profilePicture.webp       About-section portrait (37 KB).
  projects/*.webp               Featured-project card images (< 200 KB each).
  projects/robot/*.webp         Figures for the Untitled Spacecraft write-up (< 200 KB each).
  models/*.glb                  Draco-compressed 3D models for the CAD viewer (Recipe 7.8).
  draco/                        Self-hosted Draco decoder used by the CAD viewer. Copied from
                                node_modules/three/examples/jsm/libs/draco/gltf/ — re-copy only
                                if the three.js version (via @google/model-viewer) changes.
src/pages/                      One file = one page (Next.js Pages Router).
  _app.tsx                      Wraps every page: global styles, fonts, desktop-only animated cursor.
  _document.tsx                 HTML shell: <html lang>, theme-color meta, manifest link.
  index.tsx                     THE landing page. Assembles all sections; holds SEO meta + JSON-LD.
  untitled_spacecraft.tsx       Project write-up page — CANONICAL TEMPLATE for new project pages.
  ardupilot_crazyflie.tsx       Project write-up page.
src/sections/                   The landing page's building blocks, top to bottom:
  Navbar.tsx                    Fixed nav. sectionLinks array + Resume button URL live here.
  Hero.tsx                      "Hello, I'm Yuvraj" headline, intro blurb, floating background keywords.
  About.tsx                     aboutText paragraph + portrait photo.
  Experience.tsx                experiences array → tabbed work-history cards.
  Projects.tsx                  projectsData array → big featured-project cards.
  OtherProjects.tsx             Renders the small card grid (data comes from src/utils/OtherProjectsProp.js).
  Footer.tsx                    "View on GitHub" link.
src/components/                 Reusable pieces:
  Button.tsx                    Standard link-button (variants: primary/secondary/outline/ghost).
  Button3D.tsx                  Fancier button used on featured project cards.
  ProjectLayout.tsx             Shared layout for project write-up pages (header, image, typography).
  CadViewer.tsx                 Click-to-load interactive 3D model viewer (Recipe 7.8).
  Email.tsx / SocialIcons.tsx   Fixed side widgets (email address, GitHub/LinkedIn icons).
  FloatingButton.tsx            Scroll-to-top arrow.
src/utils/
  OtherProjectsProp.js          Data array for the small project grid.
src/types/
  model-viewer.d.ts             JSX typing for the <model-viewer> element used by CadViewer.
src/scss/                       ALL styling. One partial per section/component.
  globals.css                   THEME: every color as a CSS variable (§6). Global element styles.
  _variables.scss               Font-size variables (--tsm ... --tgiant).
  index.scss                    Imports everything below via the two _index.scss barrel files.
  components/_*.scss            One file per component (e.g. _button.scss styles Button.tsx).
  sections/_*.scss              One file per section (e.g. _hero.scss styles Hero.tsx).
PROJECT_GUIDE.md                This file. Keep it current.
```

**Naming convention that makes styles findable:** the SCSS partial for `src/sections/Hero.tsx` is `src/scss/sections/_hero.scss`, for `Button.tsx` it is `src/scss/components/_button.scss`, and so on. A className in a TSX file is defined in its matching partial.

## 5. How the site works

### 5.1 Rendering (the mental model)

1. At **build time**, Next.js runs every page component once and writes the resulting HTML into `out/` — `out/index.html`, `out/untitled_spacecraft/index.html`, etc. (`trailingSlash: true` makes each page a folder with an `index.html`, which is what GitHub Pages expects for `/slug/` URLs).
2. In the **browser**, that HTML shows instantly; then React "hydrates" it and the Framer Motion animations play.
3. `Navbar` and `Hero` are bundled with the page (visible immediately); the sections below the fold (`About`, `Experience`, `Projects`, …) are `next/dynamic` imports, so they arrive as separate JS chunks. **They are still pre-rendered into the HTML** — dynamic import only splits the JS.

### 5.2 Navigation

The landing page's nav uses hash anchors: `/#about`, `/#experience`, `/#work` — these scroll to the section with the matching `id=` attribute. Project pages are real separate pages linked with `next/link`.

### 5.3 Animations (the patterns used everywhere)

- **Reveal on scroll:** `<motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={...}>` — copy this from any existing section.
- **Reveal on mount:** `initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}`.
- **Scroll-linked movement** (Hero parallax): `useScroll()` + `useTransform()` motion values. Never `useState` + a scroll event listener — that re-renders React on every scrolled pixel.
- Randomized values used during render (e.g. keyword positions in `Hero.tsx`) must be wrapped in `useMemo` so they don't re-roll on every render.

### 5.4 Deployment pipeline

```
npm run deploy
  └─ predeploy → npm run build
       └─ next build              # static export to out/
       └─ touch out/.nojekyll     # stops GitHub Pages running Jekyll
  └─ gh-pages -d out --dotfiles -b main    # force-pushes out/ to the `main` branch
```

GitHub Pages serves the `main` branch. Deploys go live within a minute or two. Committing to `master` does **not** change the live site — only `npm run deploy` does.

## 6. Theme reference — Everforest (hard/dark variant)

All colors are CSS custom properties in `src/scss/globals.css`, mapped from the [Everforest palette](https://github.com/sainnhe/everforest/blob/master/palette.md). The **hard** background variant was **deliberately chosen** for a darker feel close to the site's original `#121212` — do not "correct" backgrounds to Everforest's medium values.

| CSS variable | Everforest (hard) | Hex | Role |
|---|---|---|---|
| `--background-color` | bg_dim | `#1e2326` | Page background |
| `--navy` | bg0 | `#272e33` | Elevated dark surfaces (project card inner, badges) |
| `--surface-color` | bg1 | `#2e383c` | Raised surfaces |
| `--light-navy` | bg1 | `#2e383c` | Card backgrounds |
| `--surface-color-light` | bg2 | `#374145` | Lighter surfaces |
| `--lightest-navy` | bg3 | `#414b50` | Borders, divider lines |
| `--dark-slate` | bg4 | `#495156` | Scrollbar thumb |
| `--slate` / `--light-slate` | grey1 / grey2 | `#859289` / `#9da9a0` | Secondary text |
| `--lightest-slate` | fg | `#d3c6aa` | Primary text |
| `--theme-color` | green | `#a7c080` | **Primary accent** |
| `--theme-color-secondary` | aqua | `#83c092` | Secondary accent |
| `--theme-color-error` | red | `#e67e80` | Error/red accent |

Rules of thumb:

- **In SCSS, always write `var(--theme-color)` etc., never raw hex.** The only sanctioned raw hexes are the per-tab accents in `Experience.tsx` — keep those within the Everforest palette (green `#a7c080`, aqua `#83c092`, red `#e67e80`, purple `#d699b6`, yellow `#dbbc7f`, orange `#e69875`, blue `#7fbbb3`).
- Translucent accents: green `rgba(167, 192, 128, α)`, aqua `rgba(131, 192, 146, α)`.
- **To change the whole site's palette:** edit the variable values in `globals.css`, then grep `src/` for any raw hex (`grep -rniE '#[0-9a-f]{6}' src/ --include='*.tsx'`) and update stragglers (`Experience.tsx` colors, `_app.tsx` cursor `color="167, 192, 128"` RGB, `_document.tsx` theme-color meta, `public/manifest.json`).

## 7. Recipes — exact steps for common changes

> After any recipe: run the verification checklist in §8.

### 7.1 Change simple text

| To change... | Edit... |
|---|---|
| Hero headline / intro sentence | `src/sections/Hero.tsx` — the JSX near the bottom (`Hello, I'm`, `Yuvraj Cheema.`, the `hero-text` paragraph) |
| Floating background words in Hero | `keywords` array at the top of `src/sections/Hero.tsx` |
| About paragraph | `aboutText` string at the top of `src/sections/About.tsx` |
| Email address | `src/components/Email.tsx` (shown on screen) — appears once as `href="mailto:..."` and once as text |
| GitHub / LinkedIn links | `socialLinks` array in `src/components/SocialIcons.tsx` |
| Resume link | `link=` prop of the Resume `Button` in `src/sections/Navbar.tsx` |
| Browser-tab title / SEO description | `<Head>` block in `src/pages/index.tsx` |

### 7.2 Add or edit a featured project card (the big cards)

Open `src/sections/Projects.tsx` and add an object to the `projectsData` array:

```ts
{
  image: '/projects/my-project.webp',   // file must exist in public/projects/, < 200 KB (Recipe 7.7)
  projectName: 'My Project',
  projectDescription: 'One or two sentences describing what it is and why it matters.',
  projectTech: ['Rust', 'KiCad', 'C++'],
  pagePath: '/my_project',              // internal write-up page — create it with Recipe 7.3
  github: 'https://github.com/you/repo',
  featured: true,                       // true = shows the "Top Project" star badge
  timeframe: '2026',
  accolades: 'Optional award/result line',   // omit the key entirely if there is none
},
```

Notes:
- The card image, the project title, and the "View Project" button all link to `pagePath`. The GitHub button links to `github`.
- Cards automatically alternate image-left / image-right based on their position in the array.
- The order of the array is the order on the page.

### 7.3 Add a project write-up page (e.g. yuvrajscheema.github.io/my_project/)

1. **Copy the template:** duplicate `src/pages/untitled_spacecraft.tsx` to `src/pages/my_project.tsx`. The filename becomes the URL (`my_project.tsx` → `/my_project/`). Use lowercase and underscores.
2. **Edit the props** passed to `<ProjectLayout>`:
   - `title` — project name (also becomes the browser-tab title)
   - `description` — 1–2 sentences (also the SEO meta description)
   - `image` — hero image path under `public/`
   - `tech` — array of technology names
   - `github` — repo URL (optional)
   - `resource` — optional extra link, e.g. `{ label: 'Demo video', href: 'https://...' }`
   - `timeframe`, `accolades` — optional
3. **Write the content** as children — plain `<section>` blocks with `<h2>`, `<p>`, `<ul>`, `<code>`; they are styled automatically by `_project-page.scss`:
   ```tsx
   <section>
     <h2>The Goal</h2>
     <p>...</p>
   </section>
   <section>
     <h2>How it works</h2>
     <p>...</p>
   </section>
   ```
4. **Link it:** set `pagePath: '/my_project'` on the matching card in `projectsData` (Recipe 7.2).
5. **Sitemap:** add a `<url>` block for `https://yuvrajscheema.github.io/my_project/` to `public/sitemap.xml` (copy an existing block, update `<loc>` and `<lastmod>`).

### 7.4 Add a small project card (the grid of six)

Add an entry to the array in `src/utils/OtherProjectsProp.js`:

```js
{
  id: 7,                                   // any unique number
  name: 'Project Name',
  description: 'Short description.',
  language: ['Rust', 'Python'],            // first 3 shown; extras collapse to "+N more"
  html_url: 'https://github.com/you/repo', // the GitHub icon link
  homepage: 'https://docs-or-demo-url',    // the external-link icon; set to null to hide it
},
```

⚠️ Only the **first 6** entries render — `repositories.slice(0, 6)` in `src/sections/OtherProjects.tsx`. Reorder the array to choose which six, or change the slice.

### 7.5 Add a work experience entry

Add to the `experiences` array in `src/sections/Experience.tsx`:

```ts
{
  name: 'Company Name',            // the tab label
  role: 'Your Title',
  url: 'https://company.com',
  start: 'January 2026',
  end: 'Present',
  color: '#a7c080',                // pick an Everforest accent (see §6)
  icon: 'C',                       // one letter, shown in the colored badge
  shortDescription: [
    'Achievement bullet one.',
    'Achievement bullet two.',
  ],
},
```

Put the most recent role **first** — index 0 is the tab selected on load.

### 7.6 Add a whole new landing-page section

1. Create `src/sections/MySection.tsx`. Copy the skeleton of `Experience.tsx`: a `motion.div` with a unique `id="my-section"`, a `<div className="title"><h2>Heading</h2></div>`, and `whileInView` reveal animation.
2. Create `src/scss/sections/_my-section.scss` for its styles, and register it by adding `@import './my-section';` to `src/scss/sections/_index.scss`. (Styles will silently not load if you skip the import.)
3. In `src/pages/index.tsx`, add a dynamic import next to the others and place `<MySection />` inside `<main>` where it should appear.
4. Add `{ name: 'My Section', link: '/#my-section' }` to `sectionLinks` in `src/sections/Navbar.tsx`. The `link` hash must equal the section's `id`.

### 7.7 Add or replace an image

1. Convert/compress to WebP, longest side ≤ 1200 px, quality ~80, **target < 200 KB**:
   ```bash
   cwebp -q 80 -resize 1200 0 input.png -o public/projects/my-project.webp
   # if the source is already .webp, decode first:
   dwebp old.webp -o /tmp/tmp.png && cwebp -q 80 -resize 1200 0 /tmp/tmp.png -o public/projects/my-project.webp
   ```
2. Check the size: `ls -la public/projects/` — if any image is over ~200 KB, compress harder (lower `-q` or smaller `-resize`).
3. Reference it by absolute path from the site root: `/projects/my-project.webp` (never `../public/...`).

### 7.8 Add an interactive 3D CAD model to a page

The Untitled Spacecraft page shows a spinnable CAD model via `src/components/CadViewer.tsx`. The viewer is **click-to-load**: the page ships zero extra JS until the visitor presses "Load interactive 3D model", which dynamically imports `@google/model-viewer` (its own chunk) and streams the model. To add one to another page:

1. **Convert the CAD file (STEP) to GLB** — one-off, the source CAD file is *not* committed:
   ```bash
   pip install cascadio
   python3 -c "import cascadio; cascadio.step_to_glb('robot.step', 'raw.glb', tol_linear=0.25, tol_angular=0.5)"
   ```
2. **Compress with Draco** (35 MB STEP → 8 MB GLB → ~1 MB in the robot's case):
   ```bash
   npx @gltf-transform/cli optimize raw.glb public/models/my-model.glb --compress draco --join false --flatten false
   ```
   Keep `--join false`: CAD assemblies reuse geometry (screws etc.) via GPU instancing, and joining *inflates* the file.
3. **Use it in a page:**
   ```tsx
   <CadViewer
     src="/models/my-model.glb"
     alt="What the model shows"
     downloadSize="~1 MB"
     orientation="0deg -90deg 0deg"   // CAD exports are usually Z-up; glTF is Y-up.
   />                                  // Remove if the model already sits upright.
   ```
4. **Decoder:** `public/draco/` is the self-hosted Draco decoder CadViewer points model-viewer at — already in place, nothing to do.

⚠️ Never import `@google/model-viewer` at the top of a module — it must stay inside CadViewer's click handler or it lands in the page bundle.

### 7.9 Change a theme color

- One accent everywhere: change the variable's value in `src/scss/globals.css` (§6 table tells you which variable does what).
- Whole palette: follow the "To change the whole site's palette" steps at the end of §6.

### 7.10 Add figures (images with captions) to a project page

Inside a `<section>` of a project page, use a `<figure>` — styles come from `_project-page.scss`:

```tsx
<figure>                {/* full-width image */}
<figure className="figure-narrow">   {/* small diagram shown at natural size, centered */}
  <Image src="/projects/robot/pd.webp" alt="..." width={512} height={246} />
  <figcaption>Caption in mono, centered.</figcaption>
</figure>
```

Two figures side-by-side on desktop: wrap them in `<div className="figure-grid">`. Diagrams exported with a transparent background (e.g. Excalidraw dark mode) look best — they sit directly on the page background.

## 8. Verifying changes (do this before committing)

```bash
npm run build                        # must finish with "✓ Generating static pages" and no errors
grep -c "Yuvraj" out/index.html      # must print a number > 0 (guards Hard Rule 5 — empty export)
python3 -m http.server 8080 -d out   # then open http://localhost:8080 and click through
```

Manual checks while clicking through:
- Homepage renders with content immediately (no long blank screen).
- Each featured project's "View Project" opens its `/slug/` page; the back-link returns home.
- Nav links scroll to the right sections; the site looks right at a phone-sized window width.
- No errors in the browser dev-tools console.

Then commit to `master`. To publish: `npm run deploy`.

## 9. Troubleshooting

| Symptom | Likely cause → fix |
|---|---|
| Build fails with a TypeScript error | The error message names the file and line — fix the type or typo there. Every `projectsData`/`experiences` entry must have the same shape as its neighbors. |
| New styles don't apply | The new SCSS partial isn't registered — add `@import './name';` to the `_index.scss` in the same folder. Also check: is the className in the TSX exactly the selector in the SCSS? |
| Utility-looking classes do nothing | They're Tailwind classes — Tailwind isn't installed (Hard Rule 2). Write SCSS instead. |
| New page 404s locally / on Pages | Filename must be lowercase `src/pages/<slug>.tsx`; rebuild; URL needs the trailing slash form `/slug/`. |
| Image doesn't show | Path must start with `/` and match a real file under `public/` (case-sensitive). |
| Deployed site didn't update | You committed but didn't deploy — run `npm run deploy`. Then hard-refresh (Cmd+Shift+R); Pages can take ~2 min. |
| Deployed page is blank / view-source shows no text | Hard Rule 5 was violated — someone added a client-side mount/timer gate around the page. Remove it. |
| `npm run deploy` fails to push | Check `git remote -v` and that you're authenticated to GitHub; the `gh-pages` package pushes over the same remote. |
| Anchor link scrolls to wrong place | The `link: '/#xyz'` in Navbar must exactly match the section's `id="xyz"`. |

## 10. Known quirks

- lucide-react's `Github` icon shows a deprecation warning at type-check. Harmless; it's used in several files — replace everywhere at once or leave it.
- The `experiences` / `projectsData` arrays live inside their section components deliberately: one file to edit per content type.
- A `.section-loader` CSS spinner appears briefly while below-the-fold JS chunks load on slow connections — that's expected.
- `next.config.js` intentionally contains almost nothing — see Hard Rule 1 before adding options.

## 11. Changelog

### July 18, 2026 — Untitled Spacecraft expansion

- Rewrote `/untitled_spacecraft/` with the full robot-summer write-up: overview + course map, mechanical/electrical/firmware/controls sections, and war stories. Six figures added under `public/projects/robot/`.
- Added the click-to-load interactive CAD viewer (`CadViewer.tsx` + `_cad-viewer.scss` + `src/types/model-viewer.d.ts`, Recipe 7.8). New dependency: `@google/model-viewer` (lazy chunk only). Model at `public/models/robot.glb` (1 MB, Draco), decoder self-hosted at `public/draco/`.
- Added `figure` / `.figure-narrow` / `.figure-grid` styles to `_project-page.scss` (Recipe 7.10).

### July 2026 cleanup

Fixed in this pass (details in git history):

- **Empty static export**: removed the `if (!mounted) return null` guard in `_app.tsx` — exported HTML now contains the full page (~34 KB vs 2.4 KB), restoring SEO/social previews and instant first paint.
- **Artificial delays**: removed the 3.5 s `showContent` timer in `index.tsx` and the loader state machine in `_app.tsx`.
- **Images**: `robot.webp` 2.1 MB → 127 KB, `cf2.webp` 1.4 MB → 74 KB; About now uses the 37 KB `profilePicture.webp`; deleted ~3.5 MB of unused images.
- **Hero jitter**: keyword positions memoized; parallax now uses Framer motion values (no React re-render per scroll event).
- **Everforest re-theme**: all colors mapped in `globals.css` (§6), using the **hard** background variant for a darker feel per the owner's preference; fixed the previously **undefined `--navy` variable**.
- **Per-project pages**: added `ProjectLayout` + `/untitled_spacecraft/` + `/ardupilot_crazyflie/` with `trailingSlash: true`; featured cards now link to internal write-ups (the old "View Project" button duplicated the GitHub link).
- **Removed dead code**: Contact section (+ `@emailjs/browser`), `geminiService.ts` (+ `@google/generative-ai` — its `NEXT_PUBLIC` key would have been public in the bundle), unregistered/broken `service-worker.js`, empty `Logo.tsx`, `ThemeContext`, `scrollAnimation.ts`, `MosaicLoader`, duplicate `.eslintrc.js`, stale `yarn.lock`, `prop-types`, unused CSS files, inert Tailwind class strings.
- **Fixed**: invalid JSON in `manifest.json` (trailing comma); duplicate "Some Things I've Built" heading (second grid is now "Other Noteworthy Projects"); empty navbar brand link (now "YC" → `/`); Navbar event-listener leaks; `next.config.js` no-op server options removed; Fira Code 5 weights → 2; sitemap updated; README rewritten (was the upstream template author's).
