import { ArrowUpRight } from 'lucide-react';
import ProjectGallery from '@/components/ProjectGallery';
import { projects } from '@/lib/portfolio';

const contactLinks = [
  { label: 'Résumé', href: '/HanaKim_Resume.pdf' },
  { label: 'GitHub', href: 'https://github.com/hanagertrudeKim' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/hana-gertrude-kim' },
  { label: 'Email', href: 'mailto:rlagksk8428@gmail.com' },
];

export default function Home({ searchParams }: { searchParams: { revival?: string } }) {
  const visibleProjects = projects.filter(project => project.id !== 'revival' || searchParams.revival !== 'hidden');
  return <div className="portfolio-page" id="top">
    <a className="skip-link" href="#main">Skip to content</a>
    <header className="page-grid site-header">
      <a className="section-label home-link" href="#top">Portfolio</a>
      <div className="header-content"><a className="name-link" href="#top">Hana Kim</a></div>
    </header>
    <main id="main">
      <section className="page-grid about-section" aria-labelledby="about-label">
        <h1 className="section-label" id="about-label">About</h1>
        <div className="about-content">
          <p>Hi, I’m Hana. My work has helped reduce clinic workflow time by an estimated <strong>25%</strong>, cut DICOM preparation time by approximately <strong>33%</strong>, and increase code reuse in a shared React codebase by approximately <strong>55%</strong>. Across healthcare and developer tools, I get there by listening closely, questioning my assumptions, and working through approaches that fall short. I build for the person using the software and the teammate maintaining it.</p>
          <p>I’ve spent years teaching Hapkido and Taekwondo, especially to kids; their questions keep me on my toes. Away from the keyboard, I play songs by ear on the piano, write music, and sing with more enthusiasm than polish. I love exploring other cultures, preferably over food. My enthusiasm for spicy food continues to outrun my survival instinct.</p>
        </div>
      </section>
      <nav className="page-grid project-index" aria-labelledby="projects-label">
        <h2 className="section-label" id="projects-label">Projects</h2>
        <ol>{visibleProjects.map(project => <li key={project.id}><a href={`#${project.id}`}>{project.title}</a><span> ({project.shortDescription})</span></li>)}</ol>
      </nav>
      <div className="case-studies">
        {visibleProjects.map((project, index) => <article className="page-grid case-study" id={project.id} key={project.id} aria-labelledby={`${project.id}-title`}>
          <aside className="project-aside"><span className="section-label">{String(index + 1).padStart(2, '0')}</span></aside>
          <div className="case-content">
            <header className="case-header">
              <h2 id={`${project.id}-title`}>{project.title}</h2>
              <ul className="tech-tags" aria-label={`${project.title} technologies`}>{project.technologies.map(tech => <li key={tech}>{tech}</li>)}</ul>
            </header>
            <p className="project-intro">{project.intro}</p>
            <div className="project-columns">
              <section aria-labelledby={`${project.id}-problem`}><h3 id={`${project.id}-problem`}>Problem</h3><p>{project.problem}</p></section>
              <section aria-labelledby={`${project.id}-insights`}><h3 id={`${project.id}-insights`}>Insights</h3><p>{project.insights}</p></section>
              <section aria-labelledby={`${project.id}-solution`}><h3 id={`${project.id}-solution`}>Solution</h3>{project.solution.map(paragraph => <p key={paragraph}>{paragraph}</p>)}</section>
            </div>
            {project.notes && <details className="engineering-notes"><summary>Working notes and code</summary><div className="notes-content">{project.notes.map((block, index) => block.kind === 'paragraph' ? <p key={index}>{block.text}</p> : block.kind === 'code' ? <figure className="code-excerpt" key={index}><pre tabIndex={0} aria-label={`${block.language} code excerpt`}><code>{block.code}</code></pre><figcaption>{block.caption}</figcaption></figure> : null)}</div></details>}
            {project.contextGallery && <ProjectGallery images={project.contextGallery.images} title={`${project.title} — Context`} kind="desktop" caption={project.contextGallery.caption} />}
            {project.fieldGallery && <div className="field-gallery"><ProjectGallery images={project.fieldGallery.images} title={`${project.title} — In the field`} kind="desktop" caption={project.fieldGallery.caption} /></div>}
            <ProjectGallery images={project.images} title={project.title} kind={project.galleryKind} caption={project.galleryCaption} />
            <p className="project-takeaway"><strong>Takeaway:</strong> <span>{project.takeaway}</span></p>
            {project.links.length > 0 && <nav className="project-links" aria-label={`${project.title} resources`}>{project.links.map(link => <a href={link.href} key={link.label} target="_blank" rel="noreferrer">{link.label}<ArrowUpRight size={14} aria-hidden="true" /></a>)}</nav>}
          </div>
        </article>)}
      </div>
      <section className="page-grid background-section" aria-labelledby="background-label">
        <h2 className="section-label" id="background-label">Background</h2>
        <div className="background-content"><div><h3>Education</h3><p>Gordon College<br /><span>B.S. in Computer Science · Expected 2028</span></p><p>KOREATECH<br /><span>Computer Science coursework · 2022–2024</span></p></div><div><h3>Toolkit</h3><p>Swift, TypeScript, JavaScript, Python</p><p>SwiftUI, Core Data, React, React Query, Zustand, PyQt6, pydicom, GitHub Actions</p></div></div>
      </section>
      <section className="page-grid contact-section" aria-labelledby="contact-label">
        <h2 className="section-label" id="contact-label">Get in touch</h2>
        <div><p>I’m looking for Software Engineer internships and opportunities to build and learn.</p><nav className="contact-links" aria-label="Contact and résumé">{contactLinks.map(link => <a key={link.label} href={link.href} target={link.href.startsWith('mailto:') ? undefined : '_blank'} rel="noreferrer">{link.label}<ArrowUpRight size={14} aria-hidden="true" /></a>)}</nav></div>
      </section>
    </main>
    <footer className="page-grid site-footer"><span>© {new Date().getFullYear()} Hana Kim</span><div><span>Built with care.</span><a href="#top">Back to top ↑</a></div></footer>
  </div>;
}
