"use client";

import Image from 'next/image';
import {useEffect,useRef} from 'react';
import {motion,useReducedMotion} from 'framer-motion';
import {ArrowLeft,ArrowRight} from 'lucide-react';
import {JourneyProject} from '@/lib/journey';

export default function ScreenViewer({project,index,onChange}:{project:JourneyProject;index:number;onChange:(next:number)=>void}){
 const reduced=!!useReducedMotion();
 const start=useRef<{x:number;y:number}|null>(null);
 const screen=project.screens[index];
 const go=(next:number)=>{if(next>=0&&next<project.screens.length)onChange(next);};
 useEffect(()=>{
  const key=(event:KeyboardEvent)=>{
   if(event.altKey||event.ctrlKey||event.metaKey)return;
   if(event.key==='ArrowLeft'||event.key==='ArrowRight'){
    event.preventDefault();
    const next=index+(event.key==='ArrowRight'?1:-1);
    if(next>=0&&next<project.screens.length)onChange(next);
   }
  };
  window.addEventListener('keydown',key);
  return()=>window.removeEventListener('keydown',key);
 },[index,onChange,project.screens.length]);
 return <section className="screen-viewer" aria-label={`${project.title} enlarged screenshots`}>
  <header className="viewer-header"><h2 id="dialog-title">{project.title}</h2><p>Screen {index+1} of {project.screens.length}</p></header>
  <div className="viewer-stage"
   onTouchStart={event=>{start.current=event.touches.length===1?{x:event.touches[0].clientX,y:event.touches[0].clientY}:null;}}
   onTouchCancel={()=>{start.current=null;}}
   onTouchEnd={event=>{const point=start.current;start.current=null;if(!point||event.touches.length||!event.changedTouches.length)return;const dx=point.x-event.changedTouches[0].clientX,dy=point.y-event.changedTouches[0].clientY;if(Math.abs(dx)>48&&Math.abs(dx)>Math.abs(dy)*1.4)go(index+(dx>0?1:-1));}}>
   <motion.div className="viewer-image" key={screen.image} initial={{opacity:reduced?1:0}} animate={{opacity:1}} transition={{duration:reduced?0:.16}}>
    <Image unoptimized src={`/portfolio-images/${screen.image}`} alt={`${project.title}: ${screen.label}`} width={project.mobile?390:1100} height={project.mobile?844:750} priority draggable={false}/>
   </motion.div>
  </div>
  <footer className="viewer-navigation"><button aria-label="Previous enlarged screen" disabled={index===0} onClick={()=>go(index-1)}><ArrowLeft size={20}/></button><div aria-live="polite" aria-atomic="true"><span>{String(index+1).padStart(2,'0')} / {String(project.screens.length).padStart(2,'0')}</span><p>{screen.label}</p></div><button aria-label="Next enlarged screen" disabled={index===project.screens.length-1} onClick={()=>go(index+1)}><ArrowRight size={20}/></button></footer>
 </section>;
}
