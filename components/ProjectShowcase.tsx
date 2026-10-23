"use client";
import Image from 'next/image';
import {useEffect,useRef,useState} from 'react';
import {motion,useReducedMotion} from 'framer-motion';
import {ArrowUpRight,ChevronLeft,ChevronRight,Pause,Play} from 'lucide-react';
import {JourneyProject,projectLabels,projectRegions,projectSummaries} from '@/lib/journey';

const marks:Record<string,{label:string;color:string}>={revival:{label:'R',color:'#d94c27'},maternalcare:{label:'M',color:'#c8788d'},korea:{label:'DK',color:'#7363b7'},oaktree:{label:'O',color:'#537858'}};
export default function ProjectShowcase({project,modalOpen,onView,onDetails}:{project:JourneyProject;modalOpen:boolean;onView:(index:number)=>void;onDetails:()=>void}){
 const strip=useRef<HTMLDivElement>(null),card=useRef<HTMLElement>(null);
 const reduced=!!useReducedMotion();
 const [paused,setPaused]=useState(false),[hovered,setHovered]=useState(false),[visible,setVisible]=useState(false);
 const mark=marks[project.id];
 const move=(direction:number)=>{
  const el=strip.current;if(!el)return;
  const shot=el.querySelector<HTMLElement>('.showcase-shot');
  const step=(shot?.getBoundingClientRect().width||el.clientWidth*.7)+parseFloat(getComputedStyle(el).columnGap||'0');
  el.scrollBy({left:step*direction,behavior:reduced?'auto':'smooth'});
 };
 useEffect(()=>{
  const observer=new IntersectionObserver(([entry])=>setVisible(entry.isIntersecting),{threshold:.25});
  if(card.current)observer.observe(card.current);
  return()=>observer.disconnect();
 },[]);
 useEffect(()=>{
  if(reduced||paused||hovered||!visible||modalOpen)return;
  const timer=window.setInterval(()=>{
   const el=strip.current;if(!el||el.scrollWidth<=el.clientWidth+2)return;
   const shot=el.querySelector<HTMLElement>('.showcase-shot');
   const next=el.scrollLeft+(shot?.getBoundingClientRect().width||el.clientWidth*.7)+parseFloat(getComputedStyle(el).columnGap||'0');
   el.scrollTo({left:el.scrollLeft+el.clientWidth>=el.scrollWidth-4?0:next,behavior:'smooth'});
  },5500);
  return()=>window.clearInterval(timer);
 },[reduced,paused,hovered,visible,modalOpen]);
 return <motion.article ref={card} id={project.id} className={`showcase-card ${project.mobile?'showcase-mobile':'showcase-desktop'}`} aria-labelledby={`${project.id}-title`} initial={reduced?false:{opacity:0,y:18}} whileInView={{opacity:1,y:0}} viewport={{once:true,amount:.08}} transition={{duration:.45}} onMouseEnter={()=>setHovered(true)} onMouseLeave={()=>setHovered(false)}>
  <div ref={strip} className="showcase-strip" aria-label={`${project.title} screens`} tabIndex={0} onFocusCapture={()=>setPaused(true)} onTouchStart={()=>setPaused(true)} onKeyDown={event=>{if(event.key==='ArrowLeft'||event.key==='ArrowRight'){event.preventDefault();setPaused(true);move(event.key==='ArrowRight'?1:-1);}}}>
   {project.screens.map((screen,index)=><button className="showcase-shot" key={screen.image} aria-label={`Enlarge ${screen.label} screen`} onClick={()=>{setPaused(true);onView(index);}}><Image unoptimized src={`/portfolio-images/${screen.image}`} alt={`${project.title}: ${screen.label}`} width={project.mobile?390:1100} height={project.mobile?844:750} priority={project.id==='revival'} draggable={false}/></button>)}
  </div>
  <footer className="showcase-footer">
   <div className="project-mark" style={{background:mark.color}} aria-hidden="true">{mark.label}</div>
   <div className="showcase-caption"><div className="showcase-title"><h2 id={`${project.id}-title`}>{project.title}</h2><span className="card-flags" aria-label={`Project region: ${projectRegions[project.id].map(r=>r.name).join(', ')}`}>{projectRegions[project.id].map(region=><span key={region.name} title={region.name} aria-hidden="true">{region.flag}</span>)}</span></div><p>{projectLabels[project.id]}</p><p className="showcase-ownership"><strong>{project.role}</strong><span> — {projectSummaries[project.id].contribution}</span></p></div>
   <div className="showcase-actions"><button aria-label={`Previous ${project.title} screen`} title="Previous screen" onClick={()=>{setPaused(true);move(-1);}}><ChevronLeft size={21}/></button><button aria-label={`Next ${project.title} screen`} title="Next screen" onClick={()=>{setPaused(true);move(1);}}><ChevronRight size={21}/></button>{!reduced&&<button aria-label={`${paused?'Play':'Pause'} ${project.title} gallery`} title={paused?'Play gallery':'Pause gallery'} onClick={()=>setPaused(!paused)}>{paused?<Play size={18}/>:<Pause size={18}/>}</button>}<button aria-label={`${project.title} project details`} title="My contribution & project details" onClick={onDetails}><ArrowUpRight size={23}/></button></div>
  </footer>
 </motion.article>;
}
