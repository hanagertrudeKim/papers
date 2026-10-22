# Hana Kim — Global Problem Solving

A single-screen portfolio journey. Scrolling changes projects and rotates the globe toward each project's location; the document itself does not scroll.

## Run

Use Node.js 24, matching the Vercel deployment runtime.

```sh
npm ci
npm run build
npm run start -- --port 3001
```

## Navigation

- Wheel / trackpad: next or previous project, with a short transition cooldown.
- Up / down / left / right, Page Up / Page Down, Space, Home / End: navigate when focus is outside an interactive control.
- Vertical mobile swipe, project stop buttons, or previous / next buttons.
- Explore opens a native modal dialog with its own scroll area. Background project navigation pauses while a dialog is open.
- Reduced-motion preference removes the globe's animated travel and text motion.

## Content

Project order and narrative: `lib/journey.ts`.
Globe rendering and location focus: `components/Globe/JourneyGlobe.tsx`.
The existing globe land layer is reused. Raised location pins, curved routes, and traveling markers connect the project regions. A visual fallback is included for browsers without WebGL.

Product previews use real screenshots in horizontally scrollable galleries, with previous/next controls and reduced-motion support. Selecting a screenshot opens a native modal image viewer at that screen; arrow buttons, left/right keys, and horizontal swipes navigate within the project. Escape closes the viewer and restores focus. My contribution opens the separate case study. Revival identifies Hana as founder.

MaternalCare, OakTree, DICOM and KOIN descriptions use the supplied updated résumé. Revival uses the supplied app and description. Revival captures are static local assets, with no localhost dependency at runtime.

The production site is deployed from this repository through Vercel.

## Current gallery layout

Four stops: Revival, MaternalCare, DICOM & KOIN (a combined Korea chapter with separate project labels and metrics), then OakTree child sponsorship. Important screenshots sit above a short founder/engineering description and source-backed numbers. The globe retains location focus and routes with subtle teal/violet lighting and atmosphere animation. Reduced-motion preferences are respected.
