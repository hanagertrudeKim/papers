import type { StoryBlock } from './dicom-story';

// Based on the supplied portfolio and résumé; no invented incidents or dialogue.
export const ehrStory: StoryBlock[] = [
  { kind: 'paragraph', text: 'Visits were weeks apart, sometimes in different villages. When a patient returned without medical documentation, staff often had to rely on what she remembered. Even a previous blood-pressure reading could be difficult to recover. I began to see the EHR as a way to carry information from one appointment into the next.' },
  { kind: 'field-gallery' },
  { kind: 'paragraph', text: 'That changed where I started the redesign. I organized visit-specific records around a single patient history and used Core Data to keep them available offline. A previous observation needed to remain accessible when the clinic returned, including on days when the internet did not.' },
  { kind: 'paragraph', text: 'The interface needed the same attention to clinic conditions. Staff had little time between patients, so I observed their workflow and gathered feedback on the forms. I simplified the checklists around the prenatal information they needed, including blood pressure, gestational age, and risk flags. Each change had to make sense in the middle of a clinic day.' },
  { kind: 'gallery' },
  { kind: 'paragraph', text: 'I also built a dashboard to help staff see patterns across the records. It aggregates diagnosis and medication entries, calculates frequencies and percentages, and surfaces the five most common diagnoses and medications. The three-month analysis reported in my résumé covered 780 entries; that is a record count, not a patient count.' },
  { kind: 'paragraph', text: 'The app was deployed in approximately eight areas in the Dominican Republic. The estimated reduction in clinic workflow time was about 25%.' },
  { kind: 'results' },
  { kind: 'paragraph', text: 'This project taught me to pay attention to what happens between visits as well as during them. The data model and the forms had to work together so that the next appointment could begin with information the team had already collected.' },
];

export const koinStory: StoryBlock[] = [
  { kind: 'paragraph', text: 'Working on production React applications meant contributing to code that other people were changing and maintaining too. I collaborated with backend engineers and designers, and gradually took on more work around shared components, code reviews, and developer mentoring.' },
  { kind: 'gallery' },
  { kind: 'paragraph', text: 'Repeated UI patterns made component reuse an important part of that work. I built shared React and TypeScript components and used reviews to help the team apply common patterns. I had to think about whether another developer could understand and reuse a decision after my own feature was finished.' },
  { kind: 'paragraph', text: 'I worked on consistency in the application’s behavior as well. I migrated state from Recoil to Zustand and standardized API error handling with typed conventions and Slack reporting. Writing down the error convention gave the team a shared reference for handling failures across the product.' },
  { kind: 'paragraph', text: 'The same attention extended to the pull-request workflow. I automated steps with GitHub Actions and Slack notifications to reduce the manual coordination around reviews. These changes addressed different parts of the work, from writing a component to getting a change ready for the team.' },
  { kind: 'results' },
  { kind: 'paragraph', text: 'My résumé reports approximately 55% more code reuse, 45% fewer errors from the state and error-handling work, and 25% less pull-request workflow time. The experience also changed how I understood my contribution: explaining a convention and helping someone else use it were part of maintaining the software.' },
];
