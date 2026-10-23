# Hana Kim — Portfolio

A black, vertically scrolling portfolio with a centered introduction and large horizontal project galleries. The visual structure follows the supplied Greg Sarafian reference, using Hana's own projects, content, and screenshots.

## Run

Use Node.js 24, matching Vercel.

```sh
npm ci
npm run build
npm run start -- --port 3001
```

## Projects and interactions

Four cards: Revival, MaternalCare, DICOM & KOIN, and OakTree. Country flags describe project regions. Each card shows the product type and Hana's contribution, with more context and results in its detail dialog.

Galleries support horizontal swipe, trackpad scrolling, arrow buttons, and keyboard arrows. Visible galleries advance slowly; hover, focus, touch, and opening a dialog pause playback. Each has a pause/play control, and reduced-motion preferences disable automatic motion.

Selecting a screenshot opens a native modal at that screen. Arrow buttons, left/right keys, and horizontal swipes navigate within the project. Escape closes the viewer and restores focus. The diagonal-arrow button opens the separate case study.

Project data: `lib/journey.ts`. Detailed notes: `lib/case-notes.ts`. Screenshots: `public/portfolio-images/`. Runtime images do not depend on localhost.

The earlier globe journey remains in Git history and its unused components are retained for reuse. The current homepage uses ordinary page scrolling.
