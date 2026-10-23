"use client";
import {useEffect,useRef,useState} from 'react';
import {FileText,Mail,X} from 'lucide-react';
import ProjectShowcase from '@/components/ProjectShowcase';
import ProjectDetails from '@/components/ProjectDetails';
import ScreenViewer from '@/components/ScreenViewer';
import {journey} from '@/lib/journey';

export default function Home(){
 const [panel,setPanel]=useState<'project'|'screens'|null>(null);
 const [projectId,setProjectId]=useState(journey[0].id);
 const [screenIndex,setScreenIndex]=useState(0);
 const dialog=useRef<HTMLDialogElement>(null);
 const project=journey.find(item=>item.id===projectId)||journey[0];
 useEffect(()=>{
  if(panel&&!dialog.current?.open)dialog.current?.showModal();
  else if(!panel&&dialog.current?.open)dialog.current?.close();
 },[panel]);
 return <div className="portfolio">
  <header className="profile-header">
   <div className="profile-avatar" aria-hidden="true">HK</div>
   <h1>Hana Kim</h1>
   <p>Software Engineer · Founder of <a href="#revival">Revival</a></p>
   <nav className="profile-links" aria-label="Contact and résumé"><a href="https://github.com/hanagertrudeKim" target="_blank" rel="noreferrer" aria-label="Hana Kim on GitHub" title="GitHub"><svg width="25" height="25" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 .75a11.25 11.25 0 0 0-3.56 21.92c.56.1.77-.24.77-.54v-2.1c-3.13.68-3.79-1.33-3.79-1.33-.51-1.3-1.25-1.65-1.25-1.65-1.02-.7.08-.68.08-.68 1.13.08 1.72 1.16 1.72 1.16 1 1.72 2.63 1.22 3.27.94.1-.73.39-1.22.71-1.5-2.5-.28-5.13-1.25-5.13-5.56 0-1.23.44-2.23 1.16-3.02-.12-.28-.5-1.43.11-2.98 0 0 .95-.3 3.1 1.15a10.8 10.8 0 0 1 5.64 0c2.15-1.45 3.1-1.15 3.1-1.15.61 1.55.23 2.7.11 2.98.72.79 1.16 1.79 1.16 3.02 0 4.32-2.64 5.27-5.15 5.55.4.35.76 1.04.76 2.1v3.07c0 .3.2.65.78.54A11.25 11.25 0 0 0 12 .75Z"/></svg></a><a href="mailto:rlagksk8428@gmail.com" aria-label="Email Hana" title="Email"><Mail size={25}/></a><a href="/HanaKim_Resume.pdf" target="_blank" rel="noreferrer" aria-label="Download résumé" title="Résumé"><FileText size={24}/></a></nav>
  </header>
  <main className="selected-projects" aria-label="Selected projects">{journey.map(item=><ProjectShowcase key={item.id} project={item} modalOpen={!!panel} onView={index=>{setProjectId(item.id);setScreenIndex(index);setPanel('screens');}} onDetails={()=>{setProjectId(item.id);setPanel('project');}}/>)}</main>
  <footer className="portfolio-footer"><span>© 2026 Hana Kim</span><a href="mailto:rlagksk8428@gmail.com">Get in touch</a></footer>
  <dialog ref={dialog} className={panel==='screens'?'screen-dialog':undefined} aria-labelledby="dialog-title" onCancel={()=>setPanel(null)} onClose={()=>setPanel(null)} onClick={event=>{if(event.target===dialog.current)setPanel(null);}}>
   <div className={panel==='screens'?'screen-panel':'detail-panel'}><button autoFocus className="close-panel" aria-label={panel==='screens'?'Close screen viewer':'Close details'} onClick={()=>setPanel(null)}><X size={21}/></button>{panel==='screens'?<ScreenViewer project={project} index={screenIndex} onChange={setScreenIndex}/>:<ProjectDetails key={project.id} project={project}/>}</div>
  </dialog>
 </div>;
}
