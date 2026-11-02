# Hana Kim — Portfolio

A white, vertically scrolling engineering portfolio inspired by Malvika Jain’s editorial layout: a narrow label column, project index, and complete case studies with static product screenshots.

## Run

Use Node.js 24, matching Vercel.

```sh
npm ci
npm run build
npm run start -- --port 3001
```

For local editing, run `npm run dev -- --port 3001`.

## Content and versions

The projects are Maternal Care EHR, DICOM Anonymizer, KOIN, and Revival. The two-paragraph About introduces Hana’s approach, teaching, music, and cultural interests. Each project follows title, keyword pills, introduction, Problem / Insights / Solution, images, and Takeaway. Edit project content in `lib/portfolio.ts` and page markup in `app/page.tsx`.

DICOM’s approved longer narrative and code excerpts remain available in an expandable working-notes section, sourced from `lib/dicom-story.ts`. Its architecture mismatch remains unresolved in those notes. The previous EHR/KOIN narrative drafts are retained in `lib/project-stories.ts` for reference and are no longer rendered.

Open `/?revival=hidden` to omit Revival from both the index and case studies. OakTree remains removed. The linked résumé is the original supplied PDF. Metrics retain approximate/estimated wording: EHR has approximately eight deployment areas in the Dominican Republic and 780 diagnosis/medication records over three months, not 780 patients.

## Images and privacy

Screenshots enlarge in a native dialog, with previous/next buttons, left/right keyboard arrows, Escape, focus containment and focus restoration. Reduced-motion preferences disable smooth scrolling. On narrow screens the EHR and desktop images stack vertically; the two Revival previews remain side by side.

Five screenshots were edited with the built-in image generation tool for opaque redaction: three EHR screens, the DICOM desktop screen, and the sponsorship profile. Captions identify them as privacy-edited screenshots. Unredacted screenshots, the field photograph, and the website image containing identifiable children are kept outside `public/` in an ignored local review directory. They are not used by the page.

`planning/portfolio-renewal/06-image-redactions.md` records the edit prompts and asset paths. Do not copy the private review directory into public assets. Planning documents are internal and are not site routes.

## Validation

`npm run build` includes lint and TypeScript checks. Browser verification covers desktop/mobile layouts, section anchors, image enlargement and navigation, Escape/focus restoration, and the Revival-hidden variant.

Older unused globe and section components remain available in the repository; the current homepage does not import them.


## Reference layout and added evidence

The layout uses the reference’s system font, white theme, 16px / 1.5 base typography, 96px desktop top padding, 24px minimum side padding, 200px label column, 40px column gap, and 80px row spacing. The maximum outer width is 1348px, equivalent to its four-track grid. Keyword pills use 14px type. Problem / Insights / Solution use three equal columns with 48px gaps. Tablet and phone layouts collapse the columns and match the reference’s padding scale while preserving readable content.

Portrait images share a 390:844 frame; landscape evidence shares a 3:2 frame. All use contain sizing, without cropping. Added evidence: `dicom-build-workflow.png` and `dicom-release-assets.png` are archived images embedded in the supplied 2023 deployment note; `koin-error-convention.png` is a captured excerpt of Hana’s published 2024 GitHub wiki; The Revival gallery now uses three official App Store promotional images at 1242×2688 (`revival-store-*-hd.png`), replacing the earlier 390×844 pitch-deck previews. The source is the US App Store listing for app ID 6804561211; optimized thumbnails request quality 95, while the enlargement shows the original PNG. The pitch-deck assets remain unused by the main page. No generated product features or new clinical photographs were added.

Revival also includes three field-context images supplied by Hana: `revival-whatsapp-context.png` (supplied pre-redacted advertising and feedback collage), `revival-owner-meeting.jpg`, and `revival-team-photo.png`. The context gallery precedes the two field photographs, followed by the official high-resolution app previews. The Problem and Insights copy links the WhatsApp discovery pattern and description-field feedback to the product. Field photos share a 4:3 contain frame; original source files were copied without altering their pixels.
