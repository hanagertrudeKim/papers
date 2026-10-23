"use client";
import {useState} from 'react';
import Image from 'next/image';
import {ArrowUpRight} from 'lucide-react';
import {JourneyProject} from '@/lib/journey';
import ProjectRegion from './ProjectRegion';
import {caseNotes} from '@/lib/case-notes';
export default function ProjectDetails({project}:{project:JourneyProject}){
 const [selected,setSelected]=useState(0);
 const cases=caseNotes[project.id]; const note=cases[selected]||cases[0];
 return <><p className="theme">{project.category} / {project.place}</p><h2 id="dialog-title">{project.title}</h2>
 {cases.length>1&&<div className="case-selector" role="group" aria-label="Choose engineering project">{cases.map((item,i)=><button key={item.title} aria-pressed={selected===i} onClick={()=>setSelected(i)}>{item.title}</button>)}</div>}
 <ProjectRegion projectId={project.id}/><p className="case-organization">{note.organization}</p>
 <h3>Context</h3><p>{note.context}</p>
 <h3>My ownership</h3><p>{note.ownership}</p>
 <h3>Key decision</h3><p>{note.decision}</p>
 <h3>Result & scope</h3><p className="detail-result">{note.result}</p><p>{note.scope}</p>
 <h3>Product evidence</h3><div className={`detail-images ${project.mobile?'mobile-details':''}`}>{note.images.map((src,i)=><Image key={src} unoptimized src={`/portfolio-images/${src}`} alt={`${note.title} product evidence ${i+1}`} width={project.mobile?390:1100} height={project.mobile?844:750}/>)}</div>
 {project.id==='maternalcare'&&<figure className="case-field-photo"><Image unoptimized src="/portfolio-images/ehr-field.JPG" alt="Hana working directly with a nurse at a mobile clinic" width={1000} height={650}/><figcaption>Working with nurses in the field to refine the clinical workflow.</figcaption></figure>}
 <p className="tech">{note.tech}</p>{project.link&&<a className="detail-link" href={project.link} target="_blank" rel="noreferrer">Visit project <ArrowUpRight size={15}/></a>}</>;
}
