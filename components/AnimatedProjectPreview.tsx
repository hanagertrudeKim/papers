"use client";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { Plus, ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useRef } from "react";
import { JourneyProject } from "@/lib/journey";

export default function AnimatedProjectPreview({project,onExplore}:{project:JourneyProject;onExplore:()=>void}) {
  const viewport=useRef<HTMLDivElement>(null);
  const reduced=!!useReducedMotion();
  useEffect(()=>{viewport.current?.scrollTo({left:0,behavior:"instant" as ScrollBehavior});},[project.id]);
  return <div className={`screenshot-gallery ${project.mobile?'mobile-gallery':'wide-gallery'} ${reduced?'gallery-paused':''}`}>
    <div ref={viewport} className="gallery-viewport" aria-label={`${project.title} important screens`} tabIndex={0}>
      <motion.div key={project.id} className="gallery-track" initial={{opacity:0,x:reduced?0:20}} animate={{opacity:1,x:0}} transition={{duration:reduced?0:.5}}>{project.screens.map((screen,i)=><button className="gallery-shot" key={screen.image} onClick={onExplore} aria-label={`View ${screen.label} case study`} style={{animationDelay:`${i*-2}s`}}><Image unoptimized src={`/portfolio-images/${screen.image}`} alt={screen.label} width={project.mobile?390:1100} height={project.mobile?844:750} priority={project.id==='revival'}/><span>{String(i+1).padStart(2,'0')} · {screen.label}</span></button>)}</motion.div>
    </div>
    <div className="gallery-controls"><span>{project.screens.length} selected screens</span><div><button aria-label="Previous screen" onClick={()=>viewport.current?.scrollBy({left:-(viewport.current.clientWidth*.7),behavior:reduced?'auto':'smooth'})}><ChevronLeft size={13}/></button><button aria-label="Next screen" onClick={()=>viewport.current?.scrollBy({left:viewport.current.clientWidth*.7,behavior:reduced?'auto':'smooth'})}><ChevronRight size={13}/></button><button onClick={onExplore}>View my contribution <Plus size={12}/></button></div></div>
  </div>;
}
