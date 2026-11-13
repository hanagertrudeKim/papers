import type { StoryBlock } from '@/lib/dicom-story';

export default function EngineeringNotes({ id, title, description, blocks }: {
  id?: string; title: string; description?: string; blocks: StoryBlock[];
}) {
  return <details className="engineering-notes" id={id}>
    <summary>{title}</summary>
    {description && <p className="note-description">{description}</p>}
    <div className="notes-content">{blocks.map((block, index) =>
      block.kind === 'paragraph' ? <p key={index}>{block.text}</p> :
      block.kind === 'code' ? <figure className="code-excerpt" key={index}>
        <pre tabIndex={0} aria-label={`${block.language} code excerpt`}><code>{block.code}</code></pre>
        <figcaption>{block.caption}</figcaption>
      </figure> : null
    )}</div>
  </details>;
}
