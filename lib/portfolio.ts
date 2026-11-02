import { dicomStory, type StoryBlock } from './dicom-story';

export type PortfolioImage = { src: string; alt: string; label: string; width: number; height: number; quality?: number };
export type PortfolioProject = {
  id: string; title: string; shortDescription: string; technologies: string[]; intro: string;
  problem: string; insights: string; solution: string[]; takeaway: string;
  images: PortfolioImage[]; galleryKind: 'mobile' | 'desktop'; galleryCaption: string;
  fieldGallery?: { images: PortfolioImage[]; caption: string };
  contextGallery?: { images: PortfolioImage[]; caption: string };
  notes?: StoryBlock[]; links: { label: string; href: string }[];
};

// Metrics follow the résumé; deployment geography follows Hana's clarification.
export const projects: PortfolioProject[] = [
  {
    id: 'maternal-care', title: 'Maternal Care EHR', shortDescription: 'Prenatal records, available offline',
    technologies: ['Swift', 'SwiftUI', 'Core Data', 'Offline storage'],
    intro: 'I redesigned an offline iOS EHR for mobile maternal care in partnership with Global Care and KOICA. The app was deployed in approximately eight areas in the Dominican Republic.',
    problem: 'Patients returned weeks after a visit, often without medical documentation. Staff had to reconstruct their history from memory, including previous blood-pressure readings. Unreliable connectivity and limited time between patients made recording and retrieving that information harder.',
    insights: 'Observing clinic days changed where I started the redesign. Each appointment needed to become part of a continuing patient history, and staff needed to reach that history offline. Feedback also showed how closely the forms needed to follow the information staff used during a visit.',
    solution: ['I linked visit-specific records to a single patient history with Core Data and simplified prenatal checklists around blood pressure, gestational age, and risk flags. The estimated reduction in clinic workflow time was approximately 25%.', 'I also built a dashboard that computes diagnosis and medication frequencies and surfaces the five most common entries in each category. The three-month analysis in my résumé covered 780 diagnosis and medication records, not 780 patients.'],
    fieldGallery: { images: [{ src: '/portfolio-images/ehr-field-demo-v1.png', alt: 'A discussion around a phone during clinic work, with peripheral faces redacted.', label: 'A conversation during clinic work', width: 1448, height: 1086 }], caption: 'The clinic setting that shaped the EHR. Peripheral faces and identifying details are redacted.' },
    images: [
      { src: '/portfolio-images/ehr-roster-v2.png', alt: 'Patient roster with identifying details redacted.', label: 'Patient list', width: 851, height: 1849 },
      { src: '/portfolio-images/ehr-checklist-v3.png', alt: 'Monthly prenatal checklist with clinical measurements visible and patient identity redacted.', label: 'Monthly visit', width: 851, height: 1849 },
      { src: '/portfolio-images/ehr-history-v3.png', alt: 'Medical history with diagnoses, medications and vital signs visible; patient identity is redacted.', label: 'Medical history', width: 851, height: 1848 },
      { src: '/portfolio-images/ehr-analytics-v2.png', alt: 'Aggregate clinical trends and diagnosis and medication frequency charts.', label: 'Clinical analytics', width: 1206, height: 2622 },
    ],
    galleryKind: 'mobile', galleryCaption: 'Four connected parts of the clinical workflow. Patient identities and visit dates are redacted; clinical values remain visible. Dashboard totals are shown as captured and differ from the résumé’s separate 780-record analysis.',
    takeaway: 'Clinic conditions became design requirements. Linking visits and simplifying forms helped the team carry information into the next appointment, even when the connection could not be counted on.', links: [],
  },
  {
    id: 'dicom', title: 'DICOM Anonymizer', shortDescription: 'Batch processing for medical research',
    technologies: ['Python', 'PyQt6', 'pydicom', 'PyInstaller', 'GitHub Actions', 'Electron prototype'],
    intro: 'At Seoul National University Hospital’s LAMIS lab, I turned an existing Python DICOM de-identification script into a desktop workflow for researchers. My résumé reports approximately 33% less preparation time.',
    problem: 'Researchers needed to select local imaging folders, run the processing script, and export research metadata without managing a Python environment. My first Electron implementation ran into dependency problems; a Flask-based approach then hit upload limits, including a 413 error for a compressed DICOM folder.',
    insights: 'After several days and four rollbacks, I wrote down the failed assumptions. The data was large, processing needed local file access, and the researcher might not have Python installed. Those constraints mattered more than my familiarity with the web stack. Later, an M2 executable-format error showed that a successful build did not establish compatibility.',
    solution: ['I switched to PyQt, keeping the interface and processing in the Python ecosystem. I adapted subject-ID fields and per-series CSV exports, checking the mapped values. The CSV retained patient IDs and dates and required separate handling.', 'I packaged the app with PyInstaller and automated version-tag builds and release uploads with GitHub Actions. My deployment notes end with the M2 architecture mismatch still needing work.'],
    images: [
      { src: '/portfolio-images/dicom-app.png', alt: 'DICOM desktop application with identifiers and filesystem paths redacted.', label: 'Desktop processing interface', width: 1541, height: 1021 },
      { src: '/portfolio-images/dicom-docs.png', alt: 'DICOM application installation and workflow documentation.', label: 'User documentation', width: 1044, height: 749 },
      { src: '/portfolio-images/dicom-build-workflow.png', alt: 'Archived GitHub Actions run showing release creation and two completed build jobs.', label: 'Archived build workflow', width: 1674, height: 1112 },
      { src: '/portfolio-images/dicom-release-assets.png', alt: 'Archived DICOM release with Mac and Windows package assets.', label: 'Archived release assets', width: 1656, height: 1106 },
    ],
    galleryKind: 'desktop', galleryCaption: 'Application, documentation, and archived build and release screenshots from my 2023 working notes. The application screenshot is redacted. Build success does not establish runtime compatibility on every architecture.',
    notes: dicomStory,
    takeaway: 'I learned to pause and revisit an architecture when the constraints did not fit. Installation, data handling, and execution on someone else’s computer were all part of the product.',
    links: [
      { label: 'Source code', href: 'https://github.com/hanagertrudeKim/DICOM_Anonymizer' },
      { label: 'User documentation', href: 'https://hanagertridekim.notion.site/DICOM-Anonymizer-Docs-c2461f6447094cc49db8b73770748a88' },
      { label: 'Architecture notes', href: 'https://github.com/hanagertrudeKim/obsidian-backup/blob/master/snu-h/Electron/Electron%20%EC%9C%BC%EB%A1%9C%20DICOM%20Deidenrifier%20%EB%8D%B0%EC%8A%A4%ED%81%AC%ED%83%91%20%EC%95%B1%20%EA%B0%9C%EB%B0%9C.md' },
      { label: 'Release notes', href: 'https://github.com/hanagertrudeKim/obsidian-backup/blob/master/snu-h/PyQt6/%EB%B0%B0%ED%8F%AC%20%EC%9E%90%EB%8F%99%ED%99%94%20%EA%B5%AC%ED%98%84.md' },
    ],
  },
  {
    id: 'koin', title: 'KOIN', shortDescription: 'Engineering for a shared React codebase',
    technologies: ['React', 'TypeScript', 'Zustand', 'Axios', 'GitHub Actions', 'Code reviews'],
    intro: 'As a front-end engineer and team lead at BCSD Labs, I worked with backend engineers and designers on campus services, shared components, and the conventions developers used to maintain them.',
    problem: 'Repeated UI patterns and inconsistent state and error handling increased maintenance work across a shared React codebase. API errors needed additional branching in clients, and the team also spent time on manual coordination around pull requests.',
    insights: 'A useful change had to be understandable by the next developer. For error handling, that meant distinguishing application errors from other Axios failures through a shared representation. Reviews and documentation were how those decisions became usable across the team.',
    solution: ['I built shared React and TypeScript components, migrated state from Recoil to Zustand, and documented typed error conventions with utilities and Slack reporting. I also reviewed code and mentored developers.', 'GitHub Actions and Slack notifications reduced manual steps in the pull-request workflow. My résumé reports approximately 55% more code reuse, 45% fewer errors from the state/error-handling work, and 25% less pull-request workflow time.'],
    images: [
      { src: '/portfolio-images/koin-service.png', alt: 'KOIN campus service showing nearby businesses and categories.', label: 'Campus-service interface', width: 1458, height: 990 },
      { src: '/portfolio-images/koin-error-convention.png', alt: 'Hana Kim’s 2024 KOIN wiki documenting the need for consistent API error handling.', label: 'My error-handling convention', width: 896, height: 480 },
    ],
    galleryKind: 'desktop', galleryCaption: 'The team’s campus-service interface and my published 2024 error-handling convention. The documentation capture shows the original problem and shared response format.',
    takeaway: 'The team’s ability to keep building depended on shared understanding. A reusable component, a clear convention, and a useful review could help well beyond my own changes.',
    links: [
      { label: 'Source code', href: 'https://github.com/BCSDLab/KOIN_WEB_RECODE' },
      { label: 'Error convention', href: 'https://github.com/BCSDLab/KOIN_WEB_RECODE/wiki/Koin-Error-Convention-(2024)' },
    ],
  },
  {
    id: 'revival', title: 'Revival', shortDescription: 'Connecting people with local services',
    technologies: ['Mobile app', 'iOS', 'Android', 'Multilingual', 'Service discovery'],
    intro: 'An independent project for finding local service providers and contacting them directly. Revival is available on iOS and Android.',
    problem: 'Local business owners were promoting food, classes, and other services through WhatsApp statuses and group posts. The information was scattered across messages, making it difficult to compare services or find a business again. I wanted to give those services a place people could search and return to.',
    insights: 'Meeting business owners connected the product to the people it needed to serve. Early WhatsApp feedback included a request for a clearer place to describe a business. A listing needed to explain what a provider offered and lead naturally into a direct conversation.',
    solution: ['I built a multilingual app that brings service discovery, provider profiles, and direct contact into one flow. People can browse categories, inspect a service, and start a conversation with a provider.'],
    contextGallery: {
      images: [{ src: '/portfolio-images/revival-whatsapp-context.png', alt: 'User-supplied WhatsApp collage showing food and class advertisements alongside early product feedback, with identifying details masked.', label: 'The starting point: services shared through WhatsApp', width: 1456, height: 773, quality: 95 }],
      caption: 'Real WhatsApp advertisements and early product feedback. Identifying details were masked in the supplied image.',
    },
    fieldGallery: {
      images: [
        { src: '/portfolio-images/revival-owner-meeting.jpg', alt: 'Photo from a meeting with local business owners for the Revival project.', label: 'Meeting local business owners', width: 1086, height: 1448, quality: 90 },
        { src: '/portfolio-images/revival-team-photo.png', alt: 'Revival team gathered outdoors in a group photograph.', label: 'The team behind the work', width: 1024, height: 768, quality: 90 },
      ],
      caption: 'Meeting business owners and spending time together as a team.',
    },
    images: [
      { src: '/portfolio-images/revival-store-home-hd.png', alt: 'Official Revival App Store preview showing the home screen and multilingual service discovery.', label: 'Discover Revival', width: 1242, height: 2688, quality: 95 },
      { src: '/portfolio-images/revival-store-discover-hd.png', alt: 'Official Revival App Store preview showing local services filtered by category and area.', label: 'Find a nearby service', width: 1242, height: 2688, quality: 95 },
      { src: '/portfolio-images/revival-store-provider-hd.png', alt: 'Official Revival App Store preview showing provider details, hours, languages and direct contact.', label: 'Get to know the provider', width: 1242, height: 2688, quality: 95 },
    ],
    galleryKind: 'mobile', galleryCaption: 'Official promotional app previews from Revival’s App Store listing: home, service discovery, and provider details.',
    takeaway: 'The conversations around the app helped me see what a useful business profile needed to explain. I’m continuing to connect that field experience with a clearer path from discovering a service to contacting its provider.',
    links: [{ label: 'Visit Revival', href: 'https://revival-service.com/' }, { label: 'App Store', href: 'https://apps.apple.com/us/app/revival-find-local-services/id6804561211?uo=4' }],
  },
];
