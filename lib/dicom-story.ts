export type StoryBlock =
  | { kind: 'paragraph'; text: string }
  | { kind: 'code'; language: string; code: string; caption: string }
  | { kind: 'gallery' }
  | { kind: 'field-gallery' }
  | { kind: 'results' };

// Narrative and excerpts follow Hana's 2023 notes, including unresolved issues.
export const dicomStory: StoryBlock[] = [
  { kind: 'paragraph', text: 'Getting the two to work together took longer than I expected. My attempts with python-shell ran into dependency issues. I explored a Flask service, but that moved the problem elsewhere: the application needed to process large folders on the researcher’s computer. Even after compressing a DICOM folder, my upload exceeded the server’s limit and returned a 413 error.' },
  { kind: 'paragraph', text: 'After several days and four rollbacks, I wrote down what had failed. I had been trying different ways to connect the pieces before fully considering the environment they needed to run in. Researchers might not have Python installed, the data was large, and processing needed access to local files. I eventually switched to PyQt, keeping the interface and processing in the same Python ecosystem.' },
  { kind: 'gallery' },
  { kind: 'paragraph', text: 'Alongside the interface, I was adapting the script’s outputs to the research workflow. I narrowed the metadata export to the fields we needed and initialized a record for each series:' },
  { kind: 'code', language: 'python', code: 'series_metadata_dict[series_uid] = {\n    "subj": "",\n    "ct_date": "",\n    "MRN": "",\n}', caption: 'From my working notes: initializing the metadata record for each series.' },
  { kind: 'paragraph', text: 'I then mapped values from the DICOM metadata and checked the exported CSV. Seeing the values land in the right columns was a small but memorable milestone after spending so much time getting the pipeline to run.' },
  { kind: 'paragraph', text: 'The transformation also needed to follow the lab’s subject-naming workflow:' },
  { kind: 'code', language: 'python', code: 'dcm.PatientID = subj\nct_date = dcm.AcquisitionDate\ndcm.PatientName = f"{subj}_{ct_date}"', caption: 'From my working notes: applying the subject identifier and scan date.' },
  { kind: 'paragraph', text: 'At that stage, the subject-ID convention was still being discussed. The CSV also retained the original patient ID and acquisition date, so it remained identifying data that needed separate handling. Getting the script to run did not settle every question about its outputs.' },
  { kind: 'paragraph', text: 'Packaging introduced another set of problems. I used PyInstaller and built on my M2 Mac and an older Windows laptop. For a while, releasing software involved carrying both computers around.' },
  { kind: 'paragraph', text: 'I moved the build and release steps into GitHub Actions, triggered by version tags:' },
  { kind: 'code', language: 'yaml', code: "on:\n  push:\n    tags:\n      - 'v*'", caption: 'From my working notes: starting the release workflow with a version tag.' },
  { kind: 'paragraph', text: 'The workflow built packages and uploaded them to a release. Then I downloaded the Mac executable, tried it on my M2, and hit an executable-format error. The build had succeeded, but the architecture did not match my machine. My notes end with that compatibility issue still needing work.' },
  { kind: 'paragraph', text: 'The project reduced DICOM preparation time by approximately 33%, as reported in my résumé. It also changed how I approached development: I became more willing to pause, write down failed assumptions, and reconsider a tool choice. The interface, processing script, exported data, and executable all had to work together on someone else’s computer.' },
];
