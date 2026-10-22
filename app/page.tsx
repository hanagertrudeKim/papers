"use client";

import dynamic from "next/dynamic";
import ProjectDetails from "@/components/ProjectDetails";
import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowDown, ArrowLeft, ArrowRight, ArrowUpRight, MapPin, X } from "lucide-react";
import AnimatedProjectPreview from "@/components/AnimatedProjectPreview";
import { journey } from "@/lib/journey";

const Globe = dynamic(()=>import("@/components/Globe/JourneyGlobe"),{ssr:false,loading:()=> <div className="earth-fallback"/>});

export default function Home() {
  const [index,setIndex]=useState(0);
  const [direction,setDirection]=useState(1);
  const [panel,setPanel]=useState<"project"|"about"|null>(null);
  const reduced=!!useReducedMotion();
  const indexRef=useRef(0);
  const dialog=useRef<HTMLDialogElement>(null);
  const current=journey[index];
  const go=useCallback((next:number)=>{
    const bounded=Math.max(0,Math.min(journey.length-1,next));
    if(bounded===indexRef.current)return;
    setDirection(bounded>indexRef.current?1:-1);indexRef.current=bounded;setIndex(bounded);
  },[]);
  useEffect(()=>{
    let sum=0,last=0,lastWheel=0,startY=0,startX=0,lastSwipe=0,singleTouch=false;
    const wheel=(e:WheelEvent)=>{
      if(panel||e.ctrlKey)return;
      if(Math.abs(e.deltaX)>Math.abs(e.deltaY))return;
      e.preventDefault();
      const now=performance.now();
      if(now-last<850){lastWheel=now;return;}
      if(now-lastWheel>160)sum=0;
      lastWheel=now;
      const dy=e.deltaY*(e.deltaMode===1?18:e.deltaMode===2?window.innerHeight:1);
      if(Math.sign(dy)!==Math.sign(sum))sum=0;
      sum+=dy;
      if(Math.abs(sum)>65){go(indexRef.current+(sum>0?1:-1));last=now;sum=0;}
    };
    const key=(e:KeyboardEvent)=>{
      if(panel||e.ctrlKey||e.metaKey||e.altKey)return;
      const target=e.target as HTMLElement;
      if(target.closest('button,a,input,textarea,select'))return;
      if(['ArrowDown','ArrowRight','PageDown','ArrowUp','ArrowLeft','PageUp','Home','End',' '].includes(e.key)){
        e.preventDefault();
        if(e.key==='Home')go(0);else if(e.key==='End')go(journey.length-1);
        else go(indexRef.current+(['ArrowUp','ArrowLeft','PageUp'].includes(e.key)||e.key===' '&&e.shiftKey?-1:1));
      }
    };
    const touchStart=(e:TouchEvent)=>{singleTouch=e.touches.length===1;if(!singleTouch)return;startY=e.touches[0].clientY;startX=e.touches[0].clientX;};
    const touchEnd=(e:TouchEvent)=>{if(panel||!singleTouch||e.touches.length||!e.changedTouches.length)return;singleTouch=false;const dy=startY-e.changedTouches[0].clientY;const dx=startX-e.changedTouches[0].clientX;const now=performance.now();if(Math.abs(dy)>72&&Math.abs(dy)>Math.abs(dx)*1.5&&now-lastSwipe>650){go(indexRef.current+(dy>0?1:-1));lastSwipe=now;}};
    window.addEventListener('wheel',wheel,{passive:false});window.addEventListener('keydown',key);window.addEventListener('touchstart',touchStart,{passive:true});window.addEventListener('touchend',touchEnd,{passive:true});
    return()=>{window.removeEventListener('wheel',wheel);window.removeEventListener('keydown',key);window.removeEventListener('touchstart',touchStart);window.removeEventListener('touchend',touchEnd);};
  },[go,panel]);
  useEffect(()=>{if(panel&&!dialog.current?.open)dialog.current?.showModal();else if(!panel&&dialog.current?.open)dialog.current?.close();},[panel]);
  return <div className="journey-app" style={{'--accent':current.color} as React.CSSProperties}>
    <main className="experience" aria-label="Global problem-solving project journey">
      <section className="product-side" aria-label="Selected project">
        <div className="compact-identity"><h1>Hana Kim</h1><span>Software Engineer · Founder of Revival</span></div>

        <div className="project-masthead"><div><p className="chapter-label">SELECTED WORK <span>{String(index+1).padStart(2,'0')} / 04</span></p><h2 id="project-title">{current.title}</h2></div><div className="project-meta"><span className="project-ownership">{current.role}</span><p className="project-place"><MapPin size={12}/>{current.place}</p></div></div>
        <AnimatedProjectPreview project={current} onExplore={()=>setPanel('project')}/>
        <AnimatePresence mode="wait" initial={false}><motion.div key={current.id} className="project-description" initial={{opacity:0,y:reduced?0:direction*8}} animate={{opacity:1,y:0}} exit={{opacity:0}} transition={{duration:reduced?0:.2}}>
          <p className="power-summary">{current.summary}</p>
          {current.id==='korea'?<div className="engineering-contributions"><p><span>DICOM</span> Resolved a private-tag privacy gap with batch anonymization and audit logs.</p><p><span>KOIN</span> Led shared front-end architecture, state management, and reusable components.</p></div>:<div className="project-decisions"><span>KEY DECISION</span><p>{current.decision}</p></div>}
          <div className="project-metrics">{current.metrics.map(metric=><div key={metric.label}><strong>{metric.value}</strong><span>{metric.label}</span></div>)}</div>
          <p className="project-stack">{current.tech}</p>
        </motion.div></AnimatePresence>
      </section>
      <section className="context-side" aria-label="Project context and contribution">
        <div className="world" role="img" aria-label={`Globe focused on ${current.place}`}><Globe project={current} reduced={reduced}/><div className="globe-map-pin" aria-hidden="true"><MapPin size={22} fill="#0c1c31" strokeWidth={1.6}/></div><div className="map-location"><MapPin size={11}/>{current.place}</div></div>
      </section>
    </main>
    <footer className="journey-controls"><div className="scroll-hint"><span className="scroll-icon"><ArrowDown size={13}/></span><span>{index===journey.length-1?'Journey complete. Scroll up to revisit.':'Scroll through my work'}<small>or use arrow keys</small></span></div><nav className="stops" aria-label="Project stops">{journey.map((p,i)=><button key={p.id} aria-label={`Go to ${p.title}`} aria-current={i===index?'step':undefined} onClick={()=>go(i)}><span className="stop-line"/><span className="stop-number" aria-hidden="true">{String(i+1).padStart(2,'0')}</span><span>{p.title}</span></button>)}</nav><div className="step-arrows"><button aria-label="Previous project" disabled={index===0} onClick={()=>go(index-1)}><ArrowLeft size={17}/></button><button aria-label="Next project" disabled={index===journey.length-1} onClick={()=>go(index+1)}><ArrowRight size={17}/></button></div><nav className="utility-links" aria-label="Portfolio information"><button onClick={()=>setPanel('about')}>About</button><a href="/HanaKim_Resume.pdf" target="_blank" rel="noreferrer">Résumé <ArrowUpRight size={11}/></a><a href="mailto:rlagksk8428@gmail.com">Contact <ArrowUpRight size={11}/></a></nav></footer>
    <div className="sr-only" aria-live="polite">Project {index+1} of {journey.length}: {current.title}, {current.place}.</div>
    <dialog ref={dialog} onCancel={()=>setPanel(null)} onClose={()=>setPanel(null)} onClick={e=>{if(e.target===dialog.current)setPanel(null);}} aria-labelledby="dialog-title"><div className="detail-panel"><button autoFocus className="close-panel" aria-label="Close details" onClick={()=>setPanel(null)}><X size={20}/></button>{panel==='about'?<><p className="theme">BEHIND THE WORK</p><h2 id="dialog-title">Hana Kim<br/>Software Engineer</h2><p>I’m Hana, a software engineer building products around the people and places that need them — from medical research in Korea to mobile clinics and local services in the Caribbean.</p><div className="about-route"><span>South Korea</span><ArrowRight size={15}/><span>Haiti</span><ArrowRight size={15}/><span>Dominican Republic</span></div><p>My work spans iOS, front-end systems, offline healthcare, and medical-data privacy. I listen in the field, turn constraints into design decisions, and ship tools people can use.</p><a className="detail-link" href="mailto:rlagksk8428@gmail.com">Contact me <ArrowUpRight size={15}/></a></>:<ProjectDetails key={current.id} project={current}/>}</div></dialog>
  </div>;
}
